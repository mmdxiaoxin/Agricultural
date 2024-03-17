import { PORT1 } from "@/api/config/servicePort";
import http from "@/api";

/**
 * @name 模型预测模块
 */

export const selectMethod = (params: { method: number }) => {
  return http.post(PORT1 + `/predict/predict-method`, params);
};

export const selectModel = (params: { model: number }) => {
  return http.post(PORT1 + `/predict/models`, params);
};
