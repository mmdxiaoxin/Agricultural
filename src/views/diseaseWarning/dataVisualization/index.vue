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
      <div class="top-title">
        <span>数据可视化</span>
        <span>
          <el-button type="primary" :icon="Refresh" @click="refresh"> 刷新 </el-button>
          <el-button type="primary" :icon="FullScreen" @click="maximize"> 全屏 </el-button>
        </span>
      </div>
      <el-tabs v-model="tabActive" class="demo-tabs">
        <el-tab-pane v-for="item in tab" :key="item.name" :label="item.label" :name="item.name"></el-tab-pane>
      </el-tabs>
      <div class="dashboard">
        <WindDirectionChart />

        <UniversalLineChart chart-title="风速" chart-unit="m/s" :chart-theme="chartTheme1" />

        <UniversalLineChart chart-title="空气湿度" chart-unit="RH%" :chart-theme="chartTheme2" />

        <UniversalLineChart chart-title="空气温度" chart-unit="℃" :chart-theme="chartTheme3" />

        <UniversalLineChart chart-title="土壤温度" chart-unit="℃" :chart-theme="chartTheme4" />

        <UniversalLineChart chart-title="土壤湿度" chart-unit="RH%" :chart-theme="chartTheme5" />

        <UniversalLineChart chart-title="土壤导电率" chart-unit="us" :chart-theme="chartTheme6" />

        <UniversalLineChart chart-title="光照强度" chart-unit="Klux" :chart-theme="chartTheme7" />

        <RainfallChart />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { inject, ref, reactive, nextTick } from "vue";
import { ElMessage } from "element-plus";
import { FullScreen, Refresh } from "@element-plus/icons-vue";
import { getUserDevice } from "@/api/modules/user";
import { useGlobalStore } from "@/stores/modules/global";
import { useKeepAliveStore } from "@/stores/modules/keepAlive";
import { useRoute } from "vue-router";
import WindDirectionChart from "./components/WindDirectionChart.vue";
import RainfallChart from "./components/RainfallChart.vue";
import TreeFilter from "@/components/TreeFilter/index.vue";
import UniversalLineChart from "./components/UniversalLineChart.vue";

const tabActive = ref(1);
const route = useRoute();
const treeFilterValue = reactive({ device: "1" });
const globalStore = useGlobalStore();
const keepAliveStore = useKeepAliveStore();
const tab = [
  { label: "近24小时", name: 1 },
  { label: "近七日", name: 2 },
  { label: "近一月", name: 3 },
  { label: "近三月", name: 4 },
  { label: "近半年", name: 5 },
  { label: "近一年", name: 6 }
];

const changeTreeFilter = (val: string) => {
  ElMessage.success(`你选择了 id 为 ${val} 的数据🤔`);
  treeFilterValue.device = val;
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

// 图表主题
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
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
