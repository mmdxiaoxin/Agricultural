<template>
  <div class="chart-container-small" ref="chartContainer"></div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import * as echarts from "echarts";
import { useEcharts } from "@/hooks/useEcharts";
import { PropType } from "vue/dist/vue";

interface DataItem {
  time: string;
  chartData: number;
}

const chartContainer = ref<HTMLElement>();
const props = defineProps({
  chartData: {
    type: Array as PropType<DataItem[]>,
    default: () => [
      { time: "01:00", chartData: 13 },
      { time: "02:00", chartData: 12 },
      { time: "03:00", chartData: 11 },
      { time: "04:00", chartData: 12 },
      { time: "05:00", chartData: 14 },
      { time: "06:00", chartData: 15 },
      { time: "07:00", chartData: 15 },
      { time: "08:00", chartData: 16 },
      { time: "09:00", chartData: 18 },
      { time: "10:00", chartData: 18 },
      { time: "11:00", chartData: 19 },
      { time: "12:00", chartData: 24 },
      { time: "13:00", chartData: 26 },
      { time: "14:00", chartData: 32 },
      { time: "15:00", chartData: 34 },
      { time: "16:00", chartData: 33 },
      { time: "17:00", chartData: 30 },
      { time: "18:00", chartData: 29 },
      { time: "19:00", chartData: 17 },
      { time: "20:00", chartData: 16 },
      { time: "21:00", chartData: 17 },
      { time: "22:00", chartData: 16 },
      { time: "23:00", chartData: 15 },
      { time: "00:00", chartData: 14 }
    ]
  }
});
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
      data: props.chartData.map(item => item.time)
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
        data: props.chartData.map(item => item.chartData)
      }
    ]
  };

  //点击柱状图放大
  const zoomSize = 6;
  myChart.on("click", (params: any) => {
    const dataIndex = params.dataIndex;
    const start = Math.max(dataIndex - zoomSize / 2, 0);
    const end = Math.min(dataIndex + zoomSize / 2, props.chartData.length - 1);

    const startValue = props.chartData[start].time;
    const endValue = props.chartData[end].time;

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
