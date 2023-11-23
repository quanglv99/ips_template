import { JobcodeModel } from "./jobcode";

export interface MemberModel {
  id: number;
  name: string;
  jobcodes: JobcodeModel[];
  status: string;
}
