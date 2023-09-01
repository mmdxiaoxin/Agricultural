<template>
  <div class="soil-data-visual" ref="chartContainer" id="SoilDataVisual"></div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { ECharts, EChartsOption, init } from "echarts";

const chartContainer = ref<HTMLElement>();

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
const initChart = (data: SoilData): ECharts => {
  const charEle = document.getElementById("SoilDataVisual") as HTMLElement;
  const charEch: ECharts = init(charEle);

  // 使用传入的数据来设置图表配置
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
        restore: { show: true }
      }
    },
    legend: {
      data: ["导电率", "湿度", "温度"]
    },
    xAxis: [
      {
        type: "category",
        data: data.xAxisData, // 使用传入的x轴数据
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
        data: data.conductivityData // 使用传入的导电率数据
      },
      {
        name: "湿度",
        type: "bar",
        tooltip: {
          valueFormatter: function (value) {
            return (value as number) + " RH%";
          }
        },
        data: data.humidityData // 使用传入的湿度数据
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
        data: data.temperatureData // 使用传入的温度数据
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
