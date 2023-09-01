<template>
  <div class="chart-container-small" ref="temperatureChart"></div>
</template>

<script setup name="TemperatureChart" lang="ts">
import { onMounted, ref } from "vue";
import * as echarts from "echarts";
import { useEcharts } from "@/hooks/useEcharts";
const temperatureChart = ref<HTMLElement>();

// Simulated real-time data
const temperatureData = ref([
  { time: "08:00", temperature: 25 },
  { time: "09:00", temperature: 26 },
  { time: "10:00", temperature: 28 },
  { time: "11:00", temperature: 30 },
  { time: "12:00", temperature: 32 }
]);

const drawTemperatureChart = () => {
  let myChart: echarts.ECharts = echarts.init(temperatureChart.value as HTMLElement);
  let option: echarts.EChartsOption = {
    title: {
      text: "空气温度"
    },
    tooltip: {
      trigger: "axis"
    },
    xAxis: {
      type: "category",
      data: temperatureData.value.map(item => item.time)
    },
    yAxis: {
      type: "value",
      name: "℃"
    },
    series: [
      {
        name: "空气温度",
        type: "line",
        data: temperatureData.value.map(item => item.temperature)
      }
    ]
  };
  useEcharts(myChart, option);
};

// Function to update data
const updateData = () => {
  const currentTime = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  // Generate random data for humidity and temperature
  const newTemperatureData = {
    time: currentTime,
    temperature: Math.random() * 10 + 20 // Simulated temperature value (20°C to 30°C)
  };

  temperatureData.value.push(newTemperatureData);

  if (temperatureData.value.length > 20) {
    temperatureData.value.shift();
  }
};

onMounted(() => {
  drawTemperatureChart();
  // Start the data update interval
  setInterval(updateData, 2000); // Update data every 2 seconds
});
</script>

<style scoped lang="scss">
@import "@/styles/chartStyle";
</style>
