import { JobcodeModel } from "./jobcode.models";

export interface MemberModel {
  id: number;
  name: string;
  jobcodes: JobcodeModel[];
  status: string;
}
