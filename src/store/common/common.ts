import { makeAutoObservable } from 'mobx';
import { I_MenuItem } from './types';
export class CommonStore {
  constructor () {
    makeAutoObservable(this)
  }

  routerLoading: boolean = false;

  setRouterLoading (routerLoading: boolean) {
    this.routerLoading = routerLoading;
  }

  collapsed: boolean = false;

  setCollapsed (collapsed: boolean) {
    this.collapsed = collapsed;
  }

  menuList: I_MenuItem[] = [
    {
      icon: '',
      menu_id: 1,
      name: '结算核对',
      pid: 0,
      url: '/'
    },
    {
      icon: '',
      menu_id: 2,
      name: '统一词库',
      pid: 0,
      url: '/word'
    }
  ];

  setMenuList (menuList: I_MenuItem[]) {
    this.menuList = menuList;
  }
}
