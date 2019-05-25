export type Maybe<T> = T | null;

/** A condition to be used against `Site` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export interface SiteCondition {
  /** Checks for equality with the object’s `id` field. */
  id?: Maybe<number>;
  /** Checks for equality with the object’s `name` field. */
  name?: Maybe<string>;
  /** Checks for equality with the object’s `data` field. */
  data?: Maybe<Json>;
  /** Checks for equality with the object’s `createdBy` field. */
  createdBy?: Maybe<string>;
  /** Checks for equality with the object’s `updatedBy` field. */
  updatedBy?: Maybe<string>;
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: Maybe<Datetime>;
  /** Checks for equality with the object’s `updatedAt` field. */
  updatedAt?: Maybe<Datetime>;
}
/** A condition to be used against `User` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export interface UserCondition {
  /** Checks for equality with the object’s `id` field. */
  id?: Maybe<number>;
  /** Checks for equality with the object’s `email` field. */
  email?: Maybe<string>;
  /** Checks for equality with the object’s `data` field. */
  data?: Maybe<Json>;
  /** Checks for equality with the object’s `createdBy` field. */
  createdBy?: Maybe<string>;
  /** Checks for equality with the object’s `updatedBy` field. */
  updatedBy?: Maybe<string>;
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: Maybe<Datetime>;
  /** Checks for equality with the object’s `updatedAt` field. */
  updatedAt?: Maybe<Datetime>;
}
/** All input for the create `Site` mutation. */
export interface CreateSiteInput {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<string>;
  /** The `Site` to be created by this mutation. */
  site: SiteInput;
}
/** An input for mutations affecting `Site` */
export interface SiteInput {
  id?: Maybe<number>;

  name: string;

  data: Json;

  createdBy: string;

  updatedBy: string;

  createdAt: Datetime;

  updatedAt: Datetime;
}
/** All input for the create `User` mutation. */
export interface CreateUserInput {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<string>;
  /** The `User` to be created by this mutation. */
  user: UserInput;
}
/** An input for mutations affecting `User` */
export interface UserInput {
  id?: Maybe<number>;

  email: string;

  data: Json;

  createdBy: string;

  updatedBy: string;

  createdAt: Datetime;

  updatedAt: Datetime;
}
/** All input for the `updateSite` mutation. */
export interface UpdateSiteInput {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<string>;
  /** An object where the defined keys will be set on the `Site` being updated. */
  patch: SitePatch;

  id: number;
}
/** Represents an update to a `Site`. Fields that are set will be updated. */
export interface SitePatch {
  id?: Maybe<number>;

  name?: Maybe<string>;

  data?: Maybe<Json>;

  createdBy?: Maybe<string>;

  updatedBy?: Maybe<string>;

  createdAt?: Maybe<Datetime>;

  updatedAt?: Maybe<Datetime>;
}
/** All input for the `updateUserByEmail` mutation. */
export interface UpdateUserByEmailInput {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<string>;
  /** An object where the defined keys will be set on the `User` being updated. */
  patch: UserPatch;

  email: string;
}
/** Represents an update to a `User`. Fields that are set will be updated. */
export interface UserPatch {
  id?: Maybe<number>;

  email?: Maybe<string>;

  data?: Maybe<Json>;

  createdBy?: Maybe<string>;

  updatedBy?: Maybe<string>;

  createdAt?: Maybe<Datetime>;

  updatedAt?: Maybe<Datetime>;
}
/** All input for the `deleteSite` mutation. */
export interface DeleteSiteInput {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<string>;

  id: number;
}
/** All input for the `deleteUserByEmail` mutation. */
export interface DeleteUserByEmailInput {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<string>;

  email: string;
}
/** Methods to use when ordering `Site`. */
export type SitesOrderBy =
  | "NATURAL"
  | "ID_ASC"
  | "ID_DESC"
  | "NAME_ASC"
  | "NAME_DESC"
  | "DATA_ASC"
  | "DATA_DESC"
  | "CREATED_BY_ASC"
  | "CREATED_BY_DESC"
  | "UPDATED_BY_ASC"
  | "UPDATED_BY_DESC"
  | "CREATED_AT_ASC"
  | "CREATED_AT_DESC"
  | "UPDATED_AT_ASC"
  | "UPDATED_AT_DESC"
  | "PRIMARY_KEY_ASC"
  | "PRIMARY_KEY_DESC";
/** Methods to use when ordering `User`. */
export type UsersOrderBy =
  | "NATURAL"
  | "ID_ASC"
  | "ID_DESC"
  | "EMAIL_ASC"
  | "EMAIL_DESC"
  | "DATA_ASC"
  | "DATA_DESC"
  | "CREATED_BY_ASC"
  | "CREATED_BY_DESC"
  | "UPDATED_BY_ASC"
  | "UPDATED_BY_DESC"
  | "CREATED_AT_ASC"
  | "CREATED_AT_DESC"
  | "UPDATED_AT_ASC"
  | "UPDATED_AT_DESC"
  | "PRIMARY_KEY_ASC"
  | "PRIMARY_KEY_DESC";

/** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
export type Json = any;

/** A point in time as described by the [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) standard. May or may not include a timezone. */
export type Datetime = any;

// ====================================================
// Scalars
// ====================================================

// ====================================================
// Interfaces
// ====================================================

/** An object with a globally unique `ID`. */
export interface Node {
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: string;
}

// ====================================================
// Types
// ====================================================

export interface Query {
  /** Reads a set of `Site`. */
  sites?: Maybe<Site[]>;
  /** Reads a set of `User`. */
  users?: Maybe<User[]>;

  userByEmail?: Maybe<User>;
}

export interface Site extends Node {
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: string;

  id: number;

  name: string;

  data: Json;

  createdBy: string;

  updatedBy: string;

  createdAt: Datetime;

  updatedAt: Datetime;
}

export interface User extends Node {
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: string;

  id: number;

  email: string;

  data: Json;

  createdBy: string;

  updatedBy: string;

  createdAt: Datetime;

  updatedAt: Datetime;
}

export interface Mutation {
  /** Creates a single `Site`. */
  createSite?: Maybe<CreateSitePayload>;
  /** Creates a single `User`. */
  createUser?: Maybe<CreateUserPayload>;
  /** Updates a single `Site` using a unique key and a patch. */
  updateSite?: Maybe<UpdateSitePayload>;
  /** Updates a single `User` using a unique key and a patch. */
  updateUserByEmail?: Maybe<UpdateUserPayload>;
  /** Deletes a single `Site` using a unique key. */
  deleteSite?: Maybe<DeleteSitePayload>;
  /** Deletes a single `User` using a unique key. */
  deleteUserByEmail?: Maybe<DeleteUserPayload>;
}

/** The output of our create `Site` mutation. */
export interface CreateSitePayload {
  /** The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations. */
  clientMutationId?: Maybe<string>;
  /** The `Site` that was created by this mutation. */
  site?: Maybe<Site>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
}

/** The output of our create `User` mutation. */
export interface CreateUserPayload {
  /** The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations. */
  clientMutationId?: Maybe<string>;
  /** The `User` that was created by this mutation. */
  user?: Maybe<User>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
}

/** The output of our update `Site` mutation. */
export interface UpdateSitePayload {
  /** The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations. */
  clientMutationId?: Maybe<string>;
  /** The `Site` that was updated by this mutation. */
  site?: Maybe<Site>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
}

/** The output of our update `User` mutation. */
export interface UpdateUserPayload {
  /** The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations. */
  clientMutationId?: Maybe<string>;
  /** The `User` that was updated by this mutation. */
  user?: Maybe<User>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
}

/** The output of our delete `Site` mutation. */
export interface DeleteSitePayload {
  /** The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations. */
  clientMutationId?: Maybe<string>;
  /** The `Site` that was deleted by this mutation. */
  site?: Maybe<Site>;

  deletedSiteNodeId?: Maybe<string>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
}

/** The output of our delete `User` mutation. */
export interface DeleteUserPayload {
  /** The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations. */
  clientMutationId?: Maybe<string>;
  /** The `User` that was deleted by this mutation. */
  user?: Maybe<User>;

  deletedUserNodeId?: Maybe<string>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
}

// ====================================================
// Arguments
// ====================================================

export interface SitesQueryArgs {
  /** Only read the first `n` values of the set. */
  first?: Maybe<number>;
  /** Skip the first `n` values. */
  offset?: Maybe<number>;
  /** The method to use when ordering `Site`. */
  orderBy?: Maybe<SitesOrderBy[]>;
  /** A condition to be used in determining which values should be returned by the collection. */
  condition?: Maybe<SiteCondition>;
}
export interface UsersQueryArgs {
  /** Only read the first `n` values of the set. */
  first?: Maybe<number>;
  /** Skip the first `n` values. */
  offset?: Maybe<number>;
  /** The method to use when ordering `User`. */
  orderBy?: Maybe<UsersOrderBy[]>;
  /** A condition to be used in determining which values should be returned by the collection. */
  condition?: Maybe<UserCondition>;
}
export interface UserByEmailQueryArgs {
  email: string;
}
export interface CreateSiteMutationArgs {
  /** The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields. */
  input: CreateSiteInput;
}
export interface CreateUserMutationArgs {
  /** The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields. */
  input: CreateUserInput;
}
export interface UpdateSiteMutationArgs {
  /** The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields. */
  input: UpdateSiteInput;
}
export interface UpdateUserByEmailMutationArgs {
  /** The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields. */
  input: UpdateUserByEmailInput;
}
export interface DeleteSiteMutationArgs {
  /** The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields. */
  input: DeleteSiteInput;
}
export interface DeleteUserByEmailMutationArgs {
  /** The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields. */
  input: DeleteUserByEmailInput;
}
