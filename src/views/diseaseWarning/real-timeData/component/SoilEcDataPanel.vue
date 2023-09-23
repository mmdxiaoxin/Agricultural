<template>
  <div class="conductivity-panel">
    <div class="conductivity-chart">
      <SoilEcChart chart-title="土壤EC" v-if="chartData.length > 0" chart-unit="us" v-model:soil-ec-chart-data="chartData" />
    </div>
    <div class="current-value card">
      <div class="title">当前EC</div>
      <div class="value">{{ props.soilEcData }} us</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import SoilEcChart, { DataItem } from "@/views/diseaseWarning/real-timeData/component/SoilEcChart.vue";
import { DataHandle } from "@/api/interface";
import { getCollect } from "@/api/modules/dataHandle";
import { onMounted, ref, watch } from "vue";

const props = defineProps({
  soilEcData: {
    type: Number,
    default: NaN
  },
  deviceId: {
    type: String,
    default: "39"
  }
});

const getSoilECData = async (deviceId: string) => {
  // 44号设备和41号设备没有土壤EC数据
  if (deviceId === "44" || deviceId === "41") {
    return [];
  }
  const params: DataHandle.ReqCollectMethod = { deviceId: deviceId, hour: "11", columns: "AJ1,createTime" };
  const { data } = await getCollect(params);
  const result: DataItem[] = [];
  data.forEach(item => {
    result.push({ time: item.createTime, chartData: item.AJ1 });
  });
  return result.reverse();
};

const chartData = ref<DataItem[]>([]); // 初始化为空数组

onMounted(async () => {
  chartData.value = await getSoilECData(props.deviceId);
  console.log(chartData.value);
});

watch(
  () => props.deviceId,
  async newDeviceId => {
    chartData.value = await getSoilECData(newDeviceId);
    console.log(chartData.value);
  }
);
</script>

<style scoped lang="scss">
@import "../index";
.conductivity-panel {
  display: grid;
  grid-template-columns: 3fr 1fr;
  grid-template-rows: repeat(2, 1fr);
  grid-gap: 5px;
  height: 100%;

  .conductivity-chart {
    grid-column: 1 / 2;
    grid-row: 1 / 3;
  }

  .current-value {
    grid-column: 2 / 3;
    grid-row: 1 / 3;
  }
}
</style>
