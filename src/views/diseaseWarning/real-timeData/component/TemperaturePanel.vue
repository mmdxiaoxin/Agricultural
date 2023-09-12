<template>
  <div class="temperature-panel">
    <div class="air-temperature card">空气温度</div>
    <div class="temperature-line-chart card">
      <LineChart chart-item1-text="空气" chart-item2-text="土壤" chart-title="温度统计" v-model:chart-data="chartData" />
    </div>
    <div class="soil-temperature card">土壤温度</div>
  </div>
</template>

<script setup lang="ts" name="TemperaturePanel">
import LineChart from "@/views/diseaseWarning/real-timeData/component/LineChart.vue";
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

// 使用 ref 存储生成的数据
const chartData = ref(generateChartData());

// 在 mounted 钩子中初始化数据
onMounted(() => {
  chartData.value = generateChartData();
});
</script>

<style scoped lang="scss">
.temperature-panel {
  display: grid;
  grid-template-columns: 3fr 1fr;
  grid-template-rows: 1fr 1fr;
  grid-gap: 5px;
  height: 100%;

  .air-temperature,
  .temperature-line-chart,
  .soil-temperature {
    height: 100%;
    width: 100%;
  }

  .air-temperature {
    grid-column: 2/3;
    grid-row: 1/2;
  }

  .temperature-line-chart {
    grid-column: 1/2;
    grid-row: 1/3;
  }

  .soil-temperature {
    grid-column: 2/3;
    grid-row: 2/3;
  }
}
</style>
