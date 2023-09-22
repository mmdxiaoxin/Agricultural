<template>
  <div class="temperature-panel">
    <div class="air-temperature card">
      <div class="title">空气温度</div>
      <div class="value">{{ props.airTemperatureData }} ℃</div>
    </div>
    <div class="temperature-line-chart">
      <BarChart
        v-if="chartData.length > 0"
        chart-item1-text="空气"
        chart-item2-text="土壤"
        chart-title="温度统计"
        v-model:bar-chart-data="chartData"
      />
    </div>
    <div class="soil-temperature card">
      <div class="title">土壤温度</div>
      <div class="value">{{ props.soilTemperatureData }} ℃</div>
    </div>
  </div>
</template>

<script setup lang="ts" name="TemperaturePanel">
import BarChart, { DataItem } from "@/views/diseaseWarning/real-timeData/component/BarChart.vue";
import { onMounted, ref, watch } from "vue";
import { getCollect } from "@/api/modules/dataHandle";
import { DataHandle } from "@/api/interface";

const props = defineProps({
  airTemperatureData: {
    type: Number,
    require: true
  },
  soilTemperatureData: {
    type: Number,
    require: true
  },
  lastTime: {
    type: String
  },
  deviceId: {
    type: String,
    default: "39"
  }
});

const getTemperatureData = async (deviceId: string) => {
  const params: DataHandle.ReqCollectMethod = { deviceId: deviceId, hour: "11", columns: "AA1,AH1,createTime" };
  const { data } = await getCollect(params);
  // 转换成 DataItem 数组格式
  const result: DataItem = [];
  for (const item of data) {
    const time = item.createTime;
    const data1 = parseFloat(item.AA1);
    const data2 = parseFloat(item.AH1);
    result.push({ time, chartData: { data1, data2 } });
  }
  return result;
};

const chartData = ref<DataItem>([]); // 初始化为空数组

onMounted(async () => {
  chartData.value = await getTemperatureData(props.deviceId);
});

watch(
  () => props.deviceId,
  async newDeviceId => {
    chartData.value = await getTemperatureData(newDeviceId);
  }
);
</script>

<style scoped lang="scss">
@import "../index";
.temperature-panel {
  display: grid;
  grid-template-columns: 3fr 1fr;
  grid-template-rows: 1fr 1fr;
  grid-gap: 5px;
  height: 100%;

  .air-temperature,
  .temperature-line-chart,
  .soil-temperature {
    height: 100%;
    width: 100%;
  }

  .air-temperature {
    grid-column: 2/3;
    grid-row: 1/2;
  }

  .temperature-line-chart {
    grid-column: 1/2;
    grid-row: 1/3;
  }

  .soil-temperature {
    grid-column: 2/3;
    grid-row: 2/3;
  }
}
</style>
