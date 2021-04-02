export interface I_getChannelIndex {
  month?: string;
  enterprise?: string;
  channel_type?: number;
  channel_short?: number;
  order_by?: string;
  page: number;
}
export interface I_getChannelApp {
  page: number;
  task_id: string;
  order_by?: string;
}
