import { MemberModel } from "./members";

export interface MemberConfigModel {
  id: number;
  nameConfig: string;
  members: MemberModel[];
  noteConfig: string;
}
