import { DataHandle } from "@/api/interface/index";
import { PORT1 } from "@/api/config/servicePort";
import http from "@/api";

/**
 * @name 数据相关模块
 */

// 获取全部地区列表
export const getRegionsList = () => {
  return http.get<DataHandle.Address[]>(PORT1 + `/address/select`);
};

// 获取设备数据属性
export const getDeviceDataAttributes = () => {
  return http.get<DataHandle.Address[]>(PORT1 + `/address/select`);
};
