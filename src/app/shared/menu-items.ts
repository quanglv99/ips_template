import { Injectable } from '@angular/core';

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
}

const MENUITEMS = [
  { state: 'dashboard', name: 'Dashboard', type: 'link', icon: 'av_timer' },
  {
    state: 'my-work',
    type: 'link',
    name: 'Phân công của tôi',
    icon: 'crop_7_5',
  },
  {
    state: 'work-for-me',
    name: 'Phân công cho tôi',
    type: 'link',
    icon: 'view_comfy',
  },
  {
    state: 'my-assign',
    name: 'Uỷ quyền của tôi',
    type: 'link',
    icon: 'view_list',
  },
  {
    state: 'accept-assign',
    name: 'Uỷ quyền cho tôi',
    type: 'link',
    icon: 'view_headline',
  },
  {
    state: 'approve-assign',
    name: 'Uỷ quyền phê duyệt',
    type: 'link',
    icon: 'tab',
  },
  {
    state: 'biometric-support',
    name: 'Hỗ trợ đăng ký STH',
    type: 'link',
    icon: 'voicemail',
  },
  {
    state: 'employees',
    name: 'Quản lý nhân sự',
    type: 'link',
    icon: 'account_circle',
  },
  
];

@Injectable()
export class MenuItems {
  getMenuitem(): Menu[] {
    return MENUITEMS;
  }
}
