import { Employee } from "./employees";

export interface AssignModel {
    id: number;
    branchname: string;
    member: string;
    startDate: string;
    endDate: string;
    owner: Employee;
    employee: Employee;
    note:string;
    approver: string;
    file: string;
    createdDate: string;
    createdUser: string;
    updatedDate: string;
    updatedUser: string;
    status: {id: number, name: string };
  }