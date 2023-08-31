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

        <WindSpeedChart />

        <HumidityChart />

        <TemperatureChart />

        <SoilTemperatureChart />

        <SoilHumidityChart />

        <SoilECChart />

        <IlluminanceChart />

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
import WindSpeedChart from "./components/WindSpeedChart.vue";
import HumidityChart from "./components/HumidityChart.vue";
import TemperatureChart from "./components/TemperatureChart.vue";
import SoilTemperatureChart from "./components/SoilTemperatureChart.vue";
import SoilHumidityChart from "./components/SoilHumidityChart.vue";
import SoilECChart from "./components/SoilECChart.vue";
import IlluminanceChart from "./components/IlluminanceChart.vue";
import RainfallChart from "./components/RainfallChart.vue";
import TreeFilter from "@/components/TreeFilter/index.vue";

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
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
