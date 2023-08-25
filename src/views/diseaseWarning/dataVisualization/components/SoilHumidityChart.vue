<template>
  <div class="chart-container-small" ref="humidityChart"></div>
</template>

<script setup name="SoilHumidityChart">
import { onMounted, ref } from "vue";
import * as echarts from "echarts";

const humidityChart = ref(null);

const humidityData = ref([
  { time: "08:00", humidity: 40 },
  { time: "09:00", humidity: 45 },
  { time: "10:00", humidity: 50 },
  { time: "11:00", humidity: 55 },
  { time: "12:00", humidity: 60 }
]);

onMounted(() => {
  drawHumidityChart();
});

const drawHumidityChart = () => {
  const chart = echarts.init(humidityChart.value);

  const option = {
    title: {
      text: "土壤湿度"
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
      name: "湿度"
    },
    series: [
      {
        name: "土壤湿度",
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

  // Generate random data for soil temperature and humidity
  const newHumidityData = {
    time: currentTime,
    humidity: Math.random() * 20 + 40 // Simulated humidity value (40% to 60%)
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
</script>

<style scoped lang="scss">
@import "../../../../styles/chartStyle.scss";
</style>
