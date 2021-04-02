export interface ImenuInterface {
  name: string;
  module: string;
  routes: Array<{
    name: string;
    module: string;
    select: string;
    path: string;
  }>
}
export interface I_ChannelShort {
  id: number;
  name: string;
}

export interface I_ChannelType {
  id: number;
  name: string;
}