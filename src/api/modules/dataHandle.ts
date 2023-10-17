import { DataHandle } from "@/api/interface";
import { PORT1 } from "@/api/config/servicePort";
import http from "@/api";

/**
 * @name 数据相关模块
 */

// 获取全部地区列表
export const getRegionsList = () => {
  return http.get<DataHandle.ResAddress[]>(PORT1 + `/address/select`);
};

// 获取设备数据
export const getDevice = (params: DataHandle.ReqDeviceMethod) => {
  return http.get<DataHandle.ResRealDeviceDataList>(PORT1 + `/device/api`, params, { noLoading: true });
};

//获取收集数据
export const getCollect = (params: DataHandle.ReqCollectMethod) => {
  return http.get<DataHandle.ResCollectData[]>(PORT1 + `/data/show`, params, { noLoading: true });
};

//获取仪表盘数据
export const getDashboard = () => {
  return http.get<DataHandle.ResDashboardData>(PORT1 + `/device/count`);
};
