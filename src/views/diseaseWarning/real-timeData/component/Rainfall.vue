<template>
  <div class="rain-fall-chart" ref="SoilDataVisual"></div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import * as echarts from "echarts";
import { useEcharts } from "@/hooks/useEcharts";
import "echarts-liquidfill";

const SoilDataVisual = ref<HTMLElement>();
const props = defineProps({
  chartData: {
    type: Number,
    default: 0
  }
});

// 初始化图表
const drawChart = () => {
  let myChart: echarts.ECharts = echarts.init(SoilDataVisual.value as HTMLElement);
  const data = props.chartData;
  console.log(data);
  let option: echarts.EChartsOption = {
    title: [
      {
        text: data + " mm",
        left: "49%",
        top: "35%",
        textAlign: "center",
        textStyle: {
          fontSize: "14",
          fontWeight: "normal",
          color: "#ffffff",
          align: "center",
          textBorderColor: "rgba(0, 0, 0, 0)",
          textShadowColor: "#000",
          textShadowBlur: 0,
          textShadowOffsetX: 0,
          textShadowOffsetY: 1
        }
      },
      {
        text: "降雨量",
        left: "49%",
        top: "25%",
        textAlign: "center",
        textStyle: {
          fontSize: "15",
          fontWeight: "normal",
          color: "#ffffff",
          align: "center",
          textBorderColor: "rgba(0, 0, 0, 0)",
          textShadowColor: "#000",
          textShadowBlur: 0,
          textShadowOffsetX: 0,
          textShadowOffsetY: 1
        }
      }
    ],
    grid: {
      top: "0",
      left: "0px",
      right: "0px",
      bottom: "0",
      containLabel: true
    },
    polar: {
      radius: ["75%", "85%"],
      center: ["50%", "50%"]
    },
    angleAxis: {
      max: 120,
      clockwise: false,
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        show: false
      },
      splitLine: {
        show: false
      },
      startAngle: 188
    },
    radiusAxis: {
      type: "category",
      show: true,
      axisLabel: {
        show: false
      },
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      }
    },
    series: [
      {
        type: "liquidFill",
        radius: "70%",
        z: 2,
        center: ["50%", "50%"],
        data: [0.4, 0.4, 0.4], // data个数代表波浪数
        itemStyle: {
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: "#a1e187" // 0% 处的颜色
              },
              {
                offset: 1,
                color: "rgb(161,225,135)" // 100% 处的颜色
              }
            ],
            global: false // 缺省为 false
          }
        },
        outline: {
          borderDistance: 0,
          itemStyle: {
            borderWidth: 2,
            borderColor: "#a1e187",
            shadowBlur: 20,
            shadowColor: "#0e80f1"
          }
        },
        label: {
          show: false
        },
        backgroundStyle: {
          borderWidth: 1,
          // 径向渐变，前三个参数分别是圆心 x, y 和半径，取值同线性渐变
          color: {
            type: "radial",
            x: 0.5,
            y: 0.5,
            r: 0.5,
            colorStops: [
              {
                offset: 0,
                color: "#68c92f" // 0% 处的颜色
              },
              {
                offset: 0.8,
                color: "#50c129" // 100% 处的颜色
              },
              {
                offset: 1,
                color: "#68c92f" // 100% 处的颜色
              }
            ],
            global: false // 缺省为 false
          }
        }
      },
      {
        type: "pie",
        radius: ["80%", "80%"],
        center: ["50%", "50%"],
        z: 1,
        label: {
          show: false
        },
        silent: true,
        itemStyle: {
          borderWidth: 2,
          borderType: [8, 10],
          borderDashOffset: 15,
          borderColor: "#31d8d5",
          color: "#114e14",
          borderCap: "round"
        },
        data: [100]
      },
      {
        type: "bar",
        data: [55],
        z: 10,
        coordinateSystem: "polar",
        roundCap: true,
        color: "#24f10e"
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
.rain-fall-chart {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
  height: 100%;
}
</style>
