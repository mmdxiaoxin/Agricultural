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
      <!-- 主要数据展示区域 -->
      <div class="dashboard">
        <div class="temperature card"><TemperaturePanel /></div>
        <div class="humidity card"><HumidityPanel /></div>
        <div class="weather card"><WeatherChart /></div>
        <div class="conductivity card">导电率</div>
        <div class="rain-fall card"><Rainfall /></div>
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
import WeatherChart from "@/views/diseaseWarning/real-timeData/component/WeatherChart.vue";
import TemperaturePanel from "@/views/diseaseWarning/real-timeData/component/TemperaturePanel.vue";
import HumidityPanel from "@/views/diseaseWarning/real-timeData/component/HumidityPanel.vue";
import Rainfall from "@/views/diseaseWarning/real-timeData/component/Rainfall.vue";
// 创建一个响应式变量来存储当前时间
const currentTime = ref("");

// 更新当前时间的函数
const updateCurrentTime = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const day = now.getDate();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  currentTime.value = `${year}年${month}月${day}日 ${hours}:${minutes}:${seconds}`;
};

// 在组件挂载后开始更新当前时间
onMounted(() => {
  updateCurrentTime(); // 初始化当前时间
  setInterval(updateCurrentTime, 1000); // 每秒更新一次当前时间
});
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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
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

// 在组件挂载后开始更新当前时间
onMounted(() => {
  updateCurrentTime(); // 初始化当前时间
  setInterval(updateCurrentTime, 1000); // 每秒更新一次当前时间
});
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
