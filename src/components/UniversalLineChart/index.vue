<template>
  <div :class="props.customClass" ref="universalLineChart"></div>
</template>

<script setup lang="ts" name="UniversalLineChart">
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

const universalLineChart = ref<HTMLElement>();
const props = defineProps({
  customClass: {
    type: String,
    default: "chart-container-small"
  },
  chartTitle: {
    type: String,
    default: "通用折线图"
  },
  chartData: {
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

const drawTemperatureChart = () => {
  let myChart: echarts.ECharts = echarts.init(universalLineChart.value as HTMLElement);
  let option: echarts.EChartsOption = {
    color: ["#80FFA5", "#00DDFF", "#37A2FF", "#FF0087", "#FFBF00"],
    title: {
      text: props.chartTitle
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
    dataZoom: [
      {
        type: "inside"
      }
    ],
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: props.chartData.map(item => item.time)
    },
    yAxis: {
      type: "value",
      name: props.chartUnit
    },
    series: [
      {
        name: props.chartTitle,
        type: "line",
        stack: "Total",
        smooth: true,
        lineStyle: {
          width: 0
        },
        showSymbol: false,
        areaStyle: {
          opacity: 0.8,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, props.chartTheme)
        },
        emphasis: {
          focus: "series"
        },
        data: props.chartData.map(item => item.chartData)
      }
    ]
  };

  //点击缩放
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
  drawTemperatureChart();
});
</script>

<style scoped lang="scss">
@import "@/styles/chartStyle.scss";
</style>
