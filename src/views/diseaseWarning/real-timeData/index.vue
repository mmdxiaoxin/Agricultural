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
        <!-- 使用 v-for 遍历 deviceDataList 中的数据 -->
        <div v-for="(data, index) in deviceDataList" :key="index" class="data-card">
          <el-card :header="data.name">
            <!-- 数据内容 -->
            <div class="data-content">
              <p>{{ data.value }} {{ data.unit }}</p>
              <p v-if="data.error" class="error-message">{{ data.errorMsg }}</p>
            </div>
          </el-card>
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

const route = useRoute();
const globalStore = useGlobalStore();
const keepAliveStore = useKeepAliveStore();
const treeFilterValue = reactive({ device: "39" });
const deviceDataList = ref([]); // 后端返回的数据
const currentTime = ref(""); // 当前时间

const useDeviceData = async (deviceId: string) => {
  try {
    const params = { id: deviceId, method: "deviceDataHandler" };
    const { data } = await getDevice(params);
    deviceDataList.value = data.deviceDataList || []; // 将数据存储到响应式变量中
    currentTime.value = deviceDataList.value[0].createTime; // 将当前时间存储到响应式变量中
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

onMounted(() => useDeviceData(treeFilterValue.device));
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
