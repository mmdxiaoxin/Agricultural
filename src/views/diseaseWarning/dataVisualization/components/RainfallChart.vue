<template>
  <div class="chart-container-small" ref="chartContainer"></div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import * as echarts from "echarts";
import { useEcharts } from "@/hooks/useEcharts";

const chartContainer = ref<HTMLElement>();

const data = ref([
  { time: "01:00", rainfall: 24 },
  { time: "02:00", rainfall: 32 },
  { time: "03:00", rainfall: 48 },
  { time: "04:00", rainfall: 50 },
  { time: "05:00", rainfall: 51 },
  { time: "06:00", rainfall: 52 },
  { time: "07:00", rainfall: 53 },
  { time: "08:00", rainfall: 40 },
  { time: "09:00", rainfall: 39 },
  { time: "10:00", rainfall: 35 },
  { time: "11:00", rainfall: 20 },
  { time: "12:00", rainfall: 19 },
  { time: "13:00", rainfall: 18 },
  { time: "14:00", rainfall: 10 },
  { time: "15:00", rainfall: 12 },
  { time: "16:00", rainfall: 14 },
  { time: "17:00", rainfall: 16 },
  { time: "18:00", rainfall: 18 },
  { time: "19:00", rainfall: 20 },
  { time: "20:00", rainfall: 22 },
  { time: "21:00", rainfall: 24 },
  { time: "22:00", rainfall: 26 },
  { time: "23:00", rainfall: 28 },
  { time: "00:00", rainfall: 30 }
]);

const drawChart = () => {
  let myChart: echarts.ECharts = echarts.init(chartContainer.value as HTMLElement);
  let option: echarts.EChartsOption = {
    title: {
      text: "降雨量"
    },
    tooltip: {
      trigger: "axis"
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true
    },
    xAxis: {
      axisLabel: {
        inside: true,
        color: "#fff"
      },
      axisTick: {
        show: false
      },
      axisLine: {
        show: false
      },
      z: 10,
      data: data.value.map(item => item.time)
    },
    yAxis: {
      type: "value",
      name: "mm",
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        color: "#999"
      }
    },
    dataZoom: [
      {
        type: "inside"
      }
    ],
    series: [
      {
        name: "降雨量",
        type: "bar",
        showBackground: true,
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: "#83bff6" },
            { offset: 0.5, color: "#188df0" },
            { offset: 1, color: "#188df0" }
          ])
        },
        emphasis: {
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: "#2378f7" },
              { offset: 0.7, color: "#2378f7" },
              { offset: 1, color: "#83bff6" }
            ])
          }
        },
        data: data.value.map(item => item.rainfall)
      }
    ]
  };

  //点击柱状图放大
  const zoomSize = 6;
  myChart.on("click", (params: any) => {
    const dataIndex = params.dataIndex;
    const start = Math.max(dataIndex - zoomSize / 2, 0);
    const end = Math.min(dataIndex + zoomSize / 2, data.value.length - 1);

    const startValue = data.value[start].time;
    const endValue = data.value[end].time;

    myChart.dispatchAction({
      type: "dataZoom",
      startValue,
      endValue,
      dataZoomIndex: 0
    });
  });
  useEcharts(myChart, option);
};

onMounted(() => {
  drawChart();
});
</script>

<style scoped lang="scss">
@import "@/styles/chartStyle.scss";
</style>
