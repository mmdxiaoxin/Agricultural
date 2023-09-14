import { DataHandle } from "@/api/interface/index";
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
  return http.get<DataHandle.ResRealDeviceData[]>(PORT1 + `/device/api`, params, { noLoading: true });
};
