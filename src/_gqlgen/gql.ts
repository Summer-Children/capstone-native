/* eslint-disable */
import * as types from './graphql';
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n    mutation SignIn($input: SignIn!) {\n        signIn(input: $input)\n    }\n": typeof types.SignInDocument,
    "\n    mutation SignUp($input: SignUp!) {\n        signUp(input: $input)\n    }\n": typeof types.SignUpDocument,
    "\n    mutation CreateAssessmentReport($input: CreateAssessmentReport!) {\n        createAssessmentReport(input: $input) {\n            id\n        }\n    }\n": typeof types.CreateAssessmentReportDocument,
    "\n    query GetAssessmentReport($id: ID!) {\n        assessmentReport(id: $id) {\n            id\n            building {\n                id\n                name\n            }\n            fiscalYear\n            draft\n            componentReports {\n                id\n                assessmentReportId\n                componentId\n                action\n                condition\n                note\n                priority\n                quantityNeeded\n                yearReviewed\n                component {\n                    id\n                    name\n                }\n            }\n        }\n    }\n": typeof types.GetAssessmentReportDocument,
    "\n    query Buildings {\n        res: buildings {\n            id\n            userId\n            name\n            address\n            year\n            crfTotalBalance\n            crfMinimumBalance\n            crfAnnualContribution\n            fiscalYear\n        }\n    }\n": typeof types.BuildingsDocument,
    "\n    query Building($id: ID!) {\n        res: building(id: $id) {\n            id\n            name\n            address\n            year\n        }\n    }\n": typeof types.BuildingDocument,
    "\n    mutation CreateComponentReport($input: CreateComponentReport!) {\n        createComponentReport(input: $input) {\n            id\n            componentId\n            assessmentReportId\n            action\n            condition\n            priority\n            note\n            quantityNeeded\n            yearReviewed\n        }\n    }\n": typeof types.CreateComponentReportDocument,
    "\n    query GetComponentReport($componentReportId: ID!) {\n        componentReport(componentReportId: $componentReportId) {\n            id\n            componentId\n            assessmentReportId\n            action\n            condition\n            priority\n            note\n            quantityNeeded\n            yearReviewed\n        }\n    }\n": typeof types.GetComponentReportDocument,
    "\n    mutation UpdateComponentReport($input: UpdateComponentReport!) {\n        res: updateComponentReport(input: $input) {\n            id\n            condition\n            priority\n            note\n            quantityNeeded\n            yearReviewed\n            action\n        }\n    }\n": typeof types.UpdateComponentReportDocument,
    "\n    query Components($buildingId: ID!) {\n        res: components(buildingId: $buildingId) {\n            id\n            name\n            category\n            section\n            actionFrequency\n            nextActionYear\n            yearInstalled\n            unitRate\n            lastActionYear\n        }\n    }\n": typeof types.ComponentsDocument,
    "\n    mutation CreateComponent($component: CreateComponent!) {\n        res: createComponent(input: $component) {\n            id\n            name\n            category\n            section\n            actionFrequency\n            nextActionYear\n            yearInstalled\n            unitRate\n        }\n    }\n": typeof types.CreateComponentDocument,
    "\n    query Component($componentId: ID!) {\n        res: component(componentId: $componentId) {\n            id\n            buildingId\n            name\n            category\n            section\n            actionFrequency\n            nextActionYear\n            yearInstalled\n            unitRate\n            lastActionYear\n        }\n    }\n": typeof types.ComponentDocument,
    "\n    mutation UpdateComponent($component: UpdateComponent!) {\n        res: updateComponent(input: $component) {\n            id\n            name\n            category\n            section\n            actionFrequency\n            nextActionYear\n            lastActionYear\n            yearInstalled\n            unitRate\n        }\n    }\n": typeof types.UpdateComponentDocument,
};
const documents: Documents = {
    "\n    mutation SignIn($input: SignIn!) {\n        signIn(input: $input)\n    }\n": types.SignInDocument,
    "\n    mutation SignUp($input: SignUp!) {\n        signUp(input: $input)\n    }\n": types.SignUpDocument,
    "\n    mutation CreateAssessmentReport($input: CreateAssessmentReport!) {\n        createAssessmentReport(input: $input) {\n            id\n        }\n    }\n": types.CreateAssessmentReportDocument,
    "\n    query GetAssessmentReport($id: ID!) {\n        assessmentReport(id: $id) {\n            id\n            building {\n                id\n                name\n            }\n            fiscalYear\n            draft\n            componentReports {\n                id\n                assessmentReportId\n                componentId\n                action\n                condition\n                note\n                priority\n                quantityNeeded\n                yearReviewed\n                component {\n                    id\n                    name\n                }\n            }\n        }\n    }\n": types.GetAssessmentReportDocument,
    "\n    query Buildings {\n        res: buildings {\n            id\n            userId\n            name\n            address\n            year\n            crfTotalBalance\n            crfMinimumBalance\n            crfAnnualContribution\n            fiscalYear\n        }\n    }\n": types.BuildingsDocument,
    "\n    query Building($id: ID!) {\n        res: building(id: $id) {\n            id\n            name\n            address\n            year\n        }\n    }\n": types.BuildingDocument,
    "\n    mutation CreateComponentReport($input: CreateComponentReport!) {\n        createComponentReport(input: $input) {\n            id\n            componentId\n            assessmentReportId\n            action\n            condition\n            priority\n            note\n            quantityNeeded\n            yearReviewed\n        }\n    }\n": types.CreateComponentReportDocument,
    "\n    query GetComponentReport($componentReportId: ID!) {\n        componentReport(componentReportId: $componentReportId) {\n            id\n            componentId\n            assessmentReportId\n            action\n            condition\n            priority\n            note\n            quantityNeeded\n            yearReviewed\n        }\n    }\n": types.GetComponentReportDocument,
    "\n    mutation UpdateComponentReport($input: UpdateComponentReport!) {\n        res: updateComponentReport(input: $input) {\n            id\n            condition\n            priority\n            note\n            quantityNeeded\n            yearReviewed\n            action\n        }\n    }\n": types.UpdateComponentReportDocument,
    "\n    query Components($buildingId: ID!) {\n        res: components(buildingId: $buildingId) {\n            id\n            name\n            category\n            section\n            actionFrequency\n            nextActionYear\n            yearInstalled\n            unitRate\n            lastActionYear\n        }\n    }\n": types.ComponentsDocument,
    "\n    mutation CreateComponent($component: CreateComponent!) {\n        res: createComponent(input: $component) {\n            id\n            name\n            category\n            section\n            actionFrequency\n            nextActionYear\n            yearInstalled\n            unitRate\n        }\n    }\n": types.CreateComponentDocument,
    "\n    query Component($componentId: ID!) {\n        res: component(componentId: $componentId) {\n            id\n            buildingId\n            name\n            category\n            section\n            actionFrequency\n            nextActionYear\n            yearInstalled\n            unitRate\n            lastActionYear\n        }\n    }\n": types.ComponentDocument,
    "\n    mutation UpdateComponent($component: UpdateComponent!) {\n        res: updateComponent(input: $component) {\n            id\n            name\n            category\n            section\n            actionFrequency\n            nextActionYear\n            lastActionYear\n            yearInstalled\n            unitRate\n        }\n    }\n": types.UpdateComponentDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation SignIn($input: SignIn!) {\n        signIn(input: $input)\n    }\n"): (typeof documents)["\n    mutation SignIn($input: SignIn!) {\n        signIn(input: $input)\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation SignUp($input: SignUp!) {\n        signUp(input: $input)\n    }\n"): (typeof documents)["\n    mutation SignUp($input: SignUp!) {\n        signUp(input: $input)\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation CreateAssessmentReport($input: CreateAssessmentReport!) {\n        createAssessmentReport(input: $input) {\n            id\n        }\n    }\n"): (typeof documents)["\n    mutation CreateAssessmentReport($input: CreateAssessmentReport!) {\n        createAssessmentReport(input: $input) {\n            id\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query GetAssessmentReport($id: ID!) {\n        assessmentReport(id: $id) {\n            id\n            building {\n                id\n                name\n            }\n            fiscalYear\n            draft\n            componentReports {\n                id\n                assessmentReportId\n                componentId\n                action\n                condition\n                note\n                priority\n                quantityNeeded\n                yearReviewed\n                component {\n                    id\n                    name\n                }\n            }\n        }\n    }\n"): (typeof documents)["\n    query GetAssessmentReport($id: ID!) {\n        assessmentReport(id: $id) {\n            id\n            building {\n                id\n                name\n            }\n            fiscalYear\n            draft\n            componentReports {\n                id\n                assessmentReportId\n                componentId\n                action\n                condition\n                note\n                priority\n                quantityNeeded\n                yearReviewed\n                component {\n                    id\n                    name\n                }\n            }\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query Buildings {\n        res: buildings {\n            id\n            userId\n            name\n            address\n            year\n            crfTotalBalance\n            crfMinimumBalance\n            crfAnnualContribution\n            fiscalYear\n        }\n    }\n"): (typeof documents)["\n    query Buildings {\n        res: buildings {\n            id\n            userId\n            name\n            address\n            year\n            crfTotalBalance\n            crfMinimumBalance\n            crfAnnualContribution\n            fiscalYear\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query Building($id: ID!) {\n        res: building(id: $id) {\n            id\n            name\n            address\n            year\n        }\n    }\n"): (typeof documents)["\n    query Building($id: ID!) {\n        res: building(id: $id) {\n            id\n            name\n            address\n            year\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation CreateComponentReport($input: CreateComponentReport!) {\n        createComponentReport(input: $input) {\n            id\n            componentId\n            assessmentReportId\n            action\n            condition\n            priority\n            note\n            quantityNeeded\n            yearReviewed\n        }\n    }\n"): (typeof documents)["\n    mutation CreateComponentReport($input: CreateComponentReport!) {\n        createComponentReport(input: $input) {\n            id\n            componentId\n            assessmentReportId\n            action\n            condition\n            priority\n            note\n            quantityNeeded\n            yearReviewed\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query GetComponentReport($componentReportId: ID!) {\n        componentReport(componentReportId: $componentReportId) {\n            id\n            componentId\n            assessmentReportId\n            action\n            condition\n            priority\n            note\n            quantityNeeded\n            yearReviewed\n        }\n    }\n"): (typeof documents)["\n    query GetComponentReport($componentReportId: ID!) {\n        componentReport(componentReportId: $componentReportId) {\n            id\n            componentId\n            assessmentReportId\n            action\n            condition\n            priority\n            note\n            quantityNeeded\n            yearReviewed\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation UpdateComponentReport($input: UpdateComponentReport!) {\n        res: updateComponentReport(input: $input) {\n            id\n            condition\n            priority\n            note\n            quantityNeeded\n            yearReviewed\n            action\n        }\n    }\n"): (typeof documents)["\n    mutation UpdateComponentReport($input: UpdateComponentReport!) {\n        res: updateComponentReport(input: $input) {\n            id\n            condition\n            priority\n            note\n            quantityNeeded\n            yearReviewed\n            action\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query Components($buildingId: ID!) {\n        res: components(buildingId: $buildingId) {\n            id\n            name\n            category\n            section\n            actionFrequency\n            nextActionYear\n            yearInstalled\n            unitRate\n            lastActionYear\n        }\n    }\n"): (typeof documents)["\n    query Components($buildingId: ID!) {\n        res: components(buildingId: $buildingId) {\n            id\n            name\n            category\n            section\n            actionFrequency\n            nextActionYear\n            yearInstalled\n            unitRate\n            lastActionYear\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation CreateComponent($component: CreateComponent!) {\n        res: createComponent(input: $component) {\n            id\n            name\n            category\n            section\n            actionFrequency\n            nextActionYear\n            yearInstalled\n            unitRate\n        }\n    }\n"): (typeof documents)["\n    mutation CreateComponent($component: CreateComponent!) {\n        res: createComponent(input: $component) {\n            id\n            name\n            category\n            section\n            actionFrequency\n            nextActionYear\n            yearInstalled\n            unitRate\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query Component($componentId: ID!) {\n        res: component(componentId: $componentId) {\n            id\n            buildingId\n            name\n            category\n            section\n            actionFrequency\n            nextActionYear\n            yearInstalled\n            unitRate\n            lastActionYear\n        }\n    }\n"): (typeof documents)["\n    query Component($componentId: ID!) {\n        res: component(componentId: $componentId) {\n            id\n            buildingId\n            name\n            category\n            section\n            actionFrequency\n            nextActionYear\n            yearInstalled\n            unitRate\n            lastActionYear\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation UpdateComponent($component: UpdateComponent!) {\n        res: updateComponent(input: $component) {\n            id\n            name\n            category\n            section\n            actionFrequency\n            nextActionYear\n            lastActionYear\n            yearInstalled\n            unitRate\n        }\n    }\n"): (typeof documents)["\n    mutation UpdateComponent($component: UpdateComponent!) {\n        res: updateComponent(input: $component) {\n            id\n            name\n            category\n            section\n            actionFrequency\n            nextActionYear\n            lastActionYear\n            yearInstalled\n            unitRate\n        }\n    }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;