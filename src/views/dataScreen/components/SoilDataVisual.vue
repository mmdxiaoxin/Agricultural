<template>
  <div class="soil-data-visual" ref="chartContainer" id="SoilDataVisual"></div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { ECharts, EChartsOption, init } from "echarts";

const chartContainer = ref<HTMLElement>();
const initChart = (): ECharts => {
  const charEle = document.getElementById("SoilDataVisual") as HTMLElement;
  const charEch: ECharts = init(charEle);
  const option: EChartsOption = {
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
        magicType: { show: true, type: ["line", "bar"] },
        restore: { show: true }
      }
    },
    legend: {
      data: ["导电率", "湿度", "温度"]
    },
    xAxis: [
      {
        type: "category",
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
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
        data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
      },
      {
        name: "湿度",
        type: "bar",
        tooltip: {
          valueFormatter: function (value) {
            return (value as number) + " RH%";
          }
        },
        data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
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
        data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
      }
    ]
  };
  charEch.setOption(option);
  return charEch;
};
defineExpose({
  initChart
});
</script>

<style scoped lang="scss">
.soil-data-visual {
  width: 89%;
  height: 84%;
}
</style>
