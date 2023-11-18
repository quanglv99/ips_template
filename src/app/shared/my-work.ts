export interface MyWorkModel {
  id: number;
  branchname: string;
  owner: string;
  member: string;
  startDate: string;
  endDate: string;
  employee: string;
  note: string;
  createdDate: string;
  createdUser: string;
  updatedDate: string;
  updatedUser: string;
  approver: string;
  status: { id: number; name: string };
}
