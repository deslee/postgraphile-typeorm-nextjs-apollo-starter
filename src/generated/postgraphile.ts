/* tslint:disable */
import { makeBindingClass, Options } from 'graphql-binding'
import { GraphQLResolveInfo, GraphQLSchema } from 'graphql'
import { IResolvers } from 'graphql-tools/dist/Interfaces'
import schema from  '../embeddedPostgraphile/index'

export interface Query {
    query: <T = Query>(args?: {}, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    nodeId: <T = ID_Output>(args?: {}, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    node: <T = Node | null>(args: { nodeId: ID_Output }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T | null> ,
    sites: <T = Array<Site> | null>(args: { first?: Int | null, offset?: Int | null, orderBy?: Array<SitesOrderBy> | null, condition?: SiteCondition | null }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T | null> ,
    users: <T = Array<User> | null>(args: { first?: Int | null, offset?: Int | null, orderBy?: Array<UsersOrderBy> | null, condition?: UserCondition | null }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T | null> ,
    site: <T = Site | null>(args: { id: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T | null> ,
    siteByName: <T = Site | null>(args: { name: String }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T | null> ,
    user: <T = User | null>(args: { id: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T | null> ,
    userByEmail: <T = User | null>(args: { email: String }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T | null> ,
    siteByNodeId: <T = Site | null>(args: { nodeId: ID_Output }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T | null> ,
    userByNodeId: <T = User | null>(args: { nodeId: ID_Output }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T | null> 
  }

export interface Mutation {
    createSite: <T = CreateSitePayload | null>(args: { input: CreateSiteInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T | null> ,
    createUser: <T = CreateUserPayload | null>(args: { input: CreateUserInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T | null> ,
    updateSiteByNodeId: <T = UpdateSitePayload | null>(args: { input: UpdateSiteByNodeIdInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T | null> ,
    updateSite: <T = UpdateSitePayload | null>(args: { input: UpdateSiteInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T | null> ,
    updateSiteByName: <T = UpdateSitePayload | null>(args: { input: UpdateSiteByNameInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T | null> ,
    updateUserByNodeId: <T = UpdateUserPayload | null>(args: { input: UpdateUserByNodeIdInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T | null> ,
    updateUser: <T = UpdateUserPayload | null>(args: { input: UpdateUserInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T | null> ,
    updateUserByEmail: <T = UpdateUserPayload | null>(args: { input: UpdateUserByEmailInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T | null> ,
    deleteSiteByNodeId: <T = DeleteSitePayload | null>(args: { input: DeleteSiteByNodeIdInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T | null> ,
    deleteSite: <T = DeleteSitePayload | null>(args: { input: DeleteSiteInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T | null> ,
    deleteSiteByName: <T = DeleteSitePayload | null>(args: { input: DeleteSiteByNameInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T | null> ,
    deleteUserByNodeId: <T = DeleteUserPayload | null>(args: { input: DeleteUserByNodeIdInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T | null> ,
    deleteUser: <T = DeleteUserPayload | null>(args: { input: DeleteUserInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T | null> ,
    deleteUserByEmail: <T = DeleteUserPayload | null>(args: { input: DeleteUserByEmailInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T | null> 
  }

export interface Subscription {}

export interface Binding {
  query: Query
  mutation: Mutation
  subscription: Subscription
  request: <T = any>(query: string, variables?: {[key: string]: any}) => Promise<T>
  delegate(operation: 'query' | 'mutation', fieldName: string, args: {
      [key: string]: any;
  }, infoOrQuery?: GraphQLResolveInfo | string, options?: Options): Promise<any>;
  delegateSubscription(fieldName: string, args?: {
      [key: string]: any;
  }, infoOrQuery?: GraphQLResolveInfo | string, options?: Options): Promise<AsyncIterator<any>>;
  getAbstractResolvers(filterSchema?: GraphQLSchema | string): IResolvers;
}

export interface BindingConstructor<T> {
  new(...args: any[]): T
}

export const Binding = makeBindingClass<BindingConstructor<Binding>>({ schema })

/**
 * Types
*/

/*
 * Methods to use when ordering `Site`.

 */
export type SitesOrderBy =   'NATURAL' |
  'ID_ASC' |
  'ID_DESC' |
  'NAME_ASC' |
  'NAME_DESC' |
  'DATA_ASC' |
  'DATA_DESC' |
  'CREATED_BY_ASC' |
  'CREATED_BY_DESC' |
  'UPDATED_BY_ASC' |
  'UPDATED_BY_DESC' |
  'CREATED_AT_ASC' |
  'CREATED_AT_DESC' |
  'UPDATED_AT_ASC' |
  'UPDATED_AT_DESC' |
  'PRIMARY_KEY_ASC' |
  'PRIMARY_KEY_DESC'

/*
 * Methods to use when ordering `User`.

 */
export type UsersOrderBy =   'NATURAL' |
  'ID_ASC' |
  'ID_DESC' |
  'EMAIL_ASC' |
  'EMAIL_DESC' |
  'DATA_ASC' |
  'DATA_DESC' |
  'CREATED_BY_ASC' |
  'CREATED_BY_DESC' |
  'UPDATED_BY_ASC' |
  'UPDATED_BY_DESC' |
  'CREATED_AT_ASC' |
  'CREATED_AT_DESC' |
  'UPDATED_AT_ASC' |
  'UPDATED_AT_DESC' |
  'PRIMARY_KEY_ASC' |
  'PRIMARY_KEY_DESC'

/*
 * All input for the create `Site` mutation.

 */
export interface CreateSiteInput {
  clientMutationId?: String | null
  site: SiteInput
}

/*
 * All input for the create `User` mutation.

 */
export interface CreateUserInput {
  clientMutationId?: String | null
  user: UserInput
}

/*
 * All input for the `deleteSiteByName` mutation.

 */
export interface DeleteSiteByNameInput {
  clientMutationId?: String | null
  name: String
}

/*
 * All input for the `deleteSiteByNodeId` mutation.

 */
export interface DeleteSiteByNodeIdInput {
  clientMutationId?: String | null
  nodeId: ID_Output
}

/*
 * All input for the `deleteSite` mutation.

 */
export interface DeleteSiteInput {
  clientMutationId?: String | null
  id: Int
}

/*
 * All input for the `deleteUserByEmail` mutation.

 */
export interface DeleteUserByEmailInput {
  clientMutationId?: String | null
  email: String
}

/*
 * All input for the `deleteUserByNodeId` mutation.

 */
export interface DeleteUserByNodeIdInput {
  clientMutationId?: String | null
  nodeId: ID_Output
}

/*
 * All input for the `deleteUser` mutation.

 */
export interface DeleteUserInput {
  clientMutationId?: String | null
  id: Int
}

/*
 * A condition to be used against `Site` object types. All fields are tested for equality and combined with a logical ‘and.’

 */
export interface SiteCondition {
  id?: Int | null
  name?: String | null
  data?: JSON | null
  createdBy?: String | null
  updatedBy?: String | null
  createdAt?: Datetime | null
  updatedAt?: Datetime | null
}

/*
 * An input for mutations affecting `Site`

 */
export interface SiteInput {
  id?: Int | null
  name: String
  data: JSON
  createdBy?: String | null
  updatedBy?: String | null
  createdAt?: Datetime | null
  updatedAt?: Datetime | null
}

/*
 * Represents an update to a `Site`. Fields that are set will be updated.

 */
export interface SitePatch {
  id?: Int | null
  name?: String | null
  data?: JSON | null
  createdBy?: String | null
  updatedBy?: String | null
  createdAt?: Datetime | null
  updatedAt?: Datetime | null
}

/*
 * All input for the `updateSiteByName` mutation.

 */
export interface UpdateSiteByNameInput {
  clientMutationId?: String | null
  patch: SitePatch
  name: String
}

/*
 * All input for the `updateSiteByNodeId` mutation.

 */
export interface UpdateSiteByNodeIdInput {
  clientMutationId?: String | null
  nodeId: ID_Output
  patch: SitePatch
}

/*
 * All input for the `updateSite` mutation.

 */
export interface UpdateSiteInput {
  clientMutationId?: String | null
  patch: SitePatch
  id: Int
}

/*
 * All input for the `updateUserByEmail` mutation.

 */
export interface UpdateUserByEmailInput {
  clientMutationId?: String | null
  patch: UserPatch
  email: String
}

/*
 * All input for the `updateUserByNodeId` mutation.

 */
export interface UpdateUserByNodeIdInput {
  clientMutationId?: String | null
  nodeId: ID_Output
  patch: UserPatch
}

/*
 * All input for the `updateUser` mutation.

 */
export interface UpdateUserInput {
  clientMutationId?: String | null
  patch: UserPatch
  id: Int
}

/*
 * A condition to be used against `User` object types. All fields are tested for equality and combined with a logical ‘and.’

 */
export interface UserCondition {
  id?: Int | null
  email?: String | null
  data?: JSON | null
  createdBy?: String | null
  updatedBy?: String | null
  createdAt?: Datetime | null
  updatedAt?: Datetime | null
}

/*
 * An input for mutations affecting `User`

 */
export interface UserInput {
  id?: Int | null
  email: String
  data: JSON
  createdBy?: String | null
  updatedBy?: String | null
  createdAt?: Datetime | null
  updatedAt?: Datetime | null
}

/*
 * Represents an update to a `User`. Fields that are set will be updated.

 */
export interface UserPatch {
  id?: Int | null
  email?: String | null
  data?: JSON | null
  createdBy?: String | null
  updatedBy?: String | null
  createdAt?: Datetime | null
  updatedAt?: Datetime | null
}

/*
 * An object with a globally unique `ID`.

 */
export interface Node {
  nodeId: ID_Output
}

/*
 * The output of our create `Site` mutation.

 */
export interface CreateSitePayload {
  clientMutationId?: String | null
  site?: Site | null
  query?: Query | null
}

/*
 * The output of our create `User` mutation.

 */
export interface CreateUserPayload {
  clientMutationId?: String | null
  user?: User | null
  query?: Query | null
}

/*
 * The output of our delete `Site` mutation.

 */
export interface DeleteSitePayload {
  clientMutationId?: String | null
  site?: Site | null
  deletedSiteNodeId?: ID_Output | null
  query?: Query | null
}

/*
 * The output of our delete `User` mutation.

 */
export interface DeleteUserPayload {
  clientMutationId?: String | null
  user?: User | null
  deletedUserNodeId?: ID_Output | null
  query?: Query | null
}

export interface Site extends Node {
  nodeId: ID_Output
  id: Int
  name: String
  data: JSON
  createdBy?: String | null
  updatedBy?: String | null
  createdAt?: Datetime | null
  updatedAt?: Datetime | null
}

/*
 * The output of our update `Site` mutation.

 */
export interface UpdateSitePayload {
  clientMutationId?: String | null
  site?: Site | null
  query?: Query | null
}

/*
 * The output of our update `User` mutation.

 */
export interface UpdateUserPayload {
  clientMutationId?: String | null
  user?: User | null
  query?: Query | null
}

export interface User extends Node {
  nodeId: ID_Output
  id: Int
  email: String
  data: JSON
  createdBy?: String | null
  updatedBy?: String | null
  createdAt?: Datetime | null
  updatedAt?: Datetime | null
}

/*
The `Boolean` scalar type represents `true` or `false`.
*/
export type Boolean = boolean

/*
A point in time as described by the [ISO
8601](https://en.wikipedia.org/wiki/ISO_8601) standard. May or may not include a timezone.
*/
export type Datetime = string

/*
The `ID` scalar type represents a unique identifier, often used to refetch an object or as key for a cache. The ID type appears in a JSON response as a String; however, it is not intended to be human-readable. When expected as an input type, any string (such as `"4"`) or integer (such as `4`) input value will be accepted as an ID.
*/
export type ID_Input = string | number
export type ID_Output = string

/*
The `Int` scalar type represents non-fractional signed whole numeric values. Int can represent values between -(2^31) and 2^31 - 1. 
*/
export type Int = number

/*
The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf).
*/
export type JSON = string

/*
The `String` scalar type represents textual data, represented as UTF-8 character sequences. The String type is most often used by GraphQL to represent free-form human-readable text.
*/
export type String = string