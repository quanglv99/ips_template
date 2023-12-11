import { JobcodeModel } from "./jobcode";

export interface MemberModel {
  id: number;
  name: string;
  jobcodes: JobcodeModel[];
  note: string;
  status: string;
}
