<template>
  <div class="conductivity-panel">
    <div class="conductivity-chart">
      <LineChart chart-title="土壤EC" chart-unit="us" />
    </div>
    <div class="peak-value card">
      <div class="title">峰值</div>
      <div class="value">{{ peakValue }} us</div>
    </div>
    <div class="current-value card">
      <div class="title">当前值</div>
      <div class="value">{{ currentValue }} us</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import LineChart from "@/views/diseaseWarning/real-timeData/component/LineChart.vue";
import { ref } from "vue";

let peakValue = ref(34);
let currentValue = ref(14);
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

  .peak-value {
    grid-column: 2 / 3;
    grid-row: 1 / 2;
  }

  .current-value {
    grid-column: 2 / 3;
    grid-row: 2 / 3;
  }
}
</style>
