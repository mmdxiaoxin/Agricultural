<template>
  <div class="humidity-panel">
    <div class="air-humidity card">
      <div class="title">空气湿度</div>
      <div class="value">{{ props.airHumidityData }} RH%</div>
    </div>
    <div class="humidity-line-chart">
      <BarChart
        v-if="chartData.length > 0"
        chart-item1-text="空气"
        chart-item2-text="土壤"
        chart-title="湿度统计"
        v-model:bar-chart-data="chartData"
      />
    </div>
    <div class="soil-humidity card">
      <div class="title">土壤湿度</div>
      <div class="value">{{ props.soilHumidityData }} VOL%</div>
    </div>
  </div>
</template>

<script setup lang="ts" name="TemperaturePanel">
import BarChart, { DataItem } from "@/views/diseaseWarning/real-timeData/component/BarChart.vue";
import { ref, onMounted, watch } from "vue";
import { DataHandle } from "@/api/interface";
import { getCollect } from "@/api/modules/dataHandle";

const props = defineProps({
  airHumidityData: {
    type: Number,
    require: true
  },
  soilHumidityData: {
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

const getHumidityData = async (deviceId: string) => {
  const params: DataHandle.ReqCollectMethod = { deviceId: deviceId, hour: "11", columns: "AB1,AI1,createTime" };
  const { data } = await getCollect(params);
  // 转换成 DataItem 数组格式
  const result: DataItem = [];
  for (const item of data) {
    const time = item.createTime;
    const data1 = parseFloat(item.AB1);
    const data2 = parseFloat(item.AI1);
    result.push({ time, chartData: { data1, data2 } });
  }
  return result;
};

const chartData = ref<DataItem>([]); // 初始化为空数组

onMounted(async () => {
  chartData.value = await getHumidityData(props.deviceId);
});

watch(
  () => props.deviceId,
  async newDeviceId => {
    chartData.value = await getHumidityData(newDeviceId);
  }
);
</script>

<style scoped lang="scss">
@import "../index";
.humidity-panel {
  display: grid;
  grid-template-columns: 3fr 1fr;
  grid-template-rows: 1fr 1fr;
  grid-gap: 5px;
  height: 100%;

  .air-humidity,
  .humidity-line-chart,
  .soil-humidity {
    height: 100%;
    width: 100%;
  }

  .air-humidity {
    grid-column: 2/3;
    grid-row: 1/2;
  }

  .humidity-line-chart {
    grid-column: 1/2;
    grid-row: 1/3;
  }

  .soil-humidity {
    grid-column: 2/3;
    grid-row: 2/3;
  }
}
</style>
