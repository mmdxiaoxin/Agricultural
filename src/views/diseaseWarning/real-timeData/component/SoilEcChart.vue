<template>
  <div :class="props.customClass" ref="lineChart"></div>
</template>

<script setup lang="ts" name="LineChart">
import { onMounted, PropType, ref } from "vue";
import * as echarts from "echarts";
import { useEcharts } from "@/hooks/useEcharts";

export interface DataItem {
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
  soilEcChartData: {
    type: Array as PropType<DataItem[]>,
    default: () => []
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
      data: props.soilEcChartData.map(item => item.time) // 使用 props 中的时间数据
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
        data: props.soilEcChartData.map(item => item.chartData) // 使用 props 中的图表数据
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
