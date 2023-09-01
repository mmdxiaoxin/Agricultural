<template>
  <div class="dataScreen-container">
    <div ref="dataScreenRef" class="dataScreen">
      <div class="dataScreen-header">
        <div class="header-lf">
          <span class="header-screening" @click="router.push(HOME_URL)">首页</span>
        </div>
        <div class="header-ct">
          <div class="header-ct-title">
            <span>数据可视化大数据展示平台</span>
            <div class="header-ct-warning">平台高峰预警信息（2条）</div>
          </div>
        </div>
        <div class="header-rg">
          <span class="header-download">统计报告</span>
          <span class="header-time">当前时间：{{ time }}</span>
        </div>
      </div>
      <div class="dataScreen-main">
        <div class="dataScreen-lf">
          <div class="dataScreen-top">
            <div class="dataScreen-main-title">
              <span>实时降水量</span>
              <img src="./images/dataScreen-title.png" alt="" />
            </div>
            <!-- chart区域 -->
            <div class="dataScreen-main-chart">
              <RealTimeRainfullChart ref="RealTimeRainfullRef" />
            </div>
          </div>
          <div class="dataScreen-center">
            <div class="dataScreen-main-title">
              <span>气象信息</span>
              <img src="./images/dataScreen-title.png" alt="" />
            </div>
            <!-- chart区域 -->
            <div class="dataScreen-main-chart">
              <WindDataVisualChart :wind-direction="36.5" :wind-speed="24" :light="16" />
            </div>
          </div>
          <div class="dataScreen-bottom">
            <div class="dataScreen-main-title">
              <span>土壤情况</span>
              <img src="./images/dataScreen-title.png" alt="" />
            </div>
            <!-- chart区域 -->
            <div class="dataScreen-main-chart flex-extend">
              <SoilDataVisual ref="SoilDataVisualRef" />
            </div>
          </div>
        </div>
        <div class="dataScreen-ct">
          <div class="dataScreen-map">
            <div class="dataScreen-map-title">实时监控</div>
            <!-- <vue3-seamless-scroll
							:list="alarmData"
							class="dataScreen-alarm"
							:step="0.5"
							:hover="true"
							:limitScrollNum="3"
						>
							<div class="dataScreen-alarm">
								<div class="map-item" v-for="item in alarmData" :key="item.id">
									<img src="./images/dataScreen-alarm.png" alt="" />
									<span class="map-alarm sle">{{ item.label }} 预警：{{ item.warnMsg }}</span>
								</div>
							</div>
						</vue3-seamless-scroll> -->
            <mapChart ref="MapChartRef" />
          </div>
          <div class="dataScreen-cb">
            <div class="dataScreen-main-title">
              <span>最近30天天气温度趋势图</span>
              <img src="./images/dataScreen-title.png" alt="" />
            </div>
            <!-- chart区域 -->
            <div class="dataScreen-main-chart">
              <OverNext30Chart ref="OverNext30Ref" />
            </div>
          </div>
        </div>
        <div class="dataScreen-rg">
          <div class="dataScreen-top">
            <div class="dataScreen-main-title">
              <span>当前设备预警阈值</span>
              <img src="./images/dataScreen-title.png" alt="" />
            </div>
            <!-- chart区域 -->
            <div class="dataScreen-main-chart">
              <HotPlateChart ref="HotPlateRef" />
            </div>
          </div>
          <div class="dataScreen-center">
            <div class="dataScreen-main-title">
              <span>年度平均温度对比</span>
              <img src="./images/dataScreen-title.png" alt="" />
            </div>
            <!-- chart区域 -->
            <div class="dataScreen-main-chart">
              <AnnualUseChart ref="AnnualUseRef" />
            </div>
          </div>
          <div class="dataScreen-bottom">
            <div class="dataScreen-main-title">
              <span>不同站点数据统计</span>
              <img src="./images/dataScreen-title.png" alt="" />
            </div>
            <!-- chart区域 -->
            <div class="dataScreen-main-chart">
              <PlatformSourceChart ref="PlatformSourceRef" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="dataScreen">
import { ref, Ref, onMounted, onBeforeUnmount } from "vue";
import { HOME_URL } from "@/config";
import { randomNum } from "@/utils";
import { useRouter } from "vue-router";
import { useTime } from "@/hooks/useTime";
import { ECharts } from "echarts";
import mapChart from "./components/chinaMapChart.vue";
import AnnualUseChart from "./components/AnnualUseChart.vue";
import HotPlateChart from "./components/HotPlateChart.vue";
import OverNext30Chart from "./components/EverNext30Chart.vue";
import PlatformSourceChart from "./components/PlatformSourceChart.vue";
import RealTimeRainfullChart from "./components/RealTimeRainfullChart.vue";
import WindDataVisualChart from "./components/WindDataVisual.vue";
import SoilDataVisual from "@/views/dataScreen/components/SoilDataVisual.vue";

const router = useRouter();
const dataScreenRef = ref<HTMLElement | null>(null);

onMounted(() => {
  // 初始化时为外层盒子加上缩放属性，防止刷新界面时就已经缩放
  if (dataScreenRef.value) {
    dataScreenRef.value.style.transform = `scale(${getScale()}) translate(-50%, -50%)`;
    dataScreenRef.value.style.width = `1920px`;
    dataScreenRef.value.style.height = `1080px`;
  }
  // 初始化 echarts
  initCharts();
  // 为浏览器绑定事件
  window.addEventListener("resize", resize);
});

// 根据浏览器大小推断缩放比例
const getScale = (width = 1920, height = 1080) => {
  let ww = window.innerWidth / width;
  let wh = window.innerHeight / height;
  return ww < wh ? ww : wh;
};

// 监听浏览器 resize 事件
const resize = () => {
  if (dataScreenRef.value) {
    dataScreenRef.value.style.transform = `scale(${getScale()}) translate(-50%, -50%)`;
  }
  // 使用了 scale 的echarts其实不需要需要重新计算缩放比例
  Object.values(dataScreen).forEach(chart => {
    chart && chart.resize();
  });
};

// 声明echarts实例
interface ChartProps {
  [key: string]: ECharts | null;
}

const dataScreen: ChartProps = {
  chart1: null,
  chart2: null,
  chart3: null,
  chart4: null,
  chart5: null,
  chart6: null,
  chart7: null,
  mapChart: null
};

// 获取子组件的ref
interface ChartExpose {
  initChart: (params: any) => ECharts;
}

const RealTimeRainfullRef = ref<ChartExpose>();
const AnnualUseRef = ref<ChartExpose>();
const SoilDataVisualRef = ref<ChartExpose>();
const HotPlateRef = ref<ChartExpose>();
const OverNext30Ref = ref<ChartExpose>();
const PlatformSourceRef = ref<ChartExpose>();
const MapChartRef = ref<ChartExpose>();

// 初始化 charts参数
let hotData = [
  {
    value: 79,
    name: "设备1",
    percentage: "80%",
    maxValue: 100
  },
  {
    value: 59,
    name: "设备2",
    percentage: "60%",
    maxValue: 100
  },
  {
    value: 49,
    name: "设备3",
    percentage: "50%",
    maxValue: 100
  },
  {
    value: 39,
    name: "设备4",
    percentage: "40%",
    maxValue: 100
  },
  {
    value: 29,
    name: "设备5",
    percentage: "30%",
    maxValue: 100
  }
];
let platFromData = [
  {
    value: 40,
    name: "武功猕猴桃试验站",
    percentage: "40%"
  },
  {
    value: 10,
    name: "泾阳蔬菜示范站",
    percentage: "10%"
  },
  {
    value: 20,
    name: "临渭葡萄研究所",
    percentage: "20%"
  },
  {
    value: 30,
    name: "其他站点",
    percentage: "30%"
  }
];
let soilData = {
  xAxisData: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  conductivityData: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
  humidityData: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
  temperatureData: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
};
let annualData = [
  {
    label: new Date().getFullYear() - 2 + "年",
    value: ["18", "9", "12", "10", "3", "10", "8", "40", "20", "51", "35", "18"]
  },
  {
    label: new Date().getFullYear() - 1 + "年",
    value: ["11", "30", "36", "16", "38", "12", "32", "15", "35", "47", "15", "22"]
  },
  {
    label: new Date().getFullYear() + "年",
    value: ["34", "25", "11", "9", "6", "12", "23", "24", "28", "42", "31", "15"]
  }
];
let mapData = [
  { name: "北京", value: 100 },
  { name: "上海", value: 50 }
];

// 初始化 echarts
const initCharts = (): void => {
  dataScreen.chart1 = RealTimeRainfullRef.value?.initChart(0.5) as ECharts;
  dataScreen.chart2 = SoilDataVisualRef.value?.initChart(soilData) as ECharts;
  dataScreen.chart3 = AnnualUseRef.value?.initChart({
    data: annualData,
    unit: annualData.map(val => val.label),
    columns: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
    colors: ["#FFA600", "#007AFE", "#FF4B7A"]
  }) as ECharts;
  dataScreen.chart4 = HotPlateRef.value?.initChart({
    data: hotData,
    colors: ["#1089E7", "#F57474", "#56D0E3", "#F8B448", "#8B78F6"]
  }) as ECharts;
  dataScreen.chart6 = OverNext30Ref.value?.initChart({
    unit: ["温度"],
    data: new Array(30).fill("").map(val => {
      val = randomNum(19, 36);
      return val;
    })
  }) as ECharts;
  dataScreen.chart7 = PlatformSourceRef.value?.initChart({
    data: platFromData,
    colors: ["#078dbc", "#6ad40b", "#6172fc", "#1786ff", "#ffbe2f", "#4dc89d", "#b797df", "#ffd3aa"]
  }) as ECharts;
  dataScreen.mapChart = MapChartRef.value?.initChart(mapData) as ECharts;
};

// 获取当前时间
const { nowTime } = useTime();
let timer: NodeJS.Timer | null = null;
let time: Ref<string> = ref(nowTime.value);
timer = setInterval(() => {
  time.value = useTime().nowTime.value;
}, 1000);

// 销毁时触发
onBeforeUnmount(() => {
  window.removeEventListener("resize", resize);
  clearInterval(timer!);
  Object.values(dataScreen).forEach(val => val?.dispose());
});
</script>
<style lang="scss" scoped>
@import "./index.scss";
</style>
