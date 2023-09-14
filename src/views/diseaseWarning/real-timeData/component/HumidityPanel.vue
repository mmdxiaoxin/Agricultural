<template>
  <div class="humidity-panel">
    <div class="air-humidity card">
      <div class="title">空气湿度</div>
      <div class="value">{{ airHumidity }} RH%</div>
    </div>
    <div class="humidity-line-chart">
      <BarChart chart-item1-text="空气" chart-item2-text="土壤" chart-title="湿度统计" v-model:chart-data="chartData" />
    </div>
    <div class="soil-humidity card">
      <div class="title">土壤湿度</div>
      <div class="value">{{ soilHumidity }} RH%</div>
    </div>
  </div>
</template>

<script setup lang="ts" name="TemperaturePanel">
import BarChart from "@/views/diseaseWarning/real-timeData/component/BarChart.vue";
import { ref, onMounted } from "vue";

// 生成模拟数据
const generateChartData = () => {
  const data = [];
  for (let i = 0; i < 12; i++) {
    const time = `月份${i + 1}`;
    const data1 = (Math.random() * 30 + 10).toFixed(1); // 生成随机数据1并保留一位小数
    const data2 = (Math.random() * 30 + 10).toFixed(1); // 生成随机数据2并保留一位小数
    data.push({ time, chartData: { data1, data2 } });
  }
  return data;
};

let airHumidity = ref(0);
let soilHumidity = ref(0);

// 使用 ref 存储生成的数据
const chartData = ref(generateChartData());

// 在 mounted 钩子中初始化数据
onMounted(() => {
  chartData.value = generateChartData();
  airHumidity.value = chartData.value[chartData.value.length - 1].chartData.data1;
  soilHumidity.value = chartData.value[chartData.value.length - 1].chartData.data2;
});
</script>

<style scoped lang="scss">
@import "../index";
.humidity-panel {
  display: grid;
  grid-template-columns: 3fr 1fr;
  grid-template-rows: 1fr 1fr;
  grid-gap: 5px;
  height: 100%;

  .air-humidity,
  .humidity-line-chart,
  .soil-humidity {
    height: 100%;
    width: 100%;
  }

  .air-humidity {
    grid-column: 2/3;
    grid-row: 1/2;
  }

  .humidity-line-chart {
    grid-column: 1/2;
    grid-row: 1/3;
  }

  .soil-humidity {
    grid-column: 2/3;
    grid-row: 2/3;
  }
}
</style>
