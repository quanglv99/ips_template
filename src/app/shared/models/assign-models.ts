import { Employee } from "./employee.models";
import { MemberModel } from "./member.models";

export interface AssignModel {
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
  approver: string;
  status: { id: number; name: string };
}
