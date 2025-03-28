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
  crfAnnualContribution: Scalars['Int']['output'];
  crfMinimumBalance: Scalars['Int']['output'];
  crfTotalBalance: Scalars['Int']['output'];
  draft: Scalars['Boolean']['output'];
  fiscalYear: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
};

export type AssessmentReportResponse = {
  __typename?: 'AssessmentReportResponse';
  assessmentReportId: Scalars['ID']['output'];
  excelUrl: Scalars['String']['output'];
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
  images: Array<Maybe<File>>;
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
};

export type CreateBuilding = {
  address: Scalars['String']['input'];
  crfAnnualContribution?: InputMaybe<Scalars['Int']['input']>;
  crfMinimumBalance?: InputMaybe<Scalars['Int']['input']>;
  crfTotalBalance?: InputMaybe<Scalars['Int']['input']>;
  fiscalYear?: InputMaybe<Scalars['Int']['input']>;
  image?: InputMaybe<Scalars['Upload']['input']>;
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
  url: Scalars['String']['output'];
};

export type GenerateAssessmentReport = {
  assessmentReportId: Scalars['ID']['input'];
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
  generateAssessmentReport: AssessmentReportResponse;
  signIn: Scalars['String']['output'];
  signUp: Scalars['Boolean']['output'];
  transcribeAudio: Scalars['String']['output'];
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


export type MutationGenerateAssessmentReportArgs = {
  input: GenerateAssessmentReport;
};


export type MutationSignInArgs = {
  input: SignIn;
};


export type MutationSignUpArgs = {
  input: SignUp;
};


export type MutationTranscribeAudioArgs = {
  input: TranscribeAudio;
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

export type TranscribeAudio = {
  audio: Scalars['Upload']['input'];
};

export type UpdateAssessmentReport = {
  draft?: InputMaybe<Scalars['Boolean']['input']>;
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
  action?: InputMaybe<Scalars['String']['input']>;
  condition?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  images?: InputMaybe<Array<InputMaybe<Scalars['Upload']['input']>>>;
  note?: InputMaybe<Scalars['String']['input']>;
  priority?: InputMaybe<ComponentReportPriority>;
  quantityNeeded?: InputMaybe<Scalars['Int']['input']>;
  removeImages?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  yearReviewed?: InputMaybe<Scalars['Int']['input']>;
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

export type GetAssessmentReportsQueryVariables = Exact<{
  buildingId: Scalars['ID']['input'];
}>;


export type GetAssessmentReportsQuery = { __typename?: 'Query', res: Array<{ __typename?: 'AssessmentReport', id: string, fiscalYear: number } | null> };

export type GetAssessmentReportForPreviewQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetAssessmentReportForPreviewQuery = { __typename?: 'Query', res: { __typename?: 'AssessmentReport', id: string, fiscalYear: number, draft: boolean, crfAnnualContribution: number, crfMinimumBalance: number, crfTotalBalance: number, componentReports: Array<{ __typename?: 'ComponentReport', quantityNeeded?: number | null, component: { __typename?: 'Component', id: string } } | null>, building: { __typename?: 'Building', id: string, name?: string | null, components: Array<{ __typename?: 'Component', id: string, name: string, unitRate?: number | null, nextActionYear?: number | null, actionFrequency?: number | null } | null> } } };

export type UpdateAssessmentReportMutationVariables = Exact<{
  input: UpdateAssessmentReport;
}>;


export type UpdateAssessmentReportMutation = { __typename?: 'Mutation', updateAssessmentReport: { __typename?: 'AssessmentReport', id: string, draft: boolean } };

export type BuildingsOnFirstLoadQueryVariables = Exact<{ [key: string]: never; }>;


export type BuildingsOnFirstLoadQuery = { __typename?: 'Query', res: Array<{ __typename?: 'Building', id: string, userId: string, name?: string | null, address?: string | null, year?: number | null, strataId?: string | null, crfTotalBalance?: number | null, crfMinimumBalance?: number | null, crfAnnualContribution?: number | null, fiscalYear?: number | null } | null> };

export type BuildingsQueryVariables = Exact<{ [key: string]: never; }>;


export type BuildingsQuery = { __typename?: 'Query', res: Array<{ __typename?: 'Building', id: string, userId: string, name?: string | null, address?: string | null, year?: number | null, strataId?: string | null, crfTotalBalance?: number | null, crfMinimumBalance?: number | null, crfAnnualContribution?: number | null, fiscalYear?: number | null, assessmentReports: Array<{ __typename?: 'AssessmentReport', id: string, fiscalYear: number, draft: boolean } | null> } | null> };

export type GetBuildingQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetBuildingQuery = { __typename?: 'Query', res: { __typename?: 'Building', id: string, name?: string | null, year?: number | null, address?: string | null, strataId?: string | null, crfTotalBalance?: number | null, crfMinimumBalance?: number | null, crfAnnualContribution?: number | null, fiscalYear?: number | null, assessmentReports: Array<{ __typename?: 'AssessmentReport', id: string, fiscalYear: number, draft: boolean } | null> } };

export type CreateComponentReportMutationVariables = Exact<{
  input: CreateComponentReport;
}>;


export type CreateComponentReportMutation = { __typename?: 'Mutation', createComponentReport: { __typename?: 'ComponentReport', id: string, componentId: string, assessmentReportId: string, action?: string | null, condition?: string | null, priority?: ComponentReportPriority | null, note?: string | null, quantityNeeded?: number | null, yearReviewed?: number | null } };

export type GetComponentReportQueryVariables = Exact<{
  componentReportId: Scalars['ID']['input'];
}>;


export type GetComponentReportQuery = { __typename?: 'Query', componentReport: { __typename?: 'ComponentReport', id: string, componentId: string, assessmentReportId: string, action?: string | null, condition?: string | null, priority?: ComponentReportPriority | null, note?: string | null, quantityNeeded?: number | null, yearReviewed?: number | null, images: Array<{ __typename?: 'File', id: string, url: string } | null> } };

export type GetComponentReportsQueryVariables = Exact<{
  assessmentReportId: Scalars['ID']['input'];
}>;


export type GetComponentReportsQuery = { __typename?: 'Query', componentReports: Array<{ __typename?: 'ComponentReport', id: string, componentId: string, action?: string | null, condition?: string | null, priority?: ComponentReportPriority | null, note?: string | null, quantityNeeded?: number | null, yearReviewed?: number | null, assessmentReportId: string } | null> };

export type UpdateComponentReportMutationVariables = Exact<{
  input: UpdateComponentReport;
}>;


export type UpdateComponentReportMutation = { __typename?: 'Mutation', res: { __typename?: 'ComponentReport', id: string, condition?: string | null, priority?: ComponentReportPriority | null, note?: string | null, quantityNeeded?: number | null, yearReviewed?: number | null, action?: string | null, images: Array<{ __typename?: 'File', id: string, url: string } | null> } };

export type ComponentsQueryVariables = Exact<{
  buildingId: Scalars['ID']['input'];
}>;


export type ComponentsQuery = { __typename?: 'Query', res: Array<{ __typename?: 'Component', id: string, buildingId: string, name: string, category: string, section: string, actionFrequency?: number | null, nextActionYear?: number | null, yearInstalled?: number | null, unitRate?: number | null, lastActionYear?: number | null } | null> };

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

export type CreateBuildingMutationVariables = Exact<{
  input: CreateBuilding;
}>;


export type CreateBuildingMutation = { __typename?: 'Mutation', createBuilding: { __typename?: 'Building', id: string, name?: string | null, address?: string | null, year?: number | null, strataId?: string | null, fiscalYear?: number | null, crfAnnualContribution?: number | null, crfTotalBalance?: number | null, crfMinimumBalance?: number | null } };

export type UpdateBuildingMutationVariables = Exact<{
  input: UpdateBuilding;
}>;


export type UpdateBuildingMutation = { __typename?: 'Mutation', updateBuilding: { __typename?: 'Building', id: string, name?: string | null, address?: string | null, year?: number | null, strataId?: string | null, fiscalYear?: number | null, crfAnnualContribution?: number | null, crfTotalBalance?: number | null, crfMinimumBalance?: number | null } };

export type GenerateExcelMutationVariables = Exact<{
  input: GenerateAssessmentReport;
}>;


export type GenerateExcelMutation = { __typename?: 'Mutation', res: { __typename?: 'AssessmentReportResponse', pdfUrl: string, excelUrl: string, assessmentReportId: string } };


export const SignInDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SignIn"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SignIn"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"signIn"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}]}]}}]} as unknown as DocumentNode<SignInMutation, SignInMutationVariables>;
export const SignUpDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SignUp"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SignUp"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"signUp"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}]}]}}]} as unknown as DocumentNode<SignUpMutation, SignUpMutationVariables>;
export const CreateAssessmentReportDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateAssessmentReport"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateAssessmentReport"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createAssessmentReport"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateAssessmentReportMutation, CreateAssessmentReportMutationVariables>;
export const GetAssessmentReportsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAssessmentReports"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"buildingId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"res"},"name":{"kind":"Name","value":"assessmentReports"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"buildingId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"buildingId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fiscalYear"}}]}}]}}]} as unknown as DocumentNode<GetAssessmentReportsQuery, GetAssessmentReportsQueryVariables>;
export const GetAssessmentReportForPreviewDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAssessmentReportForPreview"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"res"},"name":{"kind":"Name","value":"assessmentReport"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fiscalYear"}},{"kind":"Field","name":{"kind":"Name","value":"draft"}},{"kind":"Field","name":{"kind":"Name","value":"componentReports"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"quantityNeeded"}},{"kind":"Field","name":{"kind":"Name","value":"component"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"building"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"components"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"unitRate"}},{"kind":"Field","name":{"kind":"Name","value":"nextActionYear"}},{"kind":"Field","name":{"kind":"Name","value":"actionFrequency"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"crfAnnualContribution"}},{"kind":"Field","name":{"kind":"Name","value":"crfMinimumBalance"}},{"kind":"Field","name":{"kind":"Name","value":"crfTotalBalance"}}]}}]}}]} as unknown as DocumentNode<GetAssessmentReportForPreviewQuery, GetAssessmentReportForPreviewQueryVariables>;
export const UpdateAssessmentReportDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateAssessmentReport"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateAssessmentReport"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateAssessmentReport"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"draft"}}]}}]}}]} as unknown as DocumentNode<UpdateAssessmentReportMutation, UpdateAssessmentReportMutationVariables>;
export const BuildingsOnFirstLoadDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"BuildingsOnFirstLoad"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"res"},"name":{"kind":"Name","value":"buildings"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"strataId"}},{"kind":"Field","name":{"kind":"Name","value":"crfTotalBalance"}},{"kind":"Field","name":{"kind":"Name","value":"crfMinimumBalance"}},{"kind":"Field","name":{"kind":"Name","value":"crfAnnualContribution"}},{"kind":"Field","name":{"kind":"Name","value":"fiscalYear"}}]}}]}}]} as unknown as DocumentNode<BuildingsOnFirstLoadQuery, BuildingsOnFirstLoadQueryVariables>;
export const BuildingsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Buildings"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"res"},"name":{"kind":"Name","value":"buildings"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"strataId"}},{"kind":"Field","name":{"kind":"Name","value":"crfTotalBalance"}},{"kind":"Field","name":{"kind":"Name","value":"crfMinimumBalance"}},{"kind":"Field","name":{"kind":"Name","value":"crfAnnualContribution"}},{"kind":"Field","name":{"kind":"Name","value":"fiscalYear"}},{"kind":"Field","name":{"kind":"Name","value":"assessmentReports"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fiscalYear"}},{"kind":"Field","name":{"kind":"Name","value":"draft"}}]}}]}}]}}]} as unknown as DocumentNode<BuildingsQuery, BuildingsQueryVariables>;
export const GetBuildingDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetBuilding"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"res"},"name":{"kind":"Name","value":"building"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"strataId"}},{"kind":"Field","name":{"kind":"Name","value":"crfTotalBalance"}},{"kind":"Field","name":{"kind":"Name","value":"crfMinimumBalance"}},{"kind":"Field","name":{"kind":"Name","value":"crfAnnualContribution"}},{"kind":"Field","name":{"kind":"Name","value":"fiscalYear"}},{"kind":"Field","name":{"kind":"Name","value":"assessmentReports"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fiscalYear"}},{"kind":"Field","name":{"kind":"Name","value":"draft"}}]}}]}}]}}]} as unknown as DocumentNode<GetBuildingQuery, GetBuildingQueryVariables>;
export const CreateComponentReportDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateComponentReport"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateComponentReport"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createComponentReport"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"componentId"}},{"kind":"Field","name":{"kind":"Name","value":"assessmentReportId"}},{"kind":"Field","name":{"kind":"Name","value":"action"}},{"kind":"Field","name":{"kind":"Name","value":"condition"}},{"kind":"Field","name":{"kind":"Name","value":"priority"}},{"kind":"Field","name":{"kind":"Name","value":"note"}},{"kind":"Field","name":{"kind":"Name","value":"quantityNeeded"}},{"kind":"Field","name":{"kind":"Name","value":"yearReviewed"}}]}}]}}]} as unknown as DocumentNode<CreateComponentReportMutation, CreateComponentReportMutationVariables>;
export const GetComponentReportDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetComponentReport"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"componentReportId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"componentReport"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"componentReportId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"componentReportId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"componentId"}},{"kind":"Field","name":{"kind":"Name","value":"assessmentReportId"}},{"kind":"Field","name":{"kind":"Name","value":"action"}},{"kind":"Field","name":{"kind":"Name","value":"condition"}},{"kind":"Field","name":{"kind":"Name","value":"priority"}},{"kind":"Field","name":{"kind":"Name","value":"note"}},{"kind":"Field","name":{"kind":"Name","value":"quantityNeeded"}},{"kind":"Field","name":{"kind":"Name","value":"yearReviewed"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}}]}}]} as unknown as DocumentNode<GetComponentReportQuery, GetComponentReportQueryVariables>;
export const GetComponentReportsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetComponentReports"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"assessmentReportId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"componentReports"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"assessmentReportId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"assessmentReportId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"componentId"}},{"kind":"Field","name":{"kind":"Name","value":"action"}},{"kind":"Field","name":{"kind":"Name","value":"condition"}},{"kind":"Field","name":{"kind":"Name","value":"priority"}},{"kind":"Field","name":{"kind":"Name","value":"note"}},{"kind":"Field","name":{"kind":"Name","value":"quantityNeeded"}},{"kind":"Field","name":{"kind":"Name","value":"yearReviewed"}},{"kind":"Field","name":{"kind":"Name","value":"assessmentReportId"}}]}}]}}]} as unknown as DocumentNode<GetComponentReportsQuery, GetComponentReportsQueryVariables>;
export const UpdateComponentReportDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateComponentReport"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateComponentReport"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"res"},"name":{"kind":"Name","value":"updateComponentReport"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"condition"}},{"kind":"Field","name":{"kind":"Name","value":"priority"}},{"kind":"Field","name":{"kind":"Name","value":"note"}},{"kind":"Field","name":{"kind":"Name","value":"quantityNeeded"}},{"kind":"Field","name":{"kind":"Name","value":"yearReviewed"}},{"kind":"Field","name":{"kind":"Name","value":"action"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateComponentReportMutation, UpdateComponentReportMutationVariables>;
export const ComponentsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Components"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"buildingId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"res"},"name":{"kind":"Name","value":"components"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"buildingId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"buildingId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"buildingId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"section"}},{"kind":"Field","name":{"kind":"Name","value":"actionFrequency"}},{"kind":"Field","name":{"kind":"Name","value":"nextActionYear"}},{"kind":"Field","name":{"kind":"Name","value":"yearInstalled"}},{"kind":"Field","name":{"kind":"Name","value":"unitRate"}},{"kind":"Field","name":{"kind":"Name","value":"lastActionYear"}}]}}]}}]} as unknown as DocumentNode<ComponentsQuery, ComponentsQueryVariables>;
export const CreateComponentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateComponent"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"component"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateComponent"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"res"},"name":{"kind":"Name","value":"createComponent"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"component"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"section"}},{"kind":"Field","name":{"kind":"Name","value":"actionFrequency"}},{"kind":"Field","name":{"kind":"Name","value":"nextActionYear"}},{"kind":"Field","name":{"kind":"Name","value":"yearInstalled"}},{"kind":"Field","name":{"kind":"Name","value":"unitRate"}}]}}]}}]} as unknown as DocumentNode<CreateComponentMutation, CreateComponentMutationVariables>;
export const ComponentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Component"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"componentId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"res"},"name":{"kind":"Name","value":"component"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"componentId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"componentId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"buildingId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"section"}},{"kind":"Field","name":{"kind":"Name","value":"actionFrequency"}},{"kind":"Field","name":{"kind":"Name","value":"nextActionYear"}},{"kind":"Field","name":{"kind":"Name","value":"yearInstalled"}},{"kind":"Field","name":{"kind":"Name","value":"unitRate"}},{"kind":"Field","name":{"kind":"Name","value":"lastActionYear"}}]}}]}}]} as unknown as DocumentNode<ComponentQuery, ComponentQueryVariables>;
export const UpdateComponentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateComponent"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"component"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateComponent"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"res"},"name":{"kind":"Name","value":"updateComponent"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"component"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"section"}},{"kind":"Field","name":{"kind":"Name","value":"actionFrequency"}},{"kind":"Field","name":{"kind":"Name","value":"nextActionYear"}},{"kind":"Field","name":{"kind":"Name","value":"lastActionYear"}},{"kind":"Field","name":{"kind":"Name","value":"yearInstalled"}},{"kind":"Field","name":{"kind":"Name","value":"unitRate"}}]}}]}}]} as unknown as DocumentNode<UpdateComponentMutation, UpdateComponentMutationVariables>;
export const CreateBuildingDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateBuilding"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateBuilding"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createBuilding"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"strataId"}},{"kind":"Field","name":{"kind":"Name","value":"fiscalYear"}},{"kind":"Field","name":{"kind":"Name","value":"crfAnnualContribution"}},{"kind":"Field","name":{"kind":"Name","value":"crfTotalBalance"}},{"kind":"Field","name":{"kind":"Name","value":"crfMinimumBalance"}}]}}]}}]} as unknown as DocumentNode<CreateBuildingMutation, CreateBuildingMutationVariables>;
export const UpdateBuildingDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateBuilding"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateBuilding"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateBuilding"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"strataId"}},{"kind":"Field","name":{"kind":"Name","value":"fiscalYear"}},{"kind":"Field","name":{"kind":"Name","value":"crfAnnualContribution"}},{"kind":"Field","name":{"kind":"Name","value":"crfTotalBalance"}},{"kind":"Field","name":{"kind":"Name","value":"crfMinimumBalance"}}]}}]}}]} as unknown as DocumentNode<UpdateBuildingMutation, UpdateBuildingMutationVariables>;
export const GenerateExcelDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"GenerateExcel"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"GenerateAssessmentReport"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"res"},"name":{"kind":"Name","value":"generateAssessmentReport"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"pdfUrl"}},{"kind":"Field","name":{"kind":"Name","value":"excelUrl"}},{"kind":"Field","name":{"kind":"Name","value":"assessmentReportId"}}]}}]}}]} as unknown as DocumentNode<GenerateExcelMutation, GenerateExcelMutationVariables>;