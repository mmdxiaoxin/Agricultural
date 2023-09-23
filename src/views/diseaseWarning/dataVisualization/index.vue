<template>
  <div class="dataVisualize-box">
    <TreeFilter
      label="name"
      title="设备列表"
      :request-api="getUserDevice"
      :default-value="treeFilterValue.device"
      @change="changeTreeFilter"
    />
    <div class="top-box card">
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
          v-if="airTemperatureData && airTemperatureData.length > 0"
          chart-title="空气温度"
          chart-unit="℃"
          :chart-theme="chartTheme3"
          :chart-data="airTemperatureData"
        />
        <UniversalLineChart
          v-if="soilTemperatureData && soilTemperatureData.length > 0"
          chart-title="土壤温度"
          chart-unit="℃"
          :chart-theme="chartTheme4"
          :chart-data="soilTemperatureData"
        />
        <UniversalLineChart
          v-if="airHumidityData && airHumidityData.length > 0"
          chart-title="空气湿度"
          chart-unit="RH%"
          :chart-theme="chartTheme2"
          :chart-data="airHumidityData"
        />
        <UniversalLineChart
          v-if="soilHumidityData && soilHumidityData.length > 0"
          chart-title="土壤湿度"
          chart-unit="RH%"
          :chart-theme="chartTheme5"
          :chart-data="soilHumidityData"
        />

        <RainfallChart v-if="rainfallData && rainfallData.length > 0" :chart-data="rainfallData" />

        <UniversalLineChart
          v-if="windSpeedData && windSpeedData.length > 0"
          chart-title="风速"
          chart-unit="m/s"
          :chart-theme="chartTheme1"
          :chart-data="windSpeedData"
        />

        <WindDirectionChart v-if="windDirectionData && windDirectionData.length > 0" :chart-data="windDirectionData" />

        <UniversalLineChart
          v-if="lightIntensityData && lightIntensityData.length > 0"
          chart-title="光照强度"
          chart-unit="KLux"
          :chart-theme="chartTheme7"
          :chart-data="lightIntensityData"
        />
        <UniversalLineChart
          v-if="atmosphericPressureData && atmosphericPressureData.length > 0"
          chart-title="大气压强"
          chart-unit="hPa"
          :chart-theme="chartTheme1"
          :chart-data="atmosphericPressureData"
        />
        <UniversalLineChart
          v-if="CO2Data && CO2Data.length > 0"
          chart-title="CO2浓度"
          chart-unit="ppm"
          :chart-theme="chartTheme2"
          :chart-data="CO2Data"
        />
        <UniversalLineChart
          v-if="soilEcData && soilEcData.length > 0"
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

const tabActive = ref("first");
const route = useRoute();
const treeFilterValue = reactive({ device: "39" });
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

const tab = [
  { label: "近24小时", name: "first" },
  { label: "近七日", name: "second" },
  { label: "近一月", name: "third" },
  { label: "近三月", name: "fourth" },
  { label: "近半年", name: "fifth" }
];
const reRenderTheChartInterface = () => {
  // 返回一个带有不同计数器值的唯一键
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

const changeTreeFilter = debounce((val: string) => {
  ElMessage.success(`你选择了 id 为 ${val} 的数据🤔`);
  treeFilterValue.device = val;
}, 500);

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

// 图表主题渐变生成
const generateChartTheme = (color1: string, color2: string) => {
  return [
    {
      offset: 0,
      color: color1
    },
    {
      offset: 1,
      color: color2
    }
  ];
};

const chartTheme1 = generateChartTheme("rgb(128, 255, 165)", "rgb(1, 191, 236)");
const chartTheme2 = generateChartTheme("rgb(0, 221, 255)", "rgb(77, 119, 255)");
const chartTheme3 = generateChartTheme("rgb(55, 162, 255)", "rgb(116, 21, 219)");
const chartTheme4 = generateChartTheme("rgb(255, 0, 135)", "rgb(135, 0, 157)");
const chartTheme5 = generateChartTheme("rgb(255, 191, 0)", "rgb(224, 62, 76)");
const chartTheme6 = generateChartTheme("rgb(32, 180, 255)", "rgb(3, 228, 201)");
const chartTheme7 = generateChartTheme("rgb(255, 130, 92)", "rgb(153, 102, 255)");

onMounted(() => {
  processingData();
});

watch(
  () => treeFilterValue.device,
  () => {
    processingData();
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
