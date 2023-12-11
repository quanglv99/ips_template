import { MemberModel } from '../models/member.models';

export const MEMBER_LIST: MemberModel[] = [
  { id: 1, name: 'Thành phần số 1', jobcodes: [
    { id: 1, nameJobcode: 'Jobcode1', descriptionJobcode: 'Description1', action: 'Action1' },
    { id: 2, nameJobcode: 'Jobcode2', descriptionJobcode: 'Description2', action: 'Action2' }
  ], status: 'active' },
  { id: 2, name: 'Thành phần số 2', jobcodes: [
    { id: 3, nameJobcode: 'Jobcode3', descriptionJobcode: 'Description3', action: 'Action3' },
    { id: 4, nameJobcode: 'Jobcode4', descriptionJobcode: 'Description4', action: 'Action4' }
  ], status: 'active' },
  { id: 3, name: 'Thành phần số 3', jobcodes: [
    { id: 5, nameJobcode: 'Jobcode5', descriptionJobcode: 'Description5', action: 'Action5' },
    { id: 6, nameJobcode: 'Jobcode6', descriptionJobcode: 'Description6', action: 'Action6' }
  ], status: 'active' },
];
