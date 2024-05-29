import { getDevice } from "@/api/modules/dataHandle";
import { ElMessage } from "element-plus";
import { ref } from "vue";
import { DataHandle } from "@/api/interface";

const deviceDataList = ref<DataHandle.ResRealDeviceData[]>([]); // 后端返回的数据
const currentTime = ref(); // 当前时间
//温度面板需要数据
const tempAir = ref();
const tempSoil = ref();
//湿度面板需要数据
const humidityAir = ref();
const humiditySoil = ref();
//降雨量面板需要数据
const rainfall = ref();
//气象数据面板需要数据
const windSpeed = ref();
const windDir = ref();
const lightInt = ref();
const atmPressure = ref();
const CO2Data = ref();
//土壤EC面板需要数据
const soilEc = ref();

const useDeviceData = async (deviceId: string) => {
  try {
    const params = { id: deviceId, method: "deviceDataHandler" };
    const { data } = await getDevice(params);
    deviceDataList.value = data.deviceDataList;
    currentTime.value = deviceDataList.value[0].createTime;
    const initData = {
      airTemperature: NaN,
      soilTemperature: NaN,
      airHumidity: NaN,
      soilHumidity: NaN,
      rainfall: NaN,
      windSpeed: NaN,
      windDirection: NaN,
      lightIntensity: NaN,
      atmosphericPressure: NaN,
      CO2Concentration: NaN,
      soilEc: NaN
    };

    for (const item of deviceDataList.value) {
      switch (item.sign) {
        case "AA1":
          initData.airTemperature = item.value;
          break;
        case "AH1":
          initData.soilTemperature = item.value;
          break;
        case "AB1":
          initData.airHumidity = item.value;
          break;
        case "AI1":
          initData.soilHumidity = item.value;
          break;
        case "AF1":
          initData.rainfall = item.value;
          break;
        case "AD1":
          initData.windSpeed = item.value;
          break;
        case "AE1":
          initData.windDirection = item.value;
          break;
        case "AL1":
          initData.lightIntensity = item.value;
          break;
        case "AC1":
          initData.atmosphericPressure = item.value;
          break;
        case "BD1":
          initData.CO2Concentration = item.value;
          break;
        case "AJ1":
          initData.soilEc = item.value;
          break;
        default:
          break;
      }
    }

    tempAir.value = parseFloat(String(initData.airTemperature));
    tempSoil.value = parseFloat(String(initData.soilTemperature));
    humidityAir.value = parseFloat(String(initData.airHumidity));
    humiditySoil.value = parseFloat(String(initData.soilHumidity));
    rainfall.value = parseFloat(String(initData.rainfall));
    windSpeed.value = parseFloat(String(initData.windSpeed));
    windDir.value = parseFloat(String(initData.windDirection));
    lightInt.value = parseFloat(String(initData.lightIntensity));
    atmPressure.value = parseFloat(String(initData.atmosphericPressure));
    CO2Data.value = parseFloat(String(initData.CO2Concentration));
    soilEc.value = parseFloat(String(initData.soilEc));
  } catch (error) {
    ElMessage.error("获取设备数据失败!");
  }
};

export {
  tempAir,
  tempSoil,
  humidityAir,
  humiditySoil,
  rainfall,
  windSpeed,
  windDir,
  lightInt,
  atmPressure,
  CO2Data,
  soilEc,
  currentTime,
  deviceDataList,
  useDeviceData
};
