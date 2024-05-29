<template>
  <div class="real-data-box">
    <TreeFilter
      label="name"
      title="设备列表"
      :request-api="getUserDevice"
      :default-value="treeFilterValue.device"
      @change="changeTreeFilter"
    />
    <SiteOverview v-if="isSite" :site-name="siteName" />
    <div class="top-box card" v-if="isDevice">
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

      <el-divider @click="toggleContent2">
        <el-icon v-if="showDisease">
          <CaretTop />
        </el-icon>
        <el-icon v-else>
          <CaretBottom />
        </el-icon>
        <span style="font-weight: bold; color: var(--el-text-color-regular)">病害预警</span>
      </el-divider>
      <!-- 根据状态来显示/隐藏内容 -->
      <div class="card" v-if="showDisease">
        <div class="warn-notification">
          <!-- 选择作物 -->
          <el-card class="warn-item" shadow="hover">
            <template #header>
              <div class="card-header">
                <span>作物:</span>
                <el-select v-model="selectedPlant" placeholder="选择" style="flex: 1">
                  <el-option v-for="option in plantOptions" :key="option.value" :label="option.label" :value="option.value" />
                </el-select>
              </div>
            </template>
            <div class="warn-img">
              <img src="src/assets/images/knowledge_graph.svg" alt="知识图谱" />
            </div>
          </el-card>

          <!-- 根据选定的作物显示易感病害 -->
          <el-card class="warn-item" shadow="hover" v-if="selectedPlant && diseaseOptions[selectedPlant]">
            <template #header>
              <div class="card-header">
                <span>易感病害</span>
              </div>
            </template>
            <div v-for="disease in diseaseOptions[selectedPlant].diseases" :key="disease">
              {{ disease }}
            </div>
          </el-card>

          <!-- 根据选定的作物显示防治措施推荐 -->
          <el-card class="warn-item" shadow="hover" v-if="selectedPlant && diseaseOptions[selectedPlant]">
            <template #header>
              <div class="card-header">
                <span>防治措施推荐</span>
              </div>
            </template>
            <div v-for="prevention in diseaseOptions[selectedPlant].prevention" :key="prevention">
              {{ prevention }}
            </div>
          </el-card>
        </div>
      </div>
      <!-- 主要数据展示区域 -->
      <div class="siteBoard">
        <div class="temperature card">
          <TemperaturePanel
            :air-temperature-data="tempAir"
            :soil-temperature-data="tempSoil"
            :device-id="treeFilterValue.device"
          />
        </div>
        <div class="humidity card">
          <HumidityPanel
            :air-humidity-data="humidityAir"
            :soil-humidity-data="humiditySoil"
            :device-id="treeFilterValue.device"
          />
        </div>
        <div class="weather card">
          <WeatherPanel
            :atmospheric-pressure-data="atmPressure"
            :light-intensity-data="lightInt"
            :wind-direction-data="windDir"
            :wind-speed-data="windSpeed"
            :c-o2-data="CO2Data"
          />
        </div>
        <div class="conductivity card">
          <SoilEcDataPanel :soil-ec-data="soilEc" :device-id="treeFilterValue.device" />
        </div>
        <div class="rain-fall card">
          <Rainfall :rainfall-data="rainfall" />
        </div>
      </div>
      <!-- 分割线 -->
      <el-divider @click="toggleContent">
        <el-icon v-if="showData">
          <CaretTop />
        </el-icon>
        <el-icon v-else>
          <CaretBottom />
        </el-icon>
        <span style="font-weight: bold; color: var(--el-text-color-regular)">数据一览</span>
      </el-divider>
      <!-- 根据状态来显示/隐藏内容 -->
      <div v-if="showData" class="card">
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
import { inject, reactive, nextTick, ref, watch, onMounted } from "vue";
import { ElMessage } from "element-plus";
import { useRoute } from "vue-router";
import { getUserDevice } from "@/api/modules/user";
import { useGlobalStore } from "@/stores/modules/global";
import { useKeepAliveStore } from "@/stores/modules/keepAlive";
import { FullScreen, Refresh } from "@element-plus/icons-vue";
import DataCard from "./component/DataCard.vue";
import { CaretBottom, CaretTop } from "@element-plus/icons-vue";
import TemperaturePanel from "@/views/diseaseWarning/real-timeData/component/TemperaturePanel.vue";
import HumidityPanel from "@/views/diseaseWarning/real-timeData/component/HumidityPanel.vue";
import WeatherPanel from "@/views/diseaseWarning/real-timeData/component/WeatherPanel.vue";
import SoilEcDataPanel from "@/views/diseaseWarning/real-timeData/component/SoilEcDataPanel.vue";
import Rainfall from "@/views/diseaseWarning/real-timeData/component/Rainfall.vue";
import SiteOverview from "@/components/SiteOverview/index.vue";
import { diseaseOptions, plantOptions } from "@/views/diseaseWarning/real-timeData/common";
import {
  currentTime,
  deviceDataList,
  rainfall,
  soilEc,
  CO2Data,
  tempAir,
  humidityAir,
  humiditySoil,
  tempSoil,
  windDir,
  windSpeed,
  atmPressure,
  lightInt,
  useDeviceData
} from "@/hooks/useDeviceData";

const route = useRoute();
const globalStore = useGlobalStore();
const keepAliveStore = useKeepAliveStore();

const treeFilterValue = reactive({ device: "1" });

//内容展开
const showData = ref(false);
const showDisease = ref(false);

//判断站点或者设备
const isSite = ref(false);
const isDevice = ref(true);

//站点名称
const siteName = ref("");

const selectedPlant = ref<string>("apple");

const judgeList = (data: any) => {
  isSite.value = !!data.isSite;
  isDevice.value = !!data.isDevice;
};

const toggleContent = () => {
  showData.value = !showData.value;
};

const toggleContent2 = () => {
  showDisease.value = !showDisease.value;
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
  setInterval(useDeviceData, 5000, treeFilterValue.device);
});

watch(
  () => treeFilterValue.device,
  () => {
    if (isDevice.value) useDeviceData(treeFilterValue.device);
  }
);
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
