<template>
  <div :class="props.customClass" ref="lineChart"></div>
</template>

<script setup lang="ts" name="LineChart">
import { onMounted, PropType, ref } from "vue";
import * as echarts from "echarts";
import { useEcharts } from "@/hooks/useEcharts";

interface DataItem {
  time: string;
  chartData: {
    data1: number;
    data2: number;
  };
}

interface ColorTheme {
  offset: number;
  color: string;
}

const lineChart = ref<HTMLElement>();
const props = defineProps({
  customClass: {
    type: String,
    default: "bar-chart"
  },
  chartTitle: {
    type: String,
    default: "通用折线图"
  },
  chartItem1Text: {
    type: String,
    default: "数据1"
  },
  chartItem2Text: {
    type: String,
    default: "数据2"
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
  let myChart: echarts.ECharts = echarts.init(lineChart.value as HTMLElement);
  let option: echarts.EChartsOption = {
    title: {
      text: props.chartTitle
    },
    tooltip: {
      trigger: "axis"
    },
    legend: {
      data: [props.chartItem1Text, props.chartItem2Text]
    },
    toolbox: {
      show: true,
      feature: {
        magicType: { show: true, type: ["line", "bar"] },
        restore: { show: true },
        saveAsImage: { show: true }
      }
    },
    calculable: true,
    xAxis: [
      {
        type: "category",
        // 根据外部导入的数据生成x轴数据
        data: props.chartData.map((item: DataItem) => item.time)
      }
    ],
    yAxis: [
      {
        type: "value"
      }
    ],
    series: [
      {
        name: props.chartItem1Text,
        type: "bar",
        // 根据外部导入的数据生成y轴数据
        data: props.chartData.map((item: DataItem) => item.chartData.data1),
        markPoint: {
          data: [
            { type: "max", name: "Max" },
            { type: "min", name: "Min" }
          ]
        },
        markLine: {
          data: [{ type: "average", name: "Avg" }]
        }
      },
      {
        name: props.chartItem2Text,
        type: "bar",
        // 根据外部导入的数据生成y轴数据
        data: props.chartData.map((item: DataItem) => item.chartData.data2),
        markPoint: {
          data: [
            { type: "max", name: "Max" },
            { type: "min", name: "Min" }
          ]
        },
        markLine: {
          data: [{ type: "average", name: "Avg" }]
        }
      }
    ]
  };

  useEcharts(myChart, option);
};

onMounted(() => {
  drawTemperatureChart();
});
</script>

<style scoped lang="scss">
@import "@/styles/chartStyle.scss";
.bar-chart {
  width: 100%;
  height: 100%;
}
</style>
