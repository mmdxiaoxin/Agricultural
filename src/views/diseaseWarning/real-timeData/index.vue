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
        <span>当前数据</span>
        <span>
          <el-button type="primary" :icon="Refresh" @click="refresh"> 刷新 </el-button>
          <el-button type="primary" :icon="FullScreen" @click="maximize"> 全屏 </el-button>
        </span>
      </div>
      <div class="dashboard">
        <TemperatureGaugeChart type="air" :temperaturedata="37" />
        <TemperatureGaugeChart type="soil" :temperaturedata="36" />
      </div>
    </div>
  </div>
</template>

<script setup name="realTimeDataChart" lang="ts">
import TemperatureGaugeChart from "@/views/diseaseWarning/real-timeData/component/TemperatureGaugeChart.vue";
import TreeFilter from "@/components/TreeFilter/index.vue";
import { inject, reactive, nextTick } from "vue";
import { ElMessage } from "element-plus";
import { useRoute } from "vue-router";
import { getUserDevice } from "@/api/modules/user";
import { useGlobalStore } from "@/stores/modules/global";
import { useKeepAliveStore } from "@/stores/modules/keepAlive";
import { FullScreen, Refresh } from "@element-plus/icons-vue";

const route = useRoute();
const globalStore = useGlobalStore();
const keepAliveStore = useKeepAliveStore();
const treeFilterValue = reactive({ device: "1" });
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
@import "../dataVisualization/index.scss";
</style>
