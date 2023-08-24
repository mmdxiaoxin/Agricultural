<template>
  <div class="dataVisualize-box">
    <div class="top-box">
      <div class="top-title">数据可视化</div>
      <el-tabs v-model="tabActive" class="demo-tabs">
        <el-tab-pane v-for="item in tab" :key="item.name" :label="item.label" :name="item.name"></el-tab-pane>
      </el-tabs>
      <div class="dashboard">
        <el-card shadow="hover">
          <WindDirectionChart />
        </el-card>

        <el-card shadow="hover">
          <WindSpeedChart />
        </el-card>

        <el-card shadow="hover">
          <HumidityChart />
        </el-card>

        <el-card shadow="hover">
          <TemperatureChart />
        </el-card>

        <el-card shadow="hover">
          <SoilTemperatureChart />
        </el-card>

        <el-card shadow="hover">
          <SoilHumidityChart />
        </el-card>

        <el-card shadow="hover">
          <SoilECChart />
        </el-card>

        <el-card shadow="hover">
          <IlluminanceChart />
        </el-card>

        <el-card shadow="hover">
          <RainfallChart />
        </el-card>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import WindDirectionChart from "./components/WindDirectionChart.vue";
import WindSpeedChart from "./components/WindSpeedChart.vue";
import HumidityChart from "./components/HumidityChart.vue";
import TemperatureChart from "./components/TemperatureChart.vue";
import SoilTemperatureChart from "./components/SoilTemperatureChart.vue";
import SoilHumidityChart from "./components/SoilHumidityChart.vue";
import SoilECChart from "./components/SoilECChart.vue";
import IlluminanceChart from "./components/IlluminanceChart.vue";
import RainfallChart from "./components/RainfallChart.vue";

const tabActive = ref(1);
const tab = [
  { label: "近24小时", name: 1 },
  { label: "近七日", name: 2 },
  { label: "近一月", name: 3 },
  { label: "近三月", name: 4 },
  { label: "近半年", name: 5 },
  { label: "近一年", name: 6 }
];
</script>

<style scoped lang="scss">
.dataVisualize-box {
  .top-box {
    margin-bottom: 1rem;
    padding-bottom: 1rem;
    padding-left: 1.5rem;
    padding-right: 1.5rem;
    background-color: white;
  }

  .dashboard {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }

  .el-card {
    margin-bottom: 1rem;
  }
}
</style>
