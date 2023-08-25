<template>
  <div class="chart-container-small" ref="windSpeedChart"></div>
</template>

<script setup name="WindSpeedChart">
import { onMounted, ref, watch } from "vue";
import * as echarts from "echarts";

const windSpeedChart = ref(null);

onMounted(() => {
  drawWindSpeedChart();
});

// Example data for wind speed and wind direction, you can replace it with your real-time data
const windSpeedData = [3.63, 2.87, 4.12, 5.01, 3.95];

const drawWindSpeedChart = () => {
  const chart = echarts.init(windSpeedChart.value);
  const option = {
    title: {
      text: "风速"
    },
    tooltip: {},
    xAxis: {
      type: "category",
      data: ["8:00", "9:00", "10:00", "11:00", "12:00"] // Replace with your actual time points
    },
    yAxis: {
      type: "value",
      name: "m/s"
    },
    series: [
      {
        type: "line",
        data: windSpeedData
      }
    ]
  };
  chart.setOption(option);
};

// Watch for real-time data changes and update the charts
watch(
  () => [windSpeedData],
  ([newWindSpeedData]) => {
    const speedChart = echarts.getInstanceByDom(windSpeedChart.value);

    speedChart.setOption({
      series: [
        {
          data: newWindSpeedData
        }
      ]
    });
  }
);
</script>

<style scoped lang="scss">
@import "../../../../styles/chartStyle.scss";
</style>
