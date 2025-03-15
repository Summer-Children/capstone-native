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
  Upload: { input: any; output: any; }
};

export type AssessmentReport = {
  __typename?: 'AssessmentReport';
  building: Building;
  componentReports: Array<Maybe<ComponentReport>>;
  draft: Scalars['Boolean']['output'];
  fiscalYear: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
};

export type AssessmentReportPdfResponse = {
  __typename?: 'AssessmentReportPDFResponse';
  assessmentReportId: Scalars['ID']['output'];
  pdfUrl: Scalars['String']['output'];
};

export type Building = {
  __typename?: 'Building';
  address?: Maybe<Scalars['String']['output']>;
  assessmentReports: Array<Maybe<AssessmentReport>>;
  components: Array<Maybe<Component>>;
  crfAnnualContribution?: Maybe<Scalars['Int']['output']>;
  crfMinimumBalance?: Maybe<Scalars['Int']['output']>;
  crfTotalBalance?: Maybe<Scalars['Int']['output']>;
  fiscalYear?: Maybe<Scalars['Int']['output']>;
  id: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
  strataId?: Maybe<Scalars['String']['output']>;
  userId: Scalars['ID']['output'];
  year?: Maybe<Scalars['Int']['output']>;
};

export type Component = {
  __typename?: 'Component';
  actionFrequency?: Maybe<Scalars['Int']['output']>;
  buildingId: Scalars['ID']['output'];
  category: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  lastActionYear?: Maybe<Scalars['Int']['output']>;
  name: Scalars['String']['output'];
  nextActionYear?: Maybe<Scalars['Int']['output']>;
  section: Scalars['String']['output'];
  unitRate?: Maybe<Scalars['Float']['output']>;
  yearInstalled?: Maybe<Scalars['Int']['output']>;
};

export type ComponentReport = {
  __typename?: 'ComponentReport';
  action?: Maybe<Scalars['String']['output']>;
  assessmentReportId: Scalars['ID']['output'];
  component: Component;
  componentId: Scalars['ID']['output'];
  condition?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  note?: Maybe<Scalars['String']['output']>;
  priority?: Maybe<ComponentReportPriority>;
  quantityNeeded?: Maybe<Scalars['Int']['output']>;
  yearReviewed?: Maybe<Scalars['Int']['output']>;
};

export enum ComponentReportPriority {
  High = 'HIGH',
  Low = 'LOW',
  Moderate = 'MODERATE'
}

export type CreateAssessmentReport = {
  buildingId: Scalars['ID']['input'];
  draft: Scalars['Boolean']['input'];
  fiscalYear: Scalars['Int']['input'];
};

export type CreateAssessmentReportPdf = {
  assessmentReportId: Scalars['ID']['input'];
};

export type CreateBuilding = {
  address: Scalars['String']['input'];
  crfAnnualContribution?: InputMaybe<Scalars['Int']['input']>;
  crfMinimumBalance?: InputMaybe<Scalars['Int']['input']>;
  crfTotalBalance?: InputMaybe<Scalars['Int']['input']>;
  fiscalYear?: InputMaybe<Scalars['Int']['input']>;
  name: Scalars['String']['input'];
  strataId: Scalars['String']['input'];
  year?: InputMaybe<Scalars['Int']['input']>;
};

export type CreateComponent = {
  actionFrequency?: InputMaybe<Scalars['Int']['input']>;
  buildingId: Scalars['ID']['input'];
  category: Scalars['String']['input'];
  lastActionYear?: InputMaybe<Scalars['Int']['input']>;
  name: Scalars['String']['input'];
  nextActionYear?: InputMaybe<Scalars['Int']['input']>;
  section: Scalars['String']['input'];
  unitRate?: InputMaybe<Scalars['Float']['input']>;
  yearInstalled?: InputMaybe<Scalars['Int']['input']>;
};

export type CreateComponentReport = {
  action: Scalars['String']['input'];
  assessmentReportId: Scalars['ID']['input'];
  componentId: Scalars['ID']['input'];
  condition: Scalars['String']['input'];
  note: Scalars['String']['input'];
  priority: ComponentReportPriority;
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

export type File = {
  __typename?: 'File';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  url: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createAssessmentReport: AssessmentReport;
  createAssessmentReportPDF: AssessmentReportPdfResponse;
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


export type MutationCreateAssessmentReportPdfArgs = {
  input: CreateAssessmentReportPdf;
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
  building: Building;
  buildings: Array<Maybe<Building>>;
  component: Component;
  componentReport: ComponentReport;
  componentReports: Array<Maybe<ComponentReport>>;
  components: Array<Maybe<Component>>;
  user?: Maybe<User>;
};


export type QueryAssessmentReportArgs = {
  id: Scalars['ID']['input'];
};


export type QueryAssessmentReportsArgs = {
  buildingId: Scalars['ID']['input'];
};


export type QueryBuildingArgs = {
  id: Scalars['ID']['input'];
};


export type QueryComponentArgs = {
  componentId: Scalars['ID']['input'];
};


export type QueryComponentReportArgs = {
  componentReportId: Scalars['ID']['input'];
};


export type QueryComponentReportsArgs = {
  assessmentReportId: Scalars['ID']['input'];
};


export type QueryComponentsArgs = {
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
  draft?: InputMaybe<Scalars['Boolean']['input']>;
  fiscalYear?: InputMaybe<Scalars['Int']['input']>;
  id: Scalars['ID']['input'];
};

export type UpdateBuilding = {
  address?: InputMaybe<Scalars['String']['input']>;
  crfAnnualContribution?: InputMaybe<Scalars['Int']['input']>;
  crfMinimumBalance?: InputMaybe<Scalars['Int']['input']>;
  crfTotalBalance?: InputMaybe<Scalars['Int']['input']>;
  fiscalYear?: InputMaybe<Scalars['Int']['input']>;
  id: Scalars['ID']['input'];
  image?: InputMaybe<Scalars['Upload']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  strataId?: InputMaybe<Scalars['String']['input']>;
  year?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdateComponent = {
  actionFrequency?: InputMaybe<Scalars['Int']['input']>;
  category?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  lastActionYear?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  nextActionYear?: InputMaybe<Scalars['Int']['input']>;
  section?: InputMaybe<Scalars['String']['input']>;
  unitRate?: InputMaybe<Scalars['Float']['input']>;
  yearInstalled?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdateComponentReport = {
  action: Scalars['String']['input'];
  condition: Scalars['String']['input'];
  id: Scalars['ID']['input'];
  note: Scalars['String']['input'];
  priority: ComponentReportPriority;
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

export type CreateAssessmentReportMutationVariables = Exact<{
  input: CreateAssessmentReport;
}>;


export type CreateAssessmentReportMutation = { __typename?: 'Mutation', createAssessmentReport: { __typename?: 'AssessmentReport', id: string } };

export type GetAssessmentReportQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetAssessmentReportQuery = { __typename?: 'Query', assessmentReport: { __typename?: 'AssessmentReport', id: string, fiscalYear: number, draft: boolean, building: { __typename?: 'Building', id: string, name?: string | null }, componentReports: Array<{ __typename?: 'ComponentReport', id: string, assessmentReportId: string, componentId: string, action?: string | null, condition?: string | null, note?: string | null, priority?: ComponentReportPriority | null, quantityNeeded?: number | null, yearReviewed?: number | null, component: { __typename?: 'Component', id: string, name: string } } | null> } };

export type BuildingsQueryVariables = Exact<{ [key: string]: never; }>;


export type BuildingsQuery = { __typename?: 'Query', res: Array<{ __typename?: 'Building', id: string, userId: string, name?: string | null, address?: string | null, year?: number | null, crfTotalBalance?: number | null, crfMinimumBalance?: number | null, crfAnnualContribution?: number | null, fiscalYear?: number | null } | null> };

export type BuildingQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type BuildingQuery = { __typename?: 'Query', res: { __typename?: 'Building', id: string, name?: string | null, address?: string | null, year?: number | null } };

export type CreateComponentReportMutationVariables = Exact<{
  input: CreateComponentReport;
}>;


export type CreateComponentReportMutation = { __typename?: 'Mutation', createComponentReport: { __typename?: 'ComponentReport', id: string, componentId: string, assessmentReportId: string, action?: string | null, condition?: string | null, priority?: ComponentReportPriority | null, note?: string | null, quantityNeeded?: number | null, yearReviewed?: number | null } };

export type GetComponentReportQueryVariables = Exact<{
  componentReportId: Scalars['ID']['input'];
}>;


export type GetComponentReportQuery = { __typename?: 'Query', componentReport: { __typename?: 'ComponentReport', id: string, componentId: string, assessmentReportId: string, action?: string | null, condition?: string | null, priority?: ComponentReportPriority | null, note?: string | null, quantityNeeded?: number | null, yearReviewed?: number | null } };

export type UpdateComponentReportMutationVariables = Exact<{
  input: UpdateComponentReport;
}>;


export type UpdateComponentReportMutation = { __typename?: 'Mutation', res: { __typename?: 'ComponentReport', id: string, condition?: string | null, priority?: ComponentReportPriority | null, note?: string | null, quantityNeeded?: number | null, yearReviewed?: number | null, action?: string | null } };

export type ComponentsQueryVariables = Exact<{
  buildingId: Scalars['ID']['input'];
}>;


export type ComponentsQuery = { __typename?: 'Query', res: Array<{ __typename?: 'Component', id: string, name: string, category: string, section: string, actionFrequency?: number | null, nextActionYear?: number | null, yearInstalled?: number | null, unitRate?: number | null, lastActionYear?: number | null } | null> };

export type CreateComponentMutationVariables = Exact<{
  component: CreateComponent;
}>;


export type CreateComponentMutation = { __typename?: 'Mutation', res: { __typename?: 'Component', id: string, name: string, category: string, section: string, actionFrequency?: number | null, nextActionYear?: number | null, yearInstalled?: number | null, unitRate?: number | null } };

export type ComponentQueryVariables = Exact<{
  componentId: Scalars['ID']['input'];
}>;


export type ComponentQuery = { __typename?: 'Query', res: { __typename?: 'Component', id: string, buildingId: string, name: string, category: string, section: string, actionFrequency?: number | null, nextActionYear?: number | null, yearInstalled?: number | null, unitRate?: number | null, lastActionYear?: number | null } };

export type UpdateComponentMutationVariables = Exact<{
  component: UpdateComponent;
}>;


export type UpdateComponentMutation = { __typename?: 'Mutation', res: { __typename?: 'Component', id: string, name: string, category: string, section: string, actionFrequency?: number | null, nextActionYear?: number | null, lastActionYear?: number | null, yearInstalled?: number | null, unitRate?: number | null } };


export const SignInDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SignIn"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SignIn"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"signIn"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}]}]}}]} as unknown as DocumentNode<SignInMutation, SignInMutationVariables>;
export const SignUpDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SignUp"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SignUp"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"signUp"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}]}]}}]} as unknown as DocumentNode<SignUpMutation, SignUpMutationVariables>;
export const CreateAssessmentReportDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateAssessmentReport"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateAssessmentReport"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createAssessmentReport"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateAssessmentReportMutation, CreateAssessmentReportMutationVariables>;
export const GetAssessmentReportDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAssessmentReport"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"assessmentReport"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"building"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"fiscalYear"}},{"kind":"Field","name":{"kind":"Name","value":"draft"}},{"kind":"Field","name":{"kind":"Name","value":"componentReports"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"assessmentReportId"}},{"kind":"Field","name":{"kind":"Name","value":"componentId"}},{"kind":"Field","name":{"kind":"Name","value":"action"}},{"kind":"Field","name":{"kind":"Name","value":"condition"}},{"kind":"Field","name":{"kind":"Name","value":"note"}},{"kind":"Field","name":{"kind":"Name","value":"priority"}},{"kind":"Field","name":{"kind":"Name","value":"quantityNeeded"}},{"kind":"Field","name":{"kind":"Name","value":"yearReviewed"}},{"kind":"Field","name":{"kind":"Name","value":"component"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetAssessmentReportQuery, GetAssessmentReportQueryVariables>;
export const BuildingsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Buildings"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"res"},"name":{"kind":"Name","value":"buildings"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"crfTotalBalance"}},{"kind":"Field","name":{"kind":"Name","value":"crfMinimumBalance"}},{"kind":"Field","name":{"kind":"Name","value":"crfAnnualContribution"}},{"kind":"Field","name":{"kind":"Name","value":"fiscalYear"}}]}}]}}]} as unknown as DocumentNode<BuildingsQuery, BuildingsQueryVariables>;
export const BuildingDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Building"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"res"},"name":{"kind":"Name","value":"building"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"year"}}]}}]}}]} as unknown as DocumentNode<BuildingQuery, BuildingQueryVariables>;
export const CreateComponentReportDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateComponentReport"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateComponentReport"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createComponentReport"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"componentId"}},{"kind":"Field","name":{"kind":"Name","value":"assessmentReportId"}},{"kind":"Field","name":{"kind":"Name","value":"action"}},{"kind":"Field","name":{"kind":"Name","value":"condition"}},{"kind":"Field","name":{"kind":"Name","value":"priority"}},{"kind":"Field","name":{"kind":"Name","value":"note"}},{"kind":"Field","name":{"kind":"Name","value":"quantityNeeded"}},{"kind":"Field","name":{"kind":"Name","value":"yearReviewed"}}]}}]}}]} as unknown as DocumentNode<CreateComponentReportMutation, CreateComponentReportMutationVariables>;
export const GetComponentReportDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetComponentReport"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"componentReportId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"componentReport"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"componentReportId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"componentReportId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"componentId"}},{"kind":"Field","name":{"kind":"Name","value":"assessmentReportId"}},{"kind":"Field","name":{"kind":"Name","value":"action"}},{"kind":"Field","name":{"kind":"Name","value":"condition"}},{"kind":"Field","name":{"kind":"Name","value":"priority"}},{"kind":"Field","name":{"kind":"Name","value":"note"}},{"kind":"Field","name":{"kind":"Name","value":"quantityNeeded"}},{"kind":"Field","name":{"kind":"Name","value":"yearReviewed"}}]}}]}}]} as unknown as DocumentNode<GetComponentReportQuery, GetComponentReportQueryVariables>;
export const UpdateComponentReportDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateComponentReport"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateComponentReport"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"res"},"name":{"kind":"Name","value":"updateComponentReport"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"condition"}},{"kind":"Field","name":{"kind":"Name","value":"priority"}},{"kind":"Field","name":{"kind":"Name","value":"note"}},{"kind":"Field","name":{"kind":"Name","value":"quantityNeeded"}},{"kind":"Field","name":{"kind":"Name","value":"yearReviewed"}},{"kind":"Field","name":{"kind":"Name","value":"action"}}]}}]}}]} as unknown as DocumentNode<UpdateComponentReportMutation, UpdateComponentReportMutationVariables>;
export const ComponentsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Components"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"buildingId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"res"},"name":{"kind":"Name","value":"components"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"buildingId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"buildingId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"section"}},{"kind":"Field","name":{"kind":"Name","value":"actionFrequency"}},{"kind":"Field","name":{"kind":"Name","value":"nextActionYear"}},{"kind":"Field","name":{"kind":"Name","value":"yearInstalled"}},{"kind":"Field","name":{"kind":"Name","value":"unitRate"}},{"kind":"Field","name":{"kind":"Name","value":"lastActionYear"}}]}}]}}]} as unknown as DocumentNode<ComponentsQuery, ComponentsQueryVariables>;
export const CreateComponentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateComponent"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"component"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateComponent"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"res"},"name":{"kind":"Name","value":"createComponent"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"component"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"section"}},{"kind":"Field","name":{"kind":"Name","value":"actionFrequency"}},{"kind":"Field","name":{"kind":"Name","value":"nextActionYear"}},{"kind":"Field","name":{"kind":"Name","value":"yearInstalled"}},{"kind":"Field","name":{"kind":"Name","value":"unitRate"}}]}}]}}]} as unknown as DocumentNode<CreateComponentMutation, CreateComponentMutationVariables>;
export const ComponentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Component"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"componentId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"res"},"name":{"kind":"Name","value":"component"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"componentId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"componentId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"buildingId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"section"}},{"kind":"Field","name":{"kind":"Name","value":"actionFrequency"}},{"kind":"Field","name":{"kind":"Name","value":"nextActionYear"}},{"kind":"Field","name":{"kind":"Name","value":"yearInstalled"}},{"kind":"Field","name":{"kind":"Name","value":"unitRate"}},{"kind":"Field","name":{"kind":"Name","value":"lastActionYear"}}]}}]}}]} as unknown as DocumentNode<ComponentQuery, ComponentQueryVariables>;
export const UpdateComponentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateComponent"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"component"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateComponent"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"res"},"name":{"kind":"Name","value":"updateComponent"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"component"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"section"}},{"kind":"Field","name":{"kind":"Name","value":"actionFrequency"}},{"kind":"Field","name":{"kind":"Name","value":"nextActionYear"}},{"kind":"Field","name":{"kind":"Name","value":"lastActionYear"}},{"kind":"Field","name":{"kind":"Name","value":"yearInstalled"}},{"kind":"Field","name":{"kind":"Name","value":"unitRate"}}]}}]}}]} as unknown as DocumentNode<UpdateComponentMutation, UpdateComponentMutationVariables>;