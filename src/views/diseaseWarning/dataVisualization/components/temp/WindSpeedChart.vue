<template>
  <div class="chart-container-small" ref="windSpeedChart"></div>
</template>

<script setup name="WindSpeedChart" lang="ts">
import { onMounted, ref } from "vue";
import * as echarts from "echarts";
import { useEcharts } from "@/hooks/useEcharts";
const windSpeedChart = ref<HTMLElement>();

onMounted(() => {
  let myChart: echarts.ECharts = echarts.init(windSpeedChart.value as HTMLElement);
  let option: echarts.EChartsOption = {
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
  useEcharts(myChart, option);
});

// Example data for wind speed and wind direction, you can replace it with your real-time data
const windSpeedData = [3.63, 2.87, 4.12, 5.01, 3.95];
</script>

<style scoped lang="scss">
@import "@/styles/chartStyle";
</style>
