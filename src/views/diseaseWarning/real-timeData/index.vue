<template>
  <div class="real-data-box">
    <TreeFilter
      label="name"
      title="设备列表"
      :request-api="getUserDevice"
      :default-value="treeFilterValue.device"
      @change="changeTreeFilter"
    />
    <div class="top-box card">
      <div class="top-bar">
        <!-- 主标题 -->
        <span class="top-title">实时数据</span>
        <span class="top-time">
          <!-- 数据最后更新时间 -->
          数据最后更新时间：{{ currentTime }}
        </span>
        <span>
          <el-button type="primary" :icon="Refresh" @click="refresh"> 刷新 </el-button>
          <el-button type="primary" :icon="FullScreen" @click="maximize"> 全屏 </el-button>
        </span>
      </div>
      <!-- 分割线 -->
      <el-divider />
      <!-- 主要数据展示区域 -->
      <div class="siteBoard" :key="reRenderKey">
        <div class="temperature card">
          <TemperaturePanel
            :air-temperature-data="airTemperatureData"
            :soil-temperature-data="soilTemperatureData"
            :device-id="treeFilterValue.device"
          />
        </div>
        <div class="humidity card">
          <HumidityPanel
            :air-humidity-data="airHumidityData"
            :soil-humidity-data="soilHumidityData"
            :device-id="treeFilterValue.device"
          />
        </div>
        <div class="weather card">
          <WeatherPanel
            :atmospheric-pressure-data="atmosphericPressureData"
            :light-intensity-data="lightIntensityData"
            :wind-direction-data="windDirectionData"
            :wind-speed-data="windSpeedData"
            :c-o2-data="CO2Data"
          />
        </div>
        <div class="conductivity card"><SoilEcDataPanel :soil-ec-data="soilEcData" :device-id="treeFilterValue.device" /></div>
        <div class="rain-fall card"><Rainfall :rainfall-data="rainfallData" /></div>
      </div>
      <!-- 分割线 -->
      <el-divider @click="toggleContent">
        <el-icon v-if="showContent"><CaretTop /></el-icon>
        <el-icon v-else><CaretBottom /></el-icon>
        <span style="font-weight: bold; color: var(--el-text-color-regular)">数据一览</span>
      </el-divider>
      <!-- 根据状态来显示/隐藏内容 -->
      <div v-if="showContent" class="card">
        <div class="top-bar">
          <span class="top-title">数据一览</span>
        </div>
        <el-divider />
        <div class="dashboard">
          <!-- 遍历 deviceDataList 中的数据 -->
          <div v-for="(item, index) in deviceDataList" :key="index" class="data-card">
            <DataCard :item="item" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup name="realTimeDataChart" lang="ts">
import TreeFilter from "@/components/TreeFilter/index.vue";
import { inject, reactive, nextTick, ref, onMounted, watch } from "vue";
import { ElMessage } from "element-plus";
import { useRoute } from "vue-router";
import { getUserDevice } from "@/api/modules/user";
import { useGlobalStore } from "@/stores/modules/global";
import { useKeepAliveStore } from "@/stores/modules/keepAlive";
import { FullScreen, Refresh } from "@element-plus/icons-vue";
import { getDevice } from "@/api/modules/dataHandle";
import DataCard from "./component/DataCard.vue";
import { DataHandle } from "@/api/interface";
import { CaretBottom, CaretTop } from "@element-plus/icons-vue";
import TemperaturePanel from "@/views/diseaseWarning/real-timeData/component/TemperaturePanel.vue";
import HumidityPanel from "@/views/diseaseWarning/real-timeData/component/HumidityPanel.vue";
import WeatherPanel from "@/views/diseaseWarning/real-timeData/component/WeatherPanel.vue";
import SoilEcDataPanel from "@/views/diseaseWarning/real-timeData/component/SoilEcDataPanel.vue";
import Rainfall from "@/views/diseaseWarning/real-timeData/component/Rainfall.vue";

const route = useRoute();
const globalStore = useGlobalStore();
const keepAliveStore = useKeepAliveStore();
const treeFilterValue = reactive({ device: "39" });
const deviceDataList = ref<DataHandle.ResRealDeviceData[]>([]); // 后端返回的数据
const reRenderKey = ref(0); // 用于更新图表界面
const currentTime = ref(); // 当前时间
//温度面板需要数据
const airTemperatureData = ref();
const soilTemperatureData = ref();
//湿度面板需要数据
const airHumidityData = ref();
const soilHumidityData = ref();
//降雨量面板需要数据
const rainfallData = ref();
//气象数据面板需要数据
const windSpeedData = ref();
const windDirectionData = ref();
const lightIntensityData = ref();
const atmosphericPressureData = ref();
const CO2Data = ref();
//土壤EC面板需要数据
const soilEcData = ref();
//底部展开
const showContent = ref(false);

const toggleContent = () => {
  showContent.value = !showContent.value;
};

const reRenderTheChartInterface = () => {
  return reRenderKey.value++;
};

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
          // Handle other sign values if needed
          break;
      }
    }

    airTemperatureData.value = parseFloat(String(initData.airTemperature));
    soilTemperatureData.value = parseFloat(String(initData.soilTemperature));
    airHumidityData.value = parseFloat(String(initData.airHumidity));
    soilHumidityData.value = parseFloat(String(initData.soilHumidity));
    rainfallData.value = parseFloat(String(initData.rainfall));
    windSpeedData.value = parseFloat(String(initData.windSpeed));
    windDirectionData.value = parseFloat(String(initData.windDirection));
    lightIntensityData.value = parseFloat(String(initData.lightIntensity));
    atmosphericPressureData.value = parseFloat(String(initData.atmosphericPressure));
    CO2Data.value = parseFloat(String(initData.CO2Concentration));
    soilEcData.value = parseFloat(String(initData.soilEc));
    reRenderTheChartInterface();
  } catch (error) {
    ElMessage.error("获取设备数据失败!");
  }
};

// 防抖函数
const debounce = <T extends (...args: any[]) => void>(func: T, delay: number) => {
  let timer: NodeJS.Timeout | null = null;
  return (...args: Parameters<T>) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

// 根据窗口宽度变换文本字体大小
const titleFontSize = ref("var(--title-font-size)");
const valueFontSize = ref("var(--value-font-size)");
const updateFontSizes = () => {
  if (window.innerWidth < 768) {
    titleFontSize.value = "12px";
    valueFontSize.value = "16px";
  } else {
    titleFontSize.value = "14px";
    valueFontSize.value = "18px";
  }
};

const changeTreeFilter = debounce((val: string) => {
  ElMessage.success(`站点切换成功!`);
  treeFilterValue.device = val;
}, 50);

// 刷新当前页
const refreshCurrentPage: Function = inject("refresh") as Function;
const refresh = () => {
  setTimeout(() => {
    keepAliveStore.removeKeepAliveName(route.name as string);
    refreshCurrentPage(false);
    nextTick(() => {
      keepAliveStore.addKeepAliveName(route.name as string);
      refreshCurrentPage(true);
    });
  }, 0);
};

// 当前页全屏
const maximize = () => {
  globalStore.setGlobalState("maximize", true);
};

onMounted(() => {
  useDeviceData(treeFilterValue.device);
  updateFontSizes();
  window.addEventListener("resize", updateFontSizes);
});

watch(
  () => treeFilterValue.device,
  () => {
    useDeviceData(treeFilterValue.device);
  }
);
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
