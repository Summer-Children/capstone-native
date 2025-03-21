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
    "\n    mutation UpdateAssessmentReport($input: UpdateAssessmentReport!) {\n        updateAssessmentReport(input: $input) {\n            id\n            draft\n        }\n    }\n": typeof types.UpdateAssessmentReportDocument,
    "\n    query BuildingsOnFirstLoad {\n        res: buildings {\n            id\n            userId\n            name\n            address\n            year\n            strataId\n            crfTotalBalance\n            crfMinimumBalance\n            crfAnnualContribution\n            fiscalYear\n        }\n    }\n": typeof types.BuildingsOnFirstLoadDocument,
    "\n    query Buildings {\n        res: buildings {\n            id\n            userId\n            name\n            address\n            year\n            strataId\n            crfTotalBalance\n            crfMinimumBalance\n            crfAnnualContribution\n            fiscalYear\n            assessmentReports {\n                id\n                fiscalYear\n                draft\n            }\n        }\n    }\n": typeof types.BuildingsDocument,
    "\n    query GetBuilding($id: ID!) {\n        res: building(id: $id) {\n            id\n            name\n            year\n            address\n            strataId\n            crfTotalBalance\n            crfMinimumBalance\n            crfAnnualContribution\n            fiscalYear\n            assessmentReports {\n                id\n                fiscalYear\n                draft\n            }\n        }\n    }\n": typeof types.GetBuildingDocument,
    "\n    mutation CreateComponentReport($input: CreateComponentReport!) {\n        createComponentReport(input: $input) {\n            id\n            componentId\n            assessmentReportId\n            action\n            condition\n            priority\n            note\n            quantityNeeded\n            yearReviewed\n        }\n    }\n": typeof types.CreateComponentReportDocument,
    "\n    query GetComponentReport($componentReportId: ID!) {\n        componentReport(componentReportId: $componentReportId) {\n            id\n            componentId\n            assessmentReportId\n            action\n            condition\n            priority\n            note\n            quantityNeeded\n            yearReviewed\n            images {\n                id\n                url\n            }\n        }\n    }\n": typeof types.GetComponentReportDocument,
    "\n    query GetComponentReports($assessmentReportId: ID!) {\n        componentReports(assessmentReportId: $assessmentReportId) {\n            id\n            componentId\n            action\n            condition\n            priority\n            note\n            quantityNeeded\n            yearReviewed\n            assessmentReportId\n        }\n    }\n": typeof types.GetComponentReportsDocument,
    "\n    mutation UpdateComponentReport($input: UpdateComponentReport!) {\n        res: updateComponentReport(input: $input) {\n            id\n            condition\n            priority\n            note\n            quantityNeeded\n            yearReviewed\n            action\n            images {\n                id\n                url\n            }\n        }\n    }\n": typeof types.UpdateComponentReportDocument,
    "\n    query Components($buildingId: ID!) {\n        res: components(buildingId: $buildingId) {\n            id\n            buildingId\n            name\n            category\n            section\n            actionFrequency\n            nextActionYear\n            yearInstalled\n            unitRate\n            lastActionYear\n        }\n    }\n": typeof types.ComponentsDocument,
    "\n    mutation CreateComponent($component: CreateComponent!) {\n        res: createComponent(input: $component) {\n            id\n            name\n            category\n            section\n            actionFrequency\n            nextActionYear\n            yearInstalled\n            unitRate\n        }\n    }\n": typeof types.CreateComponentDocument,
    "\n    query Component($componentId: ID!) {\n        res: component(componentId: $componentId) {\n            id\n            buildingId\n            name\n            category\n            section\n            actionFrequency\n            nextActionYear\n            yearInstalled\n            unitRate\n            lastActionYear\n        }\n    }\n": typeof types.ComponentDocument,
    "\n    mutation UpdateComponent($component: UpdateComponent!) {\n        res: updateComponent(input: $component) {\n            id\n            name\n            category\n            section\n            actionFrequency\n            nextActionYear\n            lastActionYear\n            yearInstalled\n            unitRate\n        }\n    }\n": typeof types.UpdateComponentDocument,
    "\n    mutation CreateBuilding($input: CreateBuilding!) {\n        createBuilding(input: $input) {\n            id\n            name\n            address\n            year\n            strataId\n            fiscalYear\n            crfAnnualContribution\n            crfTotalBalance\n            crfMinimumBalance\n        }\n    }\n": typeof types.CreateBuildingDocument,
    "\n    mutation UpdateBuilding($input: UpdateBuilding!) {\n        updateBuilding(input: $input) {\n            id\n            name\n            address\n            year\n            strataId\n            fiscalYear\n            crfAnnualContribution\n            crfTotalBalance\n            crfMinimumBalance\n        }\n    }\n": typeof types.UpdateBuildingDocument,
    "\n    mutation generateAssessmentReport($input: GenerateAssessmentReport!) {\n        res: generateAssessmentReport(input: $input) {\n            pdfUrl\n            assessmentReportId\n            excelUrl\n        }\n    }\n": typeof types.GenerateAssessmentReportDocument,
};
const documents: Documents = {
    "\n    mutation SignIn($input: SignIn!) {\n        signIn(input: $input)\n    }\n": types.SignInDocument,
    "\n    mutation SignUp($input: SignUp!) {\n        signUp(input: $input)\n    }\n": types.SignUpDocument,
    "\n    mutation CreateAssessmentReport($input: CreateAssessmentReport!) {\n        createAssessmentReport(input: $input) {\n            id\n        }\n    }\n": types.CreateAssessmentReportDocument,
    "\n    query GetAssessmentReport($id: ID!) {\n        assessmentReport(id: $id) {\n            id\n            building {\n                id\n                name\n            }\n            fiscalYear\n            draft\n            componentReports {\n                id\n                assessmentReportId\n                componentId\n                action\n                condition\n                note\n                priority\n                quantityNeeded\n                yearReviewed\n                component {\n                    id\n                    name\n                }\n            }\n        }\n    }\n": types.GetAssessmentReportDocument,
    "\n    mutation UpdateAssessmentReport($input: UpdateAssessmentReport!) {\n        updateAssessmentReport(input: $input) {\n            id\n            draft\n        }\n    }\n": types.UpdateAssessmentReportDocument,
    "\n    query BuildingsOnFirstLoad {\n        res: buildings {\n            id\n            userId\n            name\n            address\n            year\n            strataId\n            crfTotalBalance\n            crfMinimumBalance\n            crfAnnualContribution\n            fiscalYear\n        }\n    }\n": types.BuildingsOnFirstLoadDocument,
    "\n    query Buildings {\n        res: buildings {\n            id\n            userId\n            name\n            address\n            year\n            strataId\n            crfTotalBalance\n            crfMinimumBalance\n            crfAnnualContribution\n            fiscalYear\n            assessmentReports {\n                id\n                fiscalYear\n                draft\n            }\n        }\n    }\n": types.BuildingsDocument,
    "\n    query GetBuilding($id: ID!) {\n        res: building(id: $id) {\n            id\n            name\n            year\n            address\n            strataId\n            crfTotalBalance\n            crfMinimumBalance\n            crfAnnualContribution\n            fiscalYear\n            assessmentReports {\n                id\n                fiscalYear\n                draft\n            }\n        }\n    }\n": types.GetBuildingDocument,
    "\n    mutation CreateComponentReport($input: CreateComponentReport!) {\n        createComponentReport(input: $input) {\n            id\n            componentId\n            assessmentReportId\n            action\n            condition\n            priority\n            note\n            quantityNeeded\n            yearReviewed\n        }\n    }\n": types.CreateComponentReportDocument,
    "\n    query GetComponentReport($componentReportId: ID!) {\n        componentReport(componentReportId: $componentReportId) {\n            id\n            componentId\n            assessmentReportId\n            action\n            condition\n            priority\n            note\n            quantityNeeded\n            yearReviewed\n            images {\n                id\n                url\n            }\n        }\n    }\n": types.GetComponentReportDocument,
    "\n    query GetComponentReports($assessmentReportId: ID!) {\n        componentReports(assessmentReportId: $assessmentReportId) {\n            id\n            componentId\n            action\n            condition\n            priority\n            note\n            quantityNeeded\n            yearReviewed\n            assessmentReportId\n        }\n    }\n": types.GetComponentReportsDocument,
    "\n    mutation UpdateComponentReport($input: UpdateComponentReport!) {\n        res: updateComponentReport(input: $input) {\n            id\n            condition\n            priority\n            note\n            quantityNeeded\n            yearReviewed\n            action\n            images {\n                id\n                url\n            }\n        }\n    }\n": types.UpdateComponentReportDocument,
    "\n    query Components($buildingId: ID!) {\n        res: components(buildingId: $buildingId) {\n            id\n            buildingId\n            name\n            category\n            section\n            actionFrequency\n            nextActionYear\n            yearInstalled\n            unitRate\n            lastActionYear\n        }\n    }\n": types.ComponentsDocument,
    "\n    mutation CreateComponent($component: CreateComponent!) {\n        res: createComponent(input: $component) {\n            id\n            name\n            category\n            section\n            actionFrequency\n            nextActionYear\n            yearInstalled\n            unitRate\n        }\n    }\n": types.CreateComponentDocument,
    "\n    query Component($componentId: ID!) {\n        res: component(componentId: $componentId) {\n            id\n            buildingId\n            name\n            category\n            section\n            actionFrequency\n            nextActionYear\n            yearInstalled\n            unitRate\n            lastActionYear\n        }\n    }\n": types.ComponentDocument,
    "\n    mutation UpdateComponent($component: UpdateComponent!) {\n        res: updateComponent(input: $component) {\n            id\n            name\n            category\n            section\n            actionFrequency\n            nextActionYear\n            lastActionYear\n            yearInstalled\n            unitRate\n        }\n    }\n": types.UpdateComponentDocument,
    "\n    mutation CreateBuilding($input: CreateBuilding!) {\n        createBuilding(input: $input) {\n            id\n            name\n            address\n            year\n            strataId\n            fiscalYear\n            crfAnnualContribution\n            crfTotalBalance\n            crfMinimumBalance\n        }\n    }\n": types.CreateBuildingDocument,
    "\n    mutation UpdateBuilding($input: UpdateBuilding!) {\n        updateBuilding(input: $input) {\n            id\n            name\n            address\n            year\n            strataId\n            fiscalYear\n            crfAnnualContribution\n            crfTotalBalance\n            crfMinimumBalance\n        }\n    }\n": types.UpdateBuildingDocument,
    "\n    mutation generateAssessmentReport($input: GenerateAssessmentReport!) {\n        res: generateAssessmentReport(input: $input) {\n            pdfUrl\n            assessmentReportId\n            excelUrl\n        }\n    }\n": types.GenerateAssessmentReportDocument,
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
export function graphql(source: "\n    mutation UpdateAssessmentReport($input: UpdateAssessmentReport!) {\n        updateAssessmentReport(input: $input) {\n            id\n            draft\n        }\n    }\n"): (typeof documents)["\n    mutation UpdateAssessmentReport($input: UpdateAssessmentReport!) {\n        updateAssessmentReport(input: $input) {\n            id\n            draft\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query BuildingsOnFirstLoad {\n        res: buildings {\n            id\n            userId\n            name\n            address\n            year\n            strataId\n            crfTotalBalance\n            crfMinimumBalance\n            crfAnnualContribution\n            fiscalYear\n        }\n    }\n"): (typeof documents)["\n    query BuildingsOnFirstLoad {\n        res: buildings {\n            id\n            userId\n            name\n            address\n            year\n            strataId\n            crfTotalBalance\n            crfMinimumBalance\n            crfAnnualContribution\n            fiscalYear\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query Buildings {\n        res: buildings {\n            id\n            userId\n            name\n            address\n            year\n            strataId\n            crfTotalBalance\n            crfMinimumBalance\n            crfAnnualContribution\n            fiscalYear\n            assessmentReports {\n                id\n                fiscalYear\n                draft\n            }\n        }\n    }\n"): (typeof documents)["\n    query Buildings {\n        res: buildings {\n            id\n            userId\n            name\n            address\n            year\n            strataId\n            crfTotalBalance\n            crfMinimumBalance\n            crfAnnualContribution\n            fiscalYear\n            assessmentReports {\n                id\n                fiscalYear\n                draft\n            }\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query GetBuilding($id: ID!) {\n        res: building(id: $id) {\n            id\n            name\n            year\n            address\n            strataId\n            crfTotalBalance\n            crfMinimumBalance\n            crfAnnualContribution\n            fiscalYear\n            assessmentReports {\n                id\n                fiscalYear\n                draft\n            }\n        }\n    }\n"): (typeof documents)["\n    query GetBuilding($id: ID!) {\n        res: building(id: $id) {\n            id\n            name\n            year\n            address\n            strataId\n            crfTotalBalance\n            crfMinimumBalance\n            crfAnnualContribution\n            fiscalYear\n            assessmentReports {\n                id\n                fiscalYear\n                draft\n            }\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation CreateComponentReport($input: CreateComponentReport!) {\n        createComponentReport(input: $input) {\n            id\n            componentId\n            assessmentReportId\n            action\n            condition\n            priority\n            note\n            quantityNeeded\n            yearReviewed\n        }\n    }\n"): (typeof documents)["\n    mutation CreateComponentReport($input: CreateComponentReport!) {\n        createComponentReport(input: $input) {\n            id\n            componentId\n            assessmentReportId\n            action\n            condition\n            priority\n            note\n            quantityNeeded\n            yearReviewed\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query GetComponentReport($componentReportId: ID!) {\n        componentReport(componentReportId: $componentReportId) {\n            id\n            componentId\n            assessmentReportId\n            action\n            condition\n            priority\n            note\n            quantityNeeded\n            yearReviewed\n            images {\n                id\n                url\n            }\n        }\n    }\n"): (typeof documents)["\n    query GetComponentReport($componentReportId: ID!) {\n        componentReport(componentReportId: $componentReportId) {\n            id\n            componentId\n            assessmentReportId\n            action\n            condition\n            priority\n            note\n            quantityNeeded\n            yearReviewed\n            images {\n                id\n                url\n            }\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query GetComponentReports($assessmentReportId: ID!) {\n        componentReports(assessmentReportId: $assessmentReportId) {\n            id\n            componentId\n            action\n            condition\n            priority\n            note\n            quantityNeeded\n            yearReviewed\n            assessmentReportId\n        }\n    }\n"): (typeof documents)["\n    query GetComponentReports($assessmentReportId: ID!) {\n        componentReports(assessmentReportId: $assessmentReportId) {\n            id\n            componentId\n            action\n            condition\n            priority\n            note\n            quantityNeeded\n            yearReviewed\n            assessmentReportId\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation UpdateComponentReport($input: UpdateComponentReport!) {\n        res: updateComponentReport(input: $input) {\n            id\n            condition\n            priority\n            note\n            quantityNeeded\n            yearReviewed\n            action\n            images {\n                id\n                url\n            }\n        }\n    }\n"): (typeof documents)["\n    mutation UpdateComponentReport($input: UpdateComponentReport!) {\n        res: updateComponentReport(input: $input) {\n            id\n            condition\n            priority\n            note\n            quantityNeeded\n            yearReviewed\n            action\n            images {\n                id\n                url\n            }\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query Components($buildingId: ID!) {\n        res: components(buildingId: $buildingId) {\n            id\n            buildingId\n            name\n            category\n            section\n            actionFrequency\n            nextActionYear\n            yearInstalled\n            unitRate\n            lastActionYear\n        }\n    }\n"): (typeof documents)["\n    query Components($buildingId: ID!) {\n        res: components(buildingId: $buildingId) {\n            id\n            buildingId\n            name\n            category\n            section\n            actionFrequency\n            nextActionYear\n            yearInstalled\n            unitRate\n            lastActionYear\n        }\n    }\n"];
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
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation CreateBuilding($input: CreateBuilding!) {\n        createBuilding(input: $input) {\n            id\n            name\n            address\n            year\n            strataId\n            fiscalYear\n            crfAnnualContribution\n            crfTotalBalance\n            crfMinimumBalance\n        }\n    }\n"): (typeof documents)["\n    mutation CreateBuilding($input: CreateBuilding!) {\n        createBuilding(input: $input) {\n            id\n            name\n            address\n            year\n            strataId\n            fiscalYear\n            crfAnnualContribution\n            crfTotalBalance\n            crfMinimumBalance\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation UpdateBuilding($input: UpdateBuilding!) {\n        updateBuilding(input: $input) {\n            id\n            name\n            address\n            year\n            strataId\n            fiscalYear\n            crfAnnualContribution\n            crfTotalBalance\n            crfMinimumBalance\n        }\n    }\n"): (typeof documents)["\n    mutation UpdateBuilding($input: UpdateBuilding!) {\n        updateBuilding(input: $input) {\n            id\n            name\n            address\n            year\n            strataId\n            fiscalYear\n            crfAnnualContribution\n            crfTotalBalance\n            crfMinimumBalance\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation generateAssessmentReport($input: GenerateAssessmentReport!) {\n        res: generateAssessmentReport(input: $input) {\n            pdfUrl\n            assessmentReportId\n            excelUrl\n        }\n    }\n"): (typeof documents)["\n    mutation generateAssessmentReport($input: GenerateAssessmentReport!) {\n        res: generateAssessmentReport(input: $input) {\n            pdfUrl\n            assessmentReportId\n            excelUrl\n        }\n    }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;