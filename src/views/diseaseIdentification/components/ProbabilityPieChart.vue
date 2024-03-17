<template>
  <div ref="pieChartRef" class="chart-container"></div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import * as echarts from "echarts";
import { useEcharts } from "@/hooks/useEcharts";
import { PropType } from "vue/dist/vue";

interface ChartData {
  value: number;
  name: string;
}

// 定义组件的 props
const props = defineProps({
  data: {
    type: Array as PropType<ChartData[]>,
    required: true,
    default: () => []
  }
});

const pieChartRef = ref<HTMLElement>();

const drawPieChart = () => {
  let myChart: echarts.ECharts = echarts.init(pieChartRef.value as HTMLElement);
  let option: echarts.EChartsOption = {
    title: {
      text: "概率分布图",
      subtext: "预测结果",
      left: "center"
    },
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
      left: "center",
      top: "bottom",
      data: props.data.map(item => item.name)
    },
    toolbox: {
      show: true,
      feature: {
        mark: { show: true },
        dataView: { show: true, readOnly: false },
        restore: { show: true },
        saveAsImage: { show: true }
      }
    },
    series: [
      {
        name: "概率分布",
        type: "pie",
        radius: [20, 140],
        center: ["50%", "50%"],
        roseType: "area",
        itemStyle: {
          borderRadius: 5
        },
        data: props.data
      }
    ]
  };
  useEcharts(myChart, option);
};

onMounted(() => {
  drawPieChart();
});

watch(
  () => props.data,
  () => {
    drawPieChart();
  }
);
</script>

<style scoped lang="scss">
.chart-container {
  width: 100%;
  height: 100%;
}
</style>
