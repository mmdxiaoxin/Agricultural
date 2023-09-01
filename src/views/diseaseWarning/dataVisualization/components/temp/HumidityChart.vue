<template>
  <div class="chart-container-small" ref="humidityChart"></div>
</template>

<script setup name="HumidityChart">
import { onMounted, ref } from "vue";
import * as echarts from "echarts";

const humidityChart = ref(null);

// Simulated real-time data
const humidityData = ref([
  { time: "08:00", humidity: 60 },
  { time: "09:00", humidity: 65 },
  { time: "10:00", humidity: 70 },
  { time: "11:00", humidity: 75 },
  { time: "12:00", humidity: 80 }
]);

onMounted(() => {
  drawHumidityChart();
});

const drawHumidityChart = () => {
  const chart = echarts.init(humidityChart.value);

  const option = {
    title: {
      text: "空气湿度"
    },
    tooltip: {
      trigger: "axis"
    },
    xAxis: {
      type: "category",
      data: humidityData.value.map(item => item.time)
    },
    yAxis: {
      type: "value",
      name: "RH%"
    },
    series: [
      {
        name: "空气湿度",
        type: "line",
        data: humidityData.value.map(item => item.humidity)
      }
    ]
  };

  chart.setOption(option);
};

// Function to update data
const updateData = () => {
  const currentTime = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  // Generate random data for humidity and temperature
  const newHumidityData = {
    time: currentTime,
    humidity: Math.random() * 40 + 60 // Simulated humidity value (60% to 100%)
  };

  humidityData.value.push(newHumidityData);

  if (humidityData.value.length > 20) {
    humidityData.value.shift();
  }
};

onMounted(() => {
  drawHumidityChart();
  // Start the data update interval
  setInterval(updateData, 2000); // Update data every 2 seconds
});

// ...
</script>

<style scoped lang="scss">
@import "../../../../../styles/chartStyle";
</style>
