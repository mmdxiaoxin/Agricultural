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
        <!-- 主标题 -->
        <span class="top-title">当前数据</span>
        <span>
          <!-- 数据最后更新时间 -->
          数据最后更新时间：2023年8月20日 14:15:00
        </span>
        <span>
          <el-button type="primary" :icon="Refresh" @click="refresh"> 刷新 </el-button>
          <el-button type="primary" :icon="FullScreen" @click="maximize"> 全屏 </el-button>
        </span>
      </div>
      <!-- 主要数据展示区域 -->
      <div class="dashboard">
        <div class="dashboard-box">
          <!-- 风速和风向组件 -->
          <WindWidget />
        </div>
        <!-- 气象数据图表组件 -->
        <!--        <WeatherChart />-->

        <!-- 土壤数据图表组件 -->
        <SoilChart :chart-data="generateData()" />

        <!-- 光照强度组件 -->
        <!--        <LightIntensity />-->

        <div class="dashboard-box">
          <TemperatureGaugeChart type="air" :temperaturedata="37" />
          <TemperatureGaugeChart type="soil" :temperaturedata="36" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup name="realTimeDataChart" lang="ts">
import TemperatureGaugeChart from "./component/TemperatureGaugeChart.vue";
import TreeFilter from "@/components/TreeFilter/index.vue";
import { inject, reactive, nextTick } from "vue";
import { ElMessage } from "element-plus";
import { useRoute } from "vue-router";
import { getUserDevice } from "@/api/modules/user";
import { useGlobalStore } from "@/stores/modules/global";
import { useKeepAliveStore } from "@/stores/modules/keepAlive";
import { FullScreen, Refresh } from "@element-plus/icons-vue";
import WindWidget from "@/views/diseaseWarning/real-timeData/component/WindWidget.vue";
import SoilChart from "@/views/diseaseWarning/real-timeData/component/SoilChart.vue";

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

const generateData = () => {
  const xAxisData: string[] = []; // x轴数据
  const conductivityData: number[] = []; // 导电率数据
  const humidityData: number[] = []; // 湿度数据
  const temperatureData: number[] = []; // 温度数据

  // 生成示例数据，这里只是示范，你可以根据需求生成真实数据
  for (let i = 0; i < 10; i++) {
    xAxisData.push(`日期${i + 1}`);
    conductivityData.push(Math.random() * 100); // 随机生成导电率数据
    humidityData.push(Math.random() * 100); // 随机生成湿度数据
    temperatureData.push(Math.random() * 30); // 随机生成温度数据
  }

  // 调用绘制图表的函数，并将生成的数据传递给它
  return {
    xAxisData,
    conductivityData,
    humidityData,
    temperatureData
  };
};
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
