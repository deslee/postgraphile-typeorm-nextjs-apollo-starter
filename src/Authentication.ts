import * as passport from 'passport';
import * as bcrypt from 'bcryptjs';
import { Strategy as LocalStrategy } from 'passport-local';
import * as passportJwt from 'passport-jwt';
import * as jwt from 'jsonwebtoken'
import * as uuidv4 from 'uuid/v4';
import { Connection, EntityManager } from 'typeorm';
import { User, PrivateUser } from './entity/User';
import config from './config';
import { Session } from './entity/Session';
import { RequestHandler } from 'express';
import { AuthenticationError } from 'apollo-server-errors';

export interface AuthenticatedUser {
    userId?: string;
    sessionId?: string;
}

export async function createSession(orm: EntityManager, user: User) {
    const expiration = new Date(new Date().toUTCString());
    expiration.setDate( expiration.getDate() + 7 )
    const session = {
        token: uuidv4(),
        user: user,
        invalidAfter: expiration,
        data: '{}'
    } as Session;
    await orm.getRepository(Session).insert(session)

    return session;
}

export async function createUser({ tx, email, password }: { tx: EntityManager, email: string, password: string} ) {
    const pw = await bcrypt.hash(password, 10);
    await tx.getRepository(User).insert({
        email,
        data: '{}'
    })

    const user = await tx.getRepository(User).findOne({ email })

    if (!user) {
        throw new AuthenticationError('Failed to save');
    }

    await tx.getRepository(PrivateUser).insert({
        user: user,
        password: pw
    })

    const privateUser = await tx.getRepository(PrivateUser).findOne({ user: { id: user.id } })

    if (!privateUser) {
        throw new AuthenticationError('Failed to save');
    }

    return privateUser;
}

export function init({ orm }: { orm: Connection }) {
    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        session: false
    }, async (email, password, done) => {
        return await orm.transaction(async tx => {
            const userInfo = await tx.getRepository(PrivateUser).findOne({
                user: {
                    email: email
                }
            })

            if (userInfo !== undefined && userInfo.user.email === email) {
                const valid = await bcrypt.compare(password, userInfo.password)
                if (valid) {
                    const session = await createSession(tx, userInfo.user);

                    done(null, {
                        userId: session.user.id,
                        sessionId: session.token
                    } as AuthenticatedUser)
                    return;
                }
            }
            done(null, null)
        })
        }))

    passport.use(new passportJwt.Strategy({
        jwtFromRequest: passportJwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: config.jwtSecret
    }, async (jwtPayload, cb) => {
        const claim = jwtPayload as AuthenticatedUser;
        if (claim.sessionId !== undefined && claim.userId !== undefined) {
            const session = await orm.getRepository(Session).findOne({
                token: claim.sessionId!
            })
            if (session && session.token && session.user.id === claim.userId! && session.invalidAfter > new Date(new Date().toUTCString())) {
                cb(null, {
                    userId: session.user.id,
                    sessionId: session.token
                } as AuthenticatedUser)
            } else {
                cb(null, null)
            }
        } else {
            cb(null, null)
        }
    }))
}

export const getToken: RequestHandler = (req, res) => {
    passport.authenticate('local', { session: false }, (err, user, info) => {
        if (err) {
            console.error(err)
        }

        if (err || !user) {
            return res.status(400).json({
                message: info ? info.message : 'Login failed'
            })
        }

        const authenticatedUser = user as AuthenticatedUser
        if (!authenticatedUser.sessionId || !authenticatedUser.userId) {
            return res.status(400).json({
                message: info ? info.message : 'Login failed'
            })
        }

        const token = signToken(authenticatedUser);
        return res.status(200).json({ token: token })
    })(req, res)
}

export const signToken = (authenticatedUser: AuthenticatedUser) => {
    const token = jwt.sign({
        sessionId: authenticatedUser.sessionId!,
        userId: authenticatedUser.userId!
    } as AuthenticatedUser, config.jwtSecret)
    return token;
}

export const auth: RequestHandler = (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
        if (!user) {
            return next();
        }
        req.login(user, { session: false }, err => {
            if (err) {
                return res.status(500).json({ err })
            }
            return next();
        })
    })(req, res, next)
}