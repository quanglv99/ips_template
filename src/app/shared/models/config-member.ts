import { MemberModel } from "./member.models";

export interface ConfigMember {
  id: number;
  nameConfig: string;
  members: MemberModel[];
  noteConfig: string;

}
