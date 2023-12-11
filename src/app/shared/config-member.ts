import { MemberModel } from "./members";

export interface ConfigMember {
  id: number;
  nameConfig: string;
  members: MemberModel[];
  noteConfig: string;

}
