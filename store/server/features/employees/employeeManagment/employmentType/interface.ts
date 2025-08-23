// import { Meta } from '../../../okrPlanningAndReporting/interface'; // Commented out due to missing module

// Placeholder type since module is missing
export interface Meta {
  // Placeholder interface - no actual properties
}

// interface jobInformation {
//   id?: string;
//   name: string;
//   description: string;
// }
export interface EmploymentTypeInfo {
  id?: string;
  name: string;
  description: string;
  // jobInformations?: jobInformation;
}

export interface EmploymentTypeList {
  items: EmploymentTypeInfo[];
  meta: Meta;
}
