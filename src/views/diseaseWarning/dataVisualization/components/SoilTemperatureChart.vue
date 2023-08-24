<template>
  <div class="chart-container" ref="temperatureChart"></div>
</template>

<script setup name="SoilTemperatureChart">
import { onMounted, ref } from "vue";
import * as echarts from "echarts";

const temperatureChart = ref(null);

const temperatureData = ref([
  { time: "08:00", temperature: 20 },
  { time: "09:00", temperature: 22 },
  { time: "10:00", temperature: 25 },
  { time: "11:00", temperature: 28 },
  { time: "12:00", temperature: 30 }
]);

onMounted(() => {
  drawTemperatureChart();
});

const drawTemperatureChart = () => {
  const chart = echarts.init(temperatureChart.value);

  const option = {
    title: {
      text: "土壤温度"
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
        name: "土壤温度",
        type: "line",
        data: temperatureData.value.map(item => item.temperature)
      }
    ]
  };

  chart.setOption(option);
};

// Function to update data
const updateData = () => {
  const currentTime = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  // Generate random data for soil temperature and humidity
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
@import "./chartStyle.scss";
</style>
