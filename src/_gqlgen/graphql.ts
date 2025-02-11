/* eslint-disable */
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Building = {
  __typename?: 'Building';
  address: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  organizationId: Scalars['ID']['output'];
  year?: Maybe<Scalars['Int']['output']>;
};

export type CreateBuilding = {
  address: Scalars['String']['input'];
  organizationId: Scalars['ID']['input'];
  year?: InputMaybe<Scalars['Int']['input']>;
};

export type CreateOrganization = {
  name: Scalars['String']['input'];
};

export type DeleteBuilding = {
  id: Scalars['ID']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createBuilding: Building;
  createOrganization: Organization;
  deleteBuilding: Building;
  signIn: Scalars['String']['output'];
  signUp: Scalars['Boolean']['output'];
  updateBuilding: Building;
  updateOrganization: Organization;
};


export type MutationCreateBuildingArgs = {
  input: CreateBuilding;
};


export type MutationCreateOrganizationArgs = {
  input: CreateOrganization;
};


export type MutationDeleteBuildingArgs = {
  input: DeleteBuilding;
};


export type MutationSignInArgs = {
  input: SignIn;
};


export type MutationSignUpArgs = {
  input: SignUp;
};


export type MutationUpdateBuildingArgs = {
  input: UpdateBuilding;
};


export type MutationUpdateOrganizationArgs = {
  input: UpdateOrganization;
};

export type Organization = {
  __typename?: 'Organization';
  buildings: Array<Maybe<Building>>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  buildings: Array<Maybe<Building>>;
  organization: Organization;
  reports: Array<Maybe<Report>>;
};


export type QueryReportsArgs = {
  buildingId: Scalars['ID']['input'];
};

export type Report = {
  __typename?: 'Report';
  id: Scalars['ID']['output'];
};

export type SignIn = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type SignUp = {
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type UpdateBuilding = {
  address?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  year?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdateOrganization = {
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type BuildingsQueryVariables = Exact<{ [key: string]: never; }>;


export type BuildingsQuery = { __typename?: 'Query', res: Array<{ __typename?: 'Building', id: string, organizationId: string, year?: number | null, address: string } | null> };

export type CreateOrganizationMutationVariables = Exact<{
  input: CreateOrganization;
}>;


export type CreateOrganizationMutation = { __typename?: 'Mutation', res: { __typename?: 'Organization', id: string, name: string, buildings: Array<{ __typename?: 'Building', id: string, organizationId: string, address: string, year?: number | null } | null> } };

export type CreateBuildingMutationVariables = Exact<{
  input: CreateBuilding;
}>;


export type CreateBuildingMutation = { __typename?: 'Mutation', res: { __typename?: 'Building', id: string, organizationId: string, address: string, year?: number | null } };


export const BuildingsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Buildings"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"res"},"name":{"kind":"Name","value":"buildings"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"organizationId"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"address"}}]}}]}}]} as unknown as DocumentNode<BuildingsQuery, BuildingsQueryVariables>;
export const CreateOrganizationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateOrganization"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateOrganization"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"res"},"name":{"kind":"Name","value":"createOrganization"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"buildings"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"organizationId"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"year"}}]}}]}}]}}]} as unknown as DocumentNode<CreateOrganizationMutation, CreateOrganizationMutationVariables>;
export const CreateBuildingDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateBuilding"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateBuilding"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"res"},"name":{"kind":"Name","value":"createBuilding"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"organizationId"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"year"}}]}}]}}]} as unknown as DocumentNode<CreateBuildingMutation, CreateBuildingMutationVariables>;