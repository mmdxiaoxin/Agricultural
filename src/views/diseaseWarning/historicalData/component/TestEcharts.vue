<template>
  <div class="chart-container-small" ref="TestChart"></div>
</template>

<script setup name="TestEcharts">
import { onMounted, ref } from "vue";
import * as echarts from "echarts";

const TestChart = ref(null);

onMounted(() => {
  drawTestChart();
});

const drawTestChart = () => {
  const chart = echarts.init(TestChart.value);
  const option = {
    title: {
      text: "温度变化",
      subtext: "温度"
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross"
      }
    },
    toolbox: {
      show: true,
      feature: {
        saveAsImage: {}
      }
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      // prettier-ignore
      data: ['00:00', '01:15', '02:30', '03:45', '05:00', '06:15', '07:30', '08:45', '10:00', '11:15', '12:30', '13:45', '15:00', '16:15', '17:30', '18:45', '20:00', '21:15', '22:30', '23:45']
    },
    yAxis: {
      type: "value",
      axisLabel: {
        formatter: "{value} ℃"
      },
      axisPointer: {
        snap: true
      }
    },
    visualMap: {
      show: false,
      dimension: 0,
      pieces: [
        {
          lte: 6,
          color: "green"
        },
        {
          gt: 6,
          lte: 8,
          color: "red"
        },
        {
          gt: 8,
          lte: 14,
          color: "green"
        },
        {
          gt: 14,
          lte: 17,
          color: "red"
        },
        {
          gt: 17,
          color: "green"
        }
      ]
    },
    series: [
      {
        name: "温度",
        type: "line",
        smooth: true,
        // prettier-ignore
        data: [20, 18, 15, 16, 17, 20, 35, 40, 30, 29, 28, 29, 30, 35, 39, 40, 41, 39, 36, 34]
      }
    ]
  };
  chart.setOption(option);
};
</script>

<style scoped lang="scss">
@import "@/styles/chartStyle.scss";
</style>
