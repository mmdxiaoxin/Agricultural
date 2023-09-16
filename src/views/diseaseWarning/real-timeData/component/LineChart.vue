<template>
  <div :class="props.customClass" ref="lineChart"></div>
</template>

<script setup lang="ts" name="LineChart">
import { onMounted, PropType, ref } from "vue";
import * as echarts from "echarts";
import { useEcharts } from "@/hooks/useEcharts";

interface DataItem {
  time: string;
  chartData: number;
}

interface ColorTheme {
  offset: number;
  color: string;
}

const lineChart = ref<HTMLElement>();
const props = defineProps({
  customClass: {
    type: String,
    default: "line-chart"
  },
  chartTitle: {
    type: String,
    default: "通用折线图"
  },
  chartData: {
    type: Array as PropType<DataItem[]>,
    default: () => [
      { time: "01:00", chartData: 830 },
      { time: "02:00", chartData: 920 },
      { time: "03:00", chartData: 810 },
      { time: "04:00", chartData: 820 },
      { time: "05:00", chartData: 940 },
      { time: "06:00", chartData: 950 },
      { time: "07:00", chartData: 950 },
      { time: "08:00", chartData: 960 },
      { time: "09:00", chartData: 980 },
      { time: "10:00", chartData: 980 },
      { time: "11:00", chartData: 990 },
      { time: "12:00", chartData: 940 },
      { time: "13:00", chartData: 1260 },
      { time: "14:00", chartData: 920 },
      { time: "15:00", chartData: 940 },
      { time: "16:00", chartData: 930 },
      { time: "17:00", chartData: 800 },
      { time: "18:00", chartData: 990 },
      { time: "19:00", chartData: 770 },
      { time: "20:00", chartData: 960 },
      { time: "21:00", chartData: 870 },
      { time: "22:00", chartData: 960 },
      { time: "23:00", chartData: 750 },
      { time: "00:00", chartData: 840 }
    ]
  },
  chartUnit: {
    type: String,
    default: "unknown"
  },
  chartTheme: {
    type: Array as PropType<ColorTheme[]>,
    default: () => [
      { offset: 0, color: "rgb(128, 255, 165)" },
      { offset: 1, color: "rgb(1, 191, 236)" }
    ]
  }
});

const drawConductivityChart = () => {
  let myChart: echarts.ECharts = echarts.init(lineChart.value as HTMLElement);
  let option: echarts.EChartsOption = {
    color: ["#2368a1", "#00DDFF", "#37A2FF", "#FF0087", "#FFBF00"],
    title: {
      text: props.chartTitle,
      subtext: props.chartUnit
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
        label: {
          backgroundColor: "#6a7985"
        }
      }
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true
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
      data: props.chartData.map(item => item.time) // 使用 props 中的时间数据
    },
    yAxis: {
      type: "value",
      axisPointer: {
        snap: true
      }
    },
    series: [
      {
        name: "土壤EC",
        type: "line",
        smooth: true,
        data: props.chartData.map(item => item.chartData) // 使用 props 中的图表数据
      }
    ]
  };

  useEcharts(myChart, option);
};

onMounted(() => {
  drawConductivityChart();
});
</script>

<style scoped lang="scss">
@import "@/styles/chartStyle.scss";
.line-chart {
  width: 100%;
  height: 100%;
}
</style>
