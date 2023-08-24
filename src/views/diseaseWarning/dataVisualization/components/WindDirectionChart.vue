<template>
  <div class="chart-container" ref="windDirectionChart"></div>
</template>

<script setup name="WindChart">
import { onMounted, ref, watch } from "vue";
import * as echarts from "echarts";

const windDirectionChart = ref(null);

onMounted(() => {
  drawWindDirectionChart();
});

// Example data for wind speed and wind direction, you can replace it with your real-time data
const windDirectionData = [201.9, 195.3, 210.6, 190.2, 205.7];

const drawWindDirectionChart = () => {
  const chart = echarts.init(windDirectionChart.value);
  const option = {
    title: {
      text: "实时风向"
    },
    polar: {},
    angleAxis: {
      type: "value",
      startAngle: 90,
      clockwise: true,
      splitNumber: 4,
      min: 0,
      max: 360,
      axisLabel: {
        formatter: "{value}°"
      }
    },
    radiusAxis: {},
    series: [
      {
        type: "bar",
        data: windDirectionData,
        coordinateSystem: "polar",
        itemStyle: {
          color: "#5470c6"
        },
        emphasis: {
          itemStyle: {
            color: "#c23531"
          }
        }
      }
    ]
  };
  chart.setOption(option);
};

// Watch for real-time data changes and update the charts
watch(
  () => [windDirectionData],
  ([newWindDirectionData]) => {
    const directionChart = echarts.getInstanceByDom(windDirectionChart.value);

    directionChart.setOption({
      series: [
        {
          data: newWindDirectionData
        }
      ]
    });
  }
);
</script>

<style scoped lang="scss">
@import "./chartStyle.scss";
</style>
