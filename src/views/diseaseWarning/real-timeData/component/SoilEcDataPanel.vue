<template>
  <div class="conductivity-panel">
    <div class="conductivity-chart">
      <LineChart chart-title="土壤EC" chart-unit="us" />
    </div>
    <div class="current-value card">
      <div class="title">当前EC</div>
      <div class="value">{{ props.soilEcData }} us</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import LineChart from "@/views/diseaseWarning/real-timeData/component/LineChart.vue";

const props = defineProps({
  soilEcData: {
    type: Number,
    default: 0
  }
});
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
