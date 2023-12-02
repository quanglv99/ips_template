
import { BranchModel } from "./branch"
import { Employee } from "./employees"
export interface UserDetailModel {
    id: number,
    employee: Employee,
    branch: BranchModel,
    frontCard: string,
    backCard: string,
    portrait: string,
    other: string,
    biometricStatus: string,
    passcode: number,
    bioStatus: string,
    createdDate: Date,
    updatedDate: Date,
    supporter:string,
    fingerPrint: string,
    faceId: string,
}