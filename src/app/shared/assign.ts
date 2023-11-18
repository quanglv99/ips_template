export interface AssignModel {
    id: number;
    branchname: string;
    member: string;
    startDate: string;
    endDate: string;
    owner: string;
    employee: string;
    note:string;
    approver: string;
    file: string;
    createdDate: string;
    createdUser: string;
    updatedDate: string;
    updatedUser: string;
    status: {id: number, name: string };
  }