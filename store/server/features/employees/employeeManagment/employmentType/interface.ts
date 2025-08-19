// import { Meta } from '../../../okrPlanningAndReporting/interface';

// Fallback interface for Meta
export interface Meta {
  totalItems: number;
  itemCount: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
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
