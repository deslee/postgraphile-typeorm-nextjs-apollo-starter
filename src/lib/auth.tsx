import * as React from 'react'

export type AuthUser = {
    token: string
};

export type UpdateAuthUser = (user?: AuthUser) => void;

export interface AuthUserContext {
    user?: AuthUser;
    updateUser: UpdateAuthUser;
}

export const AuthContext = React.createContext<AuthUserContext>({
    updateUser: (user: AuthUser) => { }
})

export const AuthUserProvider = AuthContext.Provider;
