import { ReactText } from 'react';
import { makeAutoObservable } from 'mobx';
import { I_DataSource, I_SortedInfo } from './types';
import { getChannelIndex } from '@/apis/check';
import { I_getChannelIndex } from '@/apis/check/types';
import { I_ControlData } from '../control/types'
import moment from 'moment';
export class TableStore {
  constructor () {
    makeAutoObservable(this)
  }

  loading: boolean = false;

  setLoading (loading: boolean) {
    this.loading = loading;
  }

  sortedInfo: I_SortedInfo = {
    columnKey: '',
    order: false
  }

  setSortedInfo (sortedInfo: I_SortedInfo) {
    this.sortedInfo = sortedInfo;
  }

  expandedRowKeys: ReactText[] = [];

  setExpandedRowKeys (expandedRowKeys: ReactText[]) {
    this.expandedRowKeys = expandedRowKeys;
  }

  pageSize: number = 15;

  total: number = 0;

  setTotal (total: number) {
    this.total = total;
  }

  page: number = 1;
   
  changePage (page: number) {
    this.setExpandedRowKeys([]);
    this.page = page;
  }

  dataSource: I_DataSource[] = [];

  setDataSource (dataSource: I_DataSource[]) {
    this.dataSource = dataSource || [];
  }

  handleDataSource (param: I_ControlData) {
    this.setLoading(true);
    const params: I_getChannelIndex = {
      ...param,
      month: param.month ? moment(param.month).format('YYYYMM') : param.month,
      page: this.page
    }
    if (this.sortedInfo.order) {
      params.order_by = `${this.sortedInfo.columnKey} desc`
    }
    getChannelIndex(params).then((data: any) => {
      this.setTotal(data.page.rcount || 0);
      this.setDataSource(data.list || []);
      this.setLoading(false);
    })
  }
 
}
