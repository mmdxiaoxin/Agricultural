<template>
  <div class="dataVisualize-box">
    <TreeFilter
      label="name"
      title="设备列表"
      :request-api="getUserDevice"
      :default-value="treeFilterValue.device"
      @change="changeTreeFilter"
      v-debounce="changeTreeFilter"
    />
    <SiteOverview v-if="isSite" :site-name="siteName" />
    <div class="top-box card" v-if="isDevice">
      <div class="top-bar">
        <span>数据可视化</span>
        <span>
          <el-button type="primary" :icon="Refresh" @click="refresh"> 刷新 </el-button>
          <el-button type="primary" :icon="FullScreen" @click="maximize"> 全屏 </el-button>
        </span>
      </div>
      <el-tabs v-model="tabActive">
        <el-tab-pane v-for="item in tab" :key="item.name" :label="item.label" :name="item.name"></el-tab-pane>
      </el-tabs>
      <div class="dashboard" :key="reRenderKey">
        <UniversalLineChart
          v-if="airTemperatureData && airTemperatureData.length > 0 && airTemperatureData[0].chartData !== undefined"
          chart-title="空气温度"
          chart-unit="℃"
          :chart-theme="chartTheme3"
          :chart-data="airTemperatureData"
        />
        <UniversalLineChart
          v-if="soilTemperatureData && soilTemperatureData.length > 0 && soilTemperatureData[0].chartData !== undefined"
          chart-title="土壤温度"
          chart-unit="℃"
          :chart-theme="chartTheme4"
          :chart-data="soilTemperatureData"
        />
        <UniversalLineChart
          v-if="airHumidityData && airHumidityData.length > 0 && airHumidityData[0].chartData !== undefined"
          chart-title="空气湿度"
          chart-unit="RH%"
          :chart-theme="chartTheme2"
          :chart-data="airHumidityData"
        />
        <UniversalLineChart
          v-if="soilHumidityData && soilHumidityData.length > 0 && soilHumidityData[0].chartData !== undefined"
          chart-title="土壤湿度"
          chart-unit="RH%"
          :chart-theme="chartTheme5"
          :chart-data="soilHumidityData"
        />

        <RainfallChart
          v-if="rainfallData && rainfallData.length > 0 && rainfallData[0].chartData !== undefined"
          :chart-data="rainfallData"
        />

        <UniversalLineChart
          v-if="windSpeedData && windSpeedData.length > 0 && windSpeedData[0].chartData !== undefined"
          chart-title="风速"
          chart-unit="m/s"
          :chart-theme="chartTheme1"
          :chart-data="windSpeedData"
        />

        <WindDirectionChart
          v-if="windDirectionData && windDirectionData.length > 0 && windDirectionData[0] !== undefined"
          :chart-data="windDirectionData"
        />

        <UniversalLineChart
          v-if="lightIntensityData && lightIntensityData.length > 0 && lightIntensityData[0].chartData !== undefined"
          chart-title="光照强度"
          chart-unit="KLux"
          :chart-theme="chartTheme7"
          :chart-data="lightIntensityData"
        />
        <UniversalLineChart
          v-if="
            atmosphericPressureData && atmosphericPressureData.length > 0 && atmosphericPressureData[0].chartData !== undefined
          "
          chart-title="大气压强"
          chart-unit="hPa"
          :chart-theme="chartTheme1"
          :chart-data="atmosphericPressureData"
        />
        <UniversalLineChart
          v-if="CO2Data && CO2Data.length > 0 && CO2Data[0].chartData !== undefined"
          chart-title="CO2浓度"
          chart-unit="ppm"
          :chart-theme="chartTheme2"
          :chart-data="CO2Data"
        />
        <UniversalLineChart
          v-if="soilEcData && soilEcData.length > 0 && soilEcData[0].chartData !== undefined"
          chart-title="土壤EC"
          chart-unit="us"
          :chart-theme="chartTheme6"
          :chart-data="soilEcData"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { inject, ref, reactive, nextTick, onMounted, watch } from "vue";
import { ElMessage } from "element-plus";
import { FullScreen, Refresh } from "@element-plus/icons-vue";
import { getUserDevice } from "@/api/modules/user";
import { useGlobalStore } from "@/stores/modules/global";
import { useKeepAliveStore } from "@/stores/modules/keepAlive";
import { useRoute } from "vue-router";
import WindDirectionChart from "./components/WindDirectionChart.vue";
import RainfallChart from "./components/RainfallChart.vue";
import TreeFilter from "@/components/TreeFilter/index.vue";
import UniversalLineChart from "@/components/UniversalLineChart/index.vue";
import { getCollect } from "@/api/modules/dataHandle";
import { DataHandle } from "@/api/interface";
import SiteOverview from "@/components/SiteOverview/index.vue";
import {
  chartTheme1,
  chartTheme2,
  chartTheme3,
  chartTheme4,
  chartTheme5,
  chartTheme6,
  chartTheme7
} from "@/views/diseaseWarning/dataVisualization/chartThemes";

const tabActive = ref("first");
const route = useRoute();
const treeFilterValue = reactive({ device: "1" });
const hour = ref("24");
const globalStore = useGlobalStore();
const keepAliveStore = useKeepAliveStore();
const reRenderKey = ref(0); // 用于更新图表界面

const airTemperatureData = ref();
const soilTemperatureData = ref();
const airHumidityData = ref();
const soilHumidityData = ref();
const rainfallData = ref();
const windSpeedData = ref();
const windDirectionData = ref<Array<number>>();
const lightIntensityData = ref();
const atmosphericPressureData = ref();
const CO2Data = ref();
const soilEcData = ref();
const chartDataList = ref();
//判断站点或者设备
const isSite = ref(false);
const isDevice = ref(true);
//站点名称
const siteName = ref("");

const judgeList = (data: any) => {
  isSite.value = !!data.isSite;
  isDevice.value = !!data.isDevice;
};

const tab = [
  { label: "近24小时", name: "first" },
  { label: "近七日", name: "second" },
  { label: "近一月", name: "third" },
  { label: "近三月", name: "fourth" },
  { label: "近半年", name: "fifth" }
];
const reRenderTheChartInterface = () => {
  return reRenderKey.value++;
};

const getChartDataList = async (deviceId: string, hour: string) => {
  const params = { deviceId, hour };
  const { data } = await getCollect(params);
  return data;
};

const processingData = async () => {
  try {
    chartDataList.value = await getChartDataList(treeFilterValue.device, hour.value);
    if (!chartDataList.value) {
      airTemperatureData.value = [];
      soilTemperatureData.value = [];
      airHumidityData.value = [];
      soilHumidityData.value = [];
      rainfallData.value = [];
      windSpeedData.value = [];
      windDirectionData.value = [];
      lightIntensityData.value = [];
      atmosphericPressureData.value = [];
      CO2Data.value = [];
      soilEcData.value = [];
      reRenderTheChartInterface();
      return;
    }
    airTemperatureData.value = chartDataList.value.map((item: DataHandle.ResCollectData) => ({
      chartData: item.AA1,
      time: item.createTime
    }));
    soilTemperatureData.value = chartDataList.value.map((item: DataHandle.ResCollectData) => ({
      chartData: item.AH1,
      time: item.createTime
    }));
    airHumidityData.value = chartDataList.value.map((item: DataHandle.ResCollectData) => ({
      chartData: item.AB1,
      time: item.createTime
    }));
    soilHumidityData.value = chartDataList.value.map((item: DataHandle.ResCollectData) => ({
      chartData: item.AI1,
      time: item.createTime
    }));
    rainfallData.value = chartDataList.value.map((item: DataHandle.ResCollectData) => ({
      chartData: item.AF1,
      time: item.createTime
    }));
    windSpeedData.value = chartDataList.value.map((item: DataHandle.ResCollectData) => ({
      chartData: item.AD1,
      time: item.createTime
    }));
    windDirectionData.value = chartDataList.value.map((item: DataHandle.ResCollectData) => item.AE1);
    lightIntensityData.value = chartDataList.value.map((item: DataHandle.ResCollectData) => ({
      chartData: item.AL1,
      time: item.createTime
    }));
    atmosphericPressureData.value = chartDataList.value.map((item: DataHandle.ResCollectData) => ({
      chartData: item.AC1,
      time: item.createTime
    }));
    CO2Data.value = chartDataList.value.map((item: DataHandle.ResCollectData) => ({
      chartData: item.BD1,
      time: item.createTime
    }));
    soilEcData.value = chartDataList.value.map((item: DataHandle.ResCollectData) => ({
      chartData: item.AJ1,
      time: item.createTime
    }));
    reRenderTheChartInterface();
  } catch (error) {
    ElMessage.error("获取设备数据失败!");
  }
};

const changeTreeFilter = (val: { id: string; treeCurrentData: any }) => {
  ElMessage.success(`站点切换成功!`);
  treeFilterValue.device = val.id;
  judgeList(val.treeCurrentData);
  siteName.value = val.treeCurrentData.name;
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
  processingData();
});

watch(
  () => treeFilterValue.device,
  () => {
    if (isDevice.value) processingData();
  }
);

watch(
  () => tabActive.value,
  newValue => {
    switch (newValue) {
      case "first":
        // 近24小时
        hour.value = "24";
        break;
      case "second":
        // 近七日
        hour.value = "168";
        break;
      case "third":
        // 近一月
        hour.value = "720";
        break;
      case "fourth":
        // 近三月
        hour.value = "2160";
        break;
      case "fifth":
        // 近半年
        hour.value = "4320";
        break;
      default:
        hour.value = "24";
        break;
    }
    processingData();
  },
  { immediate: true }
);
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
