import { Employee } from "./employees";

export interface MyWorkModel {
  id: number;
  branchname: string;
  owner: Employee;
  member: string;
  startDate: string;
  endDate: string;
  employee: Employee;
  note: string;
  createdDate: string;
  createdUser: string;
  updatedDate: string;
  updatedUser: string;
  approver: string;
  status: { id: number; name: string };
}
