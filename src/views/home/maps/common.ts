
/* eslint-disable no-unused-vars */
export enum E_Third_settlement_bill_status {
  complete = 0,
  none = 1,
  incomplete = 2
}
export enum E_Third_settlement_flow_status {
  complete = 0,
  none = 1,
  incomplete = 2
}

export const M_Third_settlement_bill_status = {
  [String(E_Third_settlement_bill_status.complete)]: '有值',
  [String(E_Third_settlement_bill_status.none)]: '渠道不提供',
  [String(E_Third_settlement_bill_status.incomplete)]: '未上传完整'
}

export const M_Third_settlement_flow_status = {
  [String(E_Third_settlement_flow_status.complete)]: '有值',
  [String(E_Third_settlement_flow_status.none)]: '渠道不提供',
  [String(E_Third_settlement_flow_status.incomplete)]: '未上传完整'
}
