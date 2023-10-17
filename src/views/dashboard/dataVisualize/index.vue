<template>
  <div class="dataVisualize-box">
    <div class="card top-box">
      <div class="top-bar">数据统计</div>
      <div class="top-content">
        <el-row :gutter="40">
          <el-col class="mb40" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
            <div class="item-left sle">
              <span class="left-title">设备总数</span>
              <div class="img-box">
                <img src="./images/book-sum.png" alt="" />
              </div>
              <span class="left-number">{{ deviceCount }}个</span>
            </div>
          </el-col>
          <el-col class="mb40" :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
            <div class="item-center">
              <div class="gitee-traffic traffic-box">
                <div class="traffic-img">
                  <img src="./images/add_person.png" alt="" />
                </div>
                <span class="item-value">{{ totalNumberOfDeviceRecords }}</span>
                <span class="traffic-name sle">设备记录总数</span>
              </div>
              <div class="gitHub-traffic traffic-box">
                <div class="traffic-img">
                  <img src="./images/add_team.png" alt="" />
                </div>
                <span class="item-value">{{ siteCount }}</span>
                <span class="traffic-name sle">站点总数</span>
              </div>
              <div class="today-traffic traffic-box">
                <div class="traffic-img">
                  <img src="./images/today.png" alt="" />
                </div>
                <span class="item-value">{{ 0 }}</span>
                <span class="traffic-name sle">今日设备记录</span>
              </div>
              <div class="yesterday-traffic traffic-box">
                <div class="traffic-img">
                  <img src="./images/book_sum.png" alt="" />
                </div>
                <span class="item-value">{{ 0 }}</span>
                <span class="traffic-name sle">异常设备记录</span>
              </div>
            </div>
          </el-col>
          <el-col class="mb40" :xs="24" :sm="24" :md="24" :lg="10" :xl="10">
            <div class="item-right">
              <div class="echarts-title">正常记录 / 异常记录占比</div>
              <div class="book-echarts">
                <Pie ref="pieRef" />
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="card bottom-box">
      <div class="bottom-title">数据来源</div>
      <div class="curve-echarts">
        <Curve ref="curveRef" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="dataVisualize">
import { ref, onMounted } from "vue";
import Pie from "./components/pie.vue";
import Curve from "./components/curve.vue";
import { getDashboard } from "@/api/modules/dataHandle";
import { ElMessage } from "element-plus";

const pieRef = ref();
const deviceCount = ref(NaN);
const siteCount = ref(NaN);
const totalNumberOfDeviceRecords = ref(NaN);
const curveRef = ref();
const pieData = ref();
const curveData = ref();

const useDashboardData = async () => {
  try {
    const { data } = await getDashboard();
    curveData.value = data.siteValues;
    console.log(curveData.value);
    deviceCount.value = parseInt(String(data.deviceCount));
    console.log(deviceCount.value);
    totalNumberOfDeviceRecords.value = parseInt(String(data.totalDeviceDataCount));
    console.log(totalNumberOfDeviceRecords.value);
    siteCount.value = parseInt(String(data.siteCount));
    console.log(siteCount.value);
  } catch (error) {
    ElMessage.error("获取设备数据失败!");
  }
};

onMounted(() => {
  useDashboardData();
  pieRef.value.initChart(pieData);
  curveRef.value.initChart(curveData);
});
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
