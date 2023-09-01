<template>
  <div class="rain-fulll-chart" ref="chartContainer" id="SoilDataVisual"></div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import * as echarts from "echarts";
import { useEcharts } from "@/hooks/useEcharts";
import { PropType } from "vue/dist/vue";

const chartContainer = ref<HTMLElement>();
const props = defineProps({
  chartData: {
    type: Array as PropType<SoilData[]>,
    default: () => []
  }
});

/*
 * @description: 传入数据标准
 * */
interface SoilData {
  xAxisData: string[];
  conductivityData: number[];
  humidityData: number[];
  temperatureData: number[];
}

// 初始化图表
const drawChart = () => {
  let myChart: echarts.ECharts = echarts.init(chartContainer.value as HTMLElement);
  const { xAxisData, conductivityData, humidityData, temperatureData } = props.chartData; // 从props中获取数据
  let option: echarts.EChartsOption = {
    title: {
      text: "土壤信息"
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
        crossStyle: {
          color: "#ffffff"
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
      feature: {
        dataView: { show: true, readOnly: false },
        restore: { show: true }
      }
    },
    legend: {
      data: ["导电率", "湿度", "温度"]
    },
    xAxis: [
      {
        type: "category",
        data: xAxisData, // 使用传入的x轴数据
        axisPointer: {
          type: "shadow"
        }
      }
    ],
    yAxis: [
      {
        type: "value",
        name: "湿度RH%",
        min: 0,
        max: 250,
        interval: 50,
        axisLabel: {
          formatter: "{value}"
        }
      },
      {
        type: "value",
        name: "温度℃",
        min: 0,
        max: 25,
        interval: 5,
        axisLabel: {
          formatter: "{value} °C"
        }
      }
    ],
    series: [
      {
        name: "导电率",
        type: "bar",
        tooltip: {
          valueFormatter: function (value) {
            return (value as number) + " us";
          }
        },
        data: conductivityData // 使用传入的导电率数据
      },
      {
        name: "湿度",
        type: "bar",
        tooltip: {
          valueFormatter: function (value) {
            return (value as number) + " RH%";
          }
        },
        data: humidityData // 使用传入的湿度数据
      },
      {
        name: "温度",
        type: "line",
        yAxisIndex: 1,
        tooltip: {
          valueFormatter: function (value) {
            return (value as number) + " °C";
          }
        },
        data: temperatureData // 使用传入的温度数据
      }
    ]
  };
  useEcharts(myChart, option);
};

onMounted(() => {
  drawChart();
});
</script>

<style scoped lang="scss">
@import "@/styles/chartStyle.scss";
.rain-fulll-chart {
  @extend .chart-container;
  min-width: 600px;
  height: 300px;
}
</style>
