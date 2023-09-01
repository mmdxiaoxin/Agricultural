<template>
  <!-- 中国地图 -->
  <div class="map-ball"></div>
  <div id="mapChart" class="echarts"></div>
</template>

<script setup lang="ts">
import { ECharts, EChartsOption, init } from "echarts";
import echarts from "@/utils/echarts";
import mapJson from "../assets/china.json";

const initChart = (data: any = []): ECharts => {
  const charEle = document.getElementById("mapChart") as HTMLElement;
  const charEch: ECharts = init(charEle);
  echarts.registerMap("china", mapJson as any);
  const option: EChartsOption = {
    // 悬浮窗
    tooltip: {
      trigger: "item",
      formatter: function (params: any) {
        return `${params.name}: ${params.value || "-"}`;
      }
    },
    // echarts大小位置
    grid: {
      left: "0px",
      right: "80px",
      top: "10px",
      bottom: "10px"
    },
    geo: {
      map: "china",
      zoom: 1.5,
      center: [102.848234, 32.82333],
      scaleLimit: {
        min: 0.8
      },
      label: {
        color: "#fff",
        show: true
      },
      emphasis: {
        label: {
          color: "#fff",
          show: true
        },
        itemStyle: {
          areaColor: {
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: "#073684" // 0% 处的颜色
              },
              {
                offset: 1,
                color: "#2B91B7" // 100% 处的颜色
              }
            ]
          }
        }
      },
      roam: false,
      itemStyle: {
        areaColor: {
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: "#073684" // 0% 处的颜色
            },
            {
              offset: 1,
              color: "#061E3D" // 100% 处的颜色
            }
          ]
        },
        borderColor: new echarts.graphic.LinearGradient(
          0,
          0,
          0,
          1,
          [
            {
              offset: 0,
              color: "#00F6FF"
            },
            {
              offset: 1,
              color: "#87ADCB"
            }
          ],
          false
        ),
        shadowColor: "rgba(10,76,139,1)",
        shadowOffsetY: 0,
        shadowBlur: 60,
        borderWidth: 1
      },
      tooltip: {
        show: false
      }
    },
    // 要显示的散点数据
    series: [
      {
        name: "设备数量",
        type: "scatter", // 使用散点图类型
        coordinateSystem: "geo",
        zlevel: 2, // 确保散点在上面
        symbolSize: function (val) {
          // 控制散点大小，你可以根据设备数量来调整
          return val[1] / 5; // 这里做了一个简单的缩放
        },
        label: {
          show: true,
          formatter: function (params: any) {
            // 在散点上显示设备数量
            return params.value[1];
          },
          fontSize: 10, // 调整字体大小
          color: "#fff" // 字体颜色
        },
        itemStyle: {
          color: "red" // 散点的颜色
        },
        data: data.map(function (item: any) {
          // 转换数据格式，以匹配散点图的要求
          return {
            name: item.name,
            value: item.value
          };
        })
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
<style lang="scss" scoped>
.echarts {
  width: 100%;
  height: 100%;
}
.map-ball {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 900px;
  height: 900px;
  transform: translate(-50%, -50%);
  img {
    width: 500px;
    height: 500px;
  }
}
</style>
