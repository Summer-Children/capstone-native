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

export type AssessmentReport = {
  __typename?: 'AssessmentReport';
  buildingId: Scalars['ID']['output'];
  draft: Scalars['Boolean']['output'];
  fiscalYear: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
};

export type Building = {
  __typename?: 'Building';
  address: Scalars['String']['output'];
  assessmentReports: Array<Maybe<AssessmentReport>>;
  components: Array<Maybe<Component>>;
  crfAnnualContribution: Scalars['Int']['output'];
  crfMinimumBalance: Scalars['Int']['output'];
  fiscalYear: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  strataId: Scalars['String']['output'];
  userId: Scalars['ID']['output'];
  year?: Maybe<Scalars['Int']['output']>;
};

export type Component = {
  __typename?: 'Component';
  actionFrequency: Scalars['Int']['output'];
  buildingId: Scalars['ID']['output'];
  category: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  lastActionYear: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  nextActionYear: Scalars['Int']['output'];
  section: Scalars['String']['output'];
  unitRate: Scalars['Float']['output'];
  yearInstalled: Scalars['Int']['output'];
};

export type ComponentReport = {
  __typename?: 'ComponentReport';
  action: Scalars['String']['output'];
  assessmentReportId: Scalars['ID']['output'];
  componentId: Scalars['ID']['output'];
  condition: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  note: Scalars['String']['output'];
  priority: Scalars['String']['output'];
  quantityNeeded: Scalars['Int']['output'];
  yearReviewed: Scalars['Int']['output'];
};

export type CreateAssessmentReport = {
  buildingId: Scalars['ID']['input'];
  draft: Scalars['Boolean']['input'];
  fiscalYear: Scalars['Int']['input'];
};

export type CreateBuilding = {
  address: Scalars['String']['input'];
  crfAnnualContribution?: InputMaybe<Scalars['Int']['input']>;
  crfMinimumBalance?: InputMaybe<Scalars['Int']['input']>;
  fiscalYear?: InputMaybe<Scalars['Int']['input']>;
  name: Scalars['String']['input'];
  strataId: Scalars['String']['input'];
  year?: InputMaybe<Scalars['Int']['input']>;
};

export type CreateComponent = {
  actionFrequency: Scalars['Int']['input'];
  buildingId: Scalars['ID']['input'];
  category: Scalars['String']['input'];
  lastActionYear: Scalars['Int']['input'];
  name: Scalars['String']['input'];
  nextActionYear: Scalars['Int']['input'];
  section: Scalars['String']['input'];
  unitRate: Scalars['Float']['input'];
  yearInstalled: Scalars['Int']['input'];
};

export type CreateComponentReport = {
  action: Scalars['String']['input'];
  assessmentReportId: Scalars['ID']['input'];
  componentId: Scalars['ID']['input'];
  condition: Scalars['String']['input'];
  note: Scalars['String']['input'];
  priority: Scalars['String']['input'];
  quantityNeeded: Scalars['Int']['input'];
  yearReviewed: Scalars['Int']['input'];
};

export type DeleteAssessmentReport = {
  id: Scalars['ID']['input'];
};

export type DeleteBuilding = {
  id: Scalars['ID']['input'];
};

export type DeleteComponent = {
  id: Scalars['ID']['input'];
};

export type DeleteComponentReport = {
  id: Scalars['ID']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createAssessmentReport: AssessmentReport;
  createBuilding: Building;
  createComponent: Component;
  createComponentReport: ComponentReport;
  deleteAssessmentReport: Scalars['ID']['output'];
  deleteBuilding: Scalars['ID']['output'];
  deleteComponent: Scalars['ID']['output'];
  deleteComponentReport: Scalars['ID']['output'];
  signIn: Scalars['String']['output'];
  signUp: Scalars['Boolean']['output'];
  updateAssessmentReport: AssessmentReport;
  updateBuilding: Building;
  updateComponent: Component;
  updateComponentReport: ComponentReport;
};


export type MutationCreateAssessmentReportArgs = {
  input: CreateAssessmentReport;
};


export type MutationCreateBuildingArgs = {
  input: CreateBuilding;
};


export type MutationCreateComponentArgs = {
  input: CreateComponent;
};


export type MutationCreateComponentReportArgs = {
  input: CreateComponentReport;
};


export type MutationDeleteAssessmentReportArgs = {
  input: DeleteAssessmentReport;
};


export type MutationDeleteBuildingArgs = {
  input: DeleteBuilding;
};


export type MutationDeleteComponentArgs = {
  input: DeleteComponent;
};


export type MutationDeleteComponentReportArgs = {
  input: DeleteComponentReport;
};


export type MutationSignInArgs = {
  input: SignIn;
};


export type MutationSignUpArgs = {
  input: SignUp;
};


export type MutationUpdateAssessmentReportArgs = {
  input: UpdateAssessmentReport;
};


export type MutationUpdateBuildingArgs = {
  input: UpdateBuilding;
};


export type MutationUpdateComponentArgs = {
  input: UpdateComponent;
};


export type MutationUpdateComponentReportArgs = {
  input: UpdateComponentReport;
};

export type Query = {
  __typename?: 'Query';
  assessmentReport: AssessmentReport;
  assessmentReports: Array<Maybe<AssessmentReport>>;
  assessmentReportsByBuildingId: Array<Maybe<AssessmentReport>>;
  buildings: Array<Maybe<Building>>;
  componentReports: Array<Maybe<ComponentReport>>;
  componentReportsByAssessmentReportId: Array<Maybe<ComponentReport>>;
  components: Array<Maybe<Component>>;
  componentsByBuildingId: Array<Maybe<Component>>;
};


export type QueryAssessmentReportArgs = {
  id: Scalars['ID']['input'];
};


export type QueryAssessmentReportsByBuildingIdArgs = {
  buildingId: Scalars['ID']['input'];
};


export type QueryComponentReportsByAssessmentReportIdArgs = {
  assessmentReportId: Scalars['ID']['input'];
};


export type QueryComponentsByBuildingIdArgs = {
  buildingId: Scalars['ID']['input'];
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

export type UpdateAssessmentReport = {
  buildingId: Scalars['ID']['input'];
  draft: Scalars['Boolean']['input'];
  fiscalYear: Scalars['Int']['input'];
  id: Scalars['ID']['input'];
};

export type UpdateBuilding = {
  address?: InputMaybe<Scalars['String']['input']>;
  crfAnnualContribution?: InputMaybe<Scalars['Int']['input']>;
  crfMinimumBalance?: InputMaybe<Scalars['Int']['input']>;
  fiscalYear?: InputMaybe<Scalars['Int']['input']>;
  id: Scalars['ID']['input'];
  year?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdateComponent = {
  actionFrequency: Scalars['Int']['input'];
  buildingId: Scalars['ID']['input'];
  category: Scalars['String']['input'];
  id: Scalars['ID']['input'];
  lastActionYear: Scalars['Int']['input'];
  name: Scalars['String']['input'];
  nextActionYear: Scalars['Int']['input'];
  section: Scalars['String']['input'];
  unitRate: Scalars['Float']['input'];
  yearInstalled: Scalars['Int']['input'];
};

export type UpdateComponentReport = {
  action: Scalars['String']['input'];
  condition: Scalars['String']['input'];
  id: Scalars['ID']['input'];
  note: Scalars['String']['input'];
  priority: Scalars['String']['input'];
  quantityNeeded: Scalars['Int']['input'];
  yearReviewed: Scalars['Int']['input'];
};

export type User = {
  __typename?: 'User';
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type SignInMutationVariables = Exact<{
  input: SignIn;
}>;


export type SignInMutation = { __typename?: 'Mutation', signIn: string };

export type SignUpMutationVariables = Exact<{
  input: SignUp;
}>;


export type SignUpMutation = { __typename?: 'Mutation', signUp: boolean };


export const SignInDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SignIn"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SignIn"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"signIn"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}]}]}}]} as unknown as DocumentNode<SignInMutation, SignInMutationVariables>;
export const SignUpDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SignUp"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SignUp"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"signUp"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}]}]}}]} as unknown as DocumentNode<SignUpMutation, SignUpMutationVariables>;