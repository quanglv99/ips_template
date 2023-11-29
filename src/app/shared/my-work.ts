import { Employee } from "./employees";
import { MemberModel } from "./members";

export interface MyWorkModel {
  id: number;
  branchname: string;
  owner: Employee;
  member: MemberModel;
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
