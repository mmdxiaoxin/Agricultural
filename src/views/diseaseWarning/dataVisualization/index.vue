<template>
  <div class="dataVisualize-box">
    <!--  树形过滤器    -->
    <TreeFilter
      label="name"
      title="设备列表"
      :request-api="getUserDevice"
      :default-value="treeFilterValue.deviceId"
      @change="changeTreeFilter"
      v-debounce="changeTreeFilter"
    />
    <!--  站点信息概览部分    -->
    <SiteOverview v-if="isSite" :site-name="siteName" />

    <!--   数据可视化部分   -->
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

      <!--  图表渲染部分     -->
      <div class="dashboard" :key="reRenderKey">
        <RainfallChart
          v-if="rainfallData && rainfallData.length > 0 && rainfallData[0].chartData !== undefined"
          :chart-data="rainfallData"
        />

        <WindDirectionChart
          v-if="windDirectionData && windDirectionData.length > 0 && windDirectionData[0] !== undefined"
          :chart-data="windDirectionData"
        />

        <UniversalLineChart
          v-for="chart in filteredChartComponents"
          :key="chart.title"
          :chart-title="chart.title"
          :chart-unit="chart.unit"
          :chart-theme="chart.theme"
          :chart-data="chart.data"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { inject, ref, reactive, nextTick, watch, computed, onBeforeMount } from "vue";
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
import SiteOverview from "@/components/SiteOverview/index.vue";
import {
  chartTheme1,
  chartTheme2,
  chartTheme3,
  chartTheme4,
  chartTheme5,
  chartTheme6,
  chartTheme7
} from "@/views/diseaseWarning/dataVisualization/config/chartThemes";
import { tab } from "@/views/diseaseWarning/dataVisualization/config";
import { getCollect } from "@/api/modules/dataHandle";

interface ChartData {
  chartData: number;
  time: string;
}
interface ChartConfig {
  title: string;
  unit: string;
  theme: any;
  data: ChartData[];
  sign: string;
}

const route = useRoute();
const treeFilterValue = reactive({ deviceId: "1" });
const hour = ref("24");
const globalStore = useGlobalStore();
const keepAliveStore = useKeepAliveStore();
const reRenderKey = ref(0); // 用于强制更新图表界面

//tab时间选择
const tabActive = ref("first");

//降雨量
const rainfallData = ref<ChartData[]>([]);

//风向
const windDirectionData = ref<Array<number>>([]);

//图表组件的配置
const chartComponents = ref<ChartConfig[]>([
  { title: "风速", unit: "m/s", theme: chartTheme1, data: [], sign: "AD1" },
  { title: "光照强度", unit: "Klux", theme: chartTheme2, data: [], sign: "AL1" },
  { title: "大气压强", unit: "hPa", theme: chartTheme3, data: [], sign: "AC1" },
  { title: "空气温度", unit: "℃", theme: chartTheme4, data: [], sign: "AA1" },
  { title: "土壤温度", unit: "℃", theme: chartTheme5, data: [], sign: "AH1" },
  { title: "空气湿度", unit: "RH%", theme: chartTheme6, data: [], sign: "AB1" },
  { title: "土壤湿度", unit: "RH%", theme: chartTheme7, data: [], sign: "AI1" },
  { title: "CO2", unit: "ppm", theme: chartTheme1, data: [], sign: "BD1" },
  { title: "土壤EC", unit: "uS/cm", theme: chartTheme2, data: [], sign: "AJ1" }
]);

// 使用计算属性对 tabActive 进行过滤
const shouldShowChart = (chart: ChartConfig) => {
  return chart.data && chart.data.length > 0 && chart.data[0].chartData !== undefined;
};

// 使用计算属性对 chartComponents 进行过滤
const filteredChartComponents = computed(() => {
  return chartComponents.value.filter(shouldShowChart);
});

//判断站点或者设备
const isSite = ref(false);
const isDevice = ref(true);

//站点名称
const siteName = ref("");

//判断站点或者设备
const judgeList = (data: any) => {
  isSite.value = !!data.isSite;
  isDevice.value = !!data.isDevice;
};

//树形过滤器
const changeTreeFilter = (val: { id: string; treeCurrentData: any }) => {
  ElMessage.success(`站点切换成功!`);
  treeFilterValue.deviceId = val.id;
  judgeList(val.treeCurrentData);
  siteName.value = val.treeCurrentData.name;
  useChartData();
  reRenderKey.value++;
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

// 获取数据
const useChartData = async () => {
  // 清空之前的数据
  rainfallData.value = [];
  windDirectionData.value = [];
  chartComponents.value.forEach((chart: ChartConfig) => {
    chart.data = [];
  });

  const { data } = await getCollect({
    deviceId: treeFilterValue.deviceId,
    hour: hour.value
  });
  // 解析后端发送的数据并分别放置到对应的 ref 变量中
  data.forEach((item: any) => {
    // 降雨量
    if (item.AF1 !== null) {
      rainfallData.value.push({
        chartData: item.AF1,
        time: item.createTime
      });
    }

    // 风向
    if (item.AE1 !== null) {
      windDirectionData.value.push(Number(item.AE1));
    }

    // 图表组件的配置
    chartComponents.value.forEach((chart: ChartConfig) => {
      if (item[chart.sign] !== null) {
        chart.data.push({
          chartData: item[chart.sign],
          time: item.createTime
        });
      }
    });
  });
};

// 初始化数据
onBeforeMount(() => {
  useChartData();
});

watch(
  () => tabActive.value,
  newValue => {
    switch (newValue) {
      case "first":
        // 近24小时
        hour.value = "23";
        break;
      case "second":
        // 近七日
        hour.value = "167";
        break;
      case "third":
        // 近一月
        hour.value = "719";
        break;
      case "fourth":
        // 近三月
        hour.value = "2159";
        break;
      case "fifth":
        // 近半年
        hour.value = "4319";
        break;
      default:
        hour.value = "23";
        break;
    }
    useChartData();
    reRenderKey.value++;
  },
  { immediate: true }
);
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
