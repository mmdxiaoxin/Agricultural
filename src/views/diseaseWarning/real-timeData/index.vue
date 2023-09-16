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
        <span>
          <!-- 数据最后更新时间 -->
          数据最后更新时间：{{ currentTime }}
        </span>
        <span>
          <el-button type="primary" :icon="Refresh" @click="refresh"> 刷新 </el-button>
          <el-button type="primary" :icon="FullScreen" @click="maximize"> 全屏 </el-button>
        </span>
      </div>
      <!-- 分割线 -->
      <div class="divider"></div>
      <!-- 主要数据展示区域 -->
      <div class="siteBoard">
        <div class="temperature card">
          <TemperaturePanel :air-temperature-data="airTemperatureData" :soil-temperature-data="soilTemperatureData" />
        </div>
        <div class="humidity card">
          <HumidityPanel :air-humidity-data="airHumidityData" :soil-humidity-data="soilHumidityData" />
        </div>
        <div class="weather card"><WeatherPanel /></div>
        <div class="conductivity card"><ConductivityPanel /></div>
        <div class="rain-fall card"><Rainfall :chart-data="rainfallData" /></div>
      </div>
      <div class="dashboard">
        <!-- 使用 v-for 遍历 deviceDataList 中的数据 -->
        <div v-for="(item, index) in deviceDataList" :key="index" class="data-card">
          <DataCard :item="item" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup name="realTimeDataChart" lang="ts">
import TreeFilter from "@/components/TreeFilter/index.vue";
import { inject, reactive, nextTick, ref, onMounted } from "vue";
import { ElMessage } from "element-plus";
import { useRoute } from "vue-router";
import { getUserDevice } from "@/api/modules/user";
import { useGlobalStore } from "@/stores/modules/global";
import { useKeepAliveStore } from "@/stores/modules/keepAlive";
import { FullScreen, Refresh } from "@element-plus/icons-vue";
import { getDevice } from "@/api/modules/dataHandle";
import DataCard from "./component/DataCard.vue";
import { DataHandle } from "@/api/interface";
import TemperaturePanel from "@/views/diseaseWarning/real-timeData/component/TemperaturePanel.vue";
import HumidityPanel from "@/views/diseaseWarning/real-timeData/component/HumidityPanel.vue";
import WeatherPanel from "@/views/diseaseWarning/real-timeData/component/WeatherPanel.vue";
import ConductivityPanel from "@/views/diseaseWarning/real-timeData/component/ConductivityPanel.vue";
import Rainfall from "@/views/diseaseWarning/real-timeData/component/Rainfall.vue";

const route = useRoute();
const globalStore = useGlobalStore();
const keepAliveStore = useKeepAliveStore();
const treeFilterValue = reactive({ device: "39" });
const deviceDataList = ref<DataHandle.ResRealDeviceData[]>([]); // 后端返回的数据
const currentTime = ref(); // 当前时间
//温度面板需要数据
const airTemperatureData = ref(NaN);
const soilTemperatureData = ref(NaN);
//湿度面板需要数据
const airHumidityData = ref(NaN);
const soilHumidityData = ref(NaN);
//降雨量面板需要数据
const rainfallData = ref(NaN);

const useDeviceData = async (deviceId: string) => {
  try {
    const params = { id: deviceId, method: "deviceDataHandler" };
    const { data } = await getDevice(params);
    deviceDataList.value = data.deviceDataList;
    currentTime.value = deviceDataList.value[0].createTime;
    //初始化温度面板数据
    const airTemperatureItem = deviceDataList.value.filter((item: DataHandle.ResRealDeviceData) => item.sign === "AA1");
    airTemperatureData.value = airTemperatureItem[0].value;
    const soilTemperatureItem = deviceDataList.value.filter((item: DataHandle.ResRealDeviceData) => item.sign === "AH1");
    soilTemperatureData.value = soilTemperatureItem[0].value;
    //初始化湿度面板数据
    const airHumidityItem = deviceDataList.value.filter((item: DataHandle.ResRealDeviceData) => item.sign === "AB1");
    airHumidityData.value = airHumidityItem[0].value;
    const soilHumidityItem = deviceDataList.value.filter((item: DataHandle.ResRealDeviceData) => item.sign === "AI1");
    soilHumidityData.value = soilHumidityItem[0].value;
    const rainfallItem = deviceDataList.value.filter((item: DataHandle.ResRealDeviceData) => item.sign === "AF1");
    //初始化降雨量面板数据
    rainfallData.value = rainfallItem[0].value;
  } catch (error) {
    ElMessage.error("获取设备数据失败!");
  }
};

const changeTreeFilter = (val: string) => {
  ElMessage.success(`你选择了 id 为 ${val} 的数据🤔`);
  treeFilterValue.device = val;
  useDeviceData(val);
};

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
  console.log(rainfallData.value);
});
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
