<template>
  <div class="chart-container-small" ref="windDirectionChart"></div>
</template>

<script setup name="WindChart">
import { onMounted, ref } from "vue";
import * as echarts from "echarts";

const windDirectionChart = ref(null); // 创建DOM引用
const roseInfosList = ref([]); // 玫瑰风向图数据
function getList() {
  // getWindRoseGraphByConditions(queryParams.value).then(res => {
  //   if (res.code === 200) {
  //     /* 由于echars雷达图绘制数据是逆时针的，而后端给我的数据是顺时针的
  //     因此这里需要将之转换为逆时针，原理是数组除第一个数据其余数组倒置 */
  //     // 1.获取玫瑰风图数据
  //     const RoseOriginData = res.data.roseInfos;
  //     // 获取数组第一个数据和其余数据
  //     const [RoseFirstData, ...rest] = RoseOriginData;
  //     roseInfosList.value = [RoseFirstData, ...rest.reverse()];
  //     // 2.由于时间不确认，所以风图最大值不确认，因此需要根据数组设置最大值（雷达图必须设置每个轴的最大值）
  //     const roseArrayMaxValue = Math.max(...RoseOriginData);
  //     // 玫瑰图有5层，如果数组最大数不是5的倍数，那么刻度值就会有小数点，这里需要除5并向上取整，再成5，变成5的倍数，避免刻度有小数点的情况
  //     const roseMaxValue = Math.ceil(roseArrayMaxValue / 5) * 5;
  //     init(roseInfosList.value, roseMaxValue);
  //   }
  // });

  // 使用模拟的数据代替后端接口返回的数据
  const mockResponse = {
    code: 200,
    data: {
      roseInfos: [8, 20, 15, 30, 18, 22, 40, 55, 45, 25, 10, 5, 12, 25, 38, 50]
    }
  };

  if (mockResponse.code === 200) {
    const RoseOriginData = mockResponse.data.roseInfos;
    const [RoseFirstData, ...rest] = RoseOriginData;
    roseInfosList.value = [RoseFirstData, ...rest.reverse()];
    const roseArrayMaxValue = Math.max(...RoseOriginData);
    const roseMaxValue = Math.ceil(roseArrayMaxValue / 5) * 5;
    init(roseInfosList.value, roseMaxValue);
  }
}
// 通过鼠标坐标计算鼠标在哪个轴
function getAxisIndex(angle) {
  // 将角度转换为弧度
  angle = (angle * Math.PI) / 180;
  // 将极角的取值范围调整为 [0, 2 * Math.PI)
  angle = (angle + 2 * Math.PI) % (2 * Math.PI);
  // 计算角度所在的轴
  let axisCount = 16; // 轴的数量
  let axisIndex = Math.floor((angle + Math.PI / axisCount) / (Math.PI / (axisCount / 2))) % axisCount;
  // console.log('轴', axisIndex);
  return axisIndex;
}
let axisIndex = undefined;
function getPosition(mychart) {
  mychart.on("mousemove", function (params) {
    if (params.event && params.event.offsetX && params.event.offsetY) {
      const point = {
        x: params.event.offsetX - mychart.getWidth() / 2,
        y: mychart.getHeight() / 2 - params.event.offsetY
      };
      const radius = Math.sqrt(Math.pow(point.x, 2) + Math.pow(point.y, 2));
      const angle = Math.atan2(point.y, point.x);
      const degree = (angle * 180) / Math.PI;
      console.log(`Radius: ${radius}, Angle: ${degree}`);
      axisIndex = getAxisIndex(degree);
    }
  });
}

function init(RoseData, roseMaxValue) {
  // 基于准备好的dom，初始化echars实例
  let mychart = echarts.init(windDirectionChart.value);

  // 指定图表的配置项和数据
  let option = {
    title: {
      text: "风向"
    },
    tooltip: {
      trigger: "item", // 触发类型
      show: true,
      formatter: function (params) {
        getPosition(mychart);
        const direction = [
          "正北",
          "北西北",
          "西北",
          "西西北",
          "正西",
          "西西南",
          "西南",
          "南西南",
          "正南",
          "南东南",
          "东南",
          "东东南",
          "正东",
          "东东北",
          "东北",
          "北东北"
        ];
        return `${direction[axisIndex]}风：${params.value[axisIndex]}`;
      }
    },
    radar: {
      axisLine: {
        lineStyle: {
          color: "#ddd",
          width: 2
        }
      },
      // 将雷达图周围分为 5 个圆圈
      splitNumber: 5,
      // 设置圈圈样式
      splitLine: {
        lineStyle: {
          color: "#ddd",
          width: 2
        }
      },
      // shape: 'circle',
      indicator: [
        { name: "N", max: roseMaxValue, axisLabel: { show: true, color: "#000" } },
        { name: "NNW", max: roseMaxValue },
        { name: "NW", max: roseMaxValue },
        { name: "WNW", max: roseMaxValue },
        { name: "W", max: roseMaxValue },
        { name: "WSW", max: roseMaxValue },
        { name: "SW", max: roseMaxValue },
        { name: "SSW", max: roseMaxValue },
        { name: "S", max: roseMaxValue },
        { name: "SSE", max: roseMaxValue },
        { name: "SE", max: roseMaxValue },
        { name: "ESE", max: roseMaxValue },
        { name: "E", max: roseMaxValue },
        { name: "ENE", max: roseMaxValue },
        { name: "NE", max: roseMaxValue },
        { name: "NNE", max: roseMaxValue }
      ]
    },
    series: [
      {
        type: "radar",
        symbol: "circle", // set the symbol to circle
        symbolSize: 8, // adjust the symbol size
        itemStyle: {
          color: "#1890ff",
          borderColor: "#1890ff",
          borderWidth: 2
        },
        lineStyle: {
          width: 2
        },
        data: [
          {
            value: RoseData
          }
        ]
      }
    ]
  };
  mychart.setOption(option);
}

onMounted(() => {
  getList();
});
</script>

<style scoped lang="scss">
@import "@/styles/chartStyle.scss";
</style>
