import { Connection } from 'typeorm';
import { Binding } from './generated/postgraphile';
import { IncomingMessage, ServerResponse } from 'http';
import { AuthenticatedUser } from './Authentication';

export interface Context {
    orm: Connection;
    gql: Binding;
    elevatedGql: (user?: AuthenticatedUser) => Binding; // Helper function to impersonate a user for an inner graphql query
    req: any;
    res: ServerResponse;
}
