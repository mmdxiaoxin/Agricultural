<template>
  <div class="soil-data-visual-chart">
    <div class="soil-data">
      <div class="soil-temperature card">
        <div class="data-title">温度</div>
        <div class="data-value">{{ props.soilTemperature }} ℃</div>
      </div>
      <div class="soil-humidity card">
        <div class="data-title">湿度</div>
        <div class="data-value">{{ props.soilHumidity }} RH%</div>
      </div>
      <div class="soil-conductivity card">
        <div class="data-title">导电率</div>
        <div class="data-value">{{ props.soilConductivity }} us</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
const props = defineProps(["soilTemperature", "soilHumidity", "soilConductivity"]);
</script>

<style scoped lang="scss">
.soil-data-visual-chart {
  padding: 20px;
  width: 89%;
  height: 84%;

  .soil-data {
    display: flex;
    justify-content: space-between;

    .soil-temperature,
    .soil-conductivity,
    .soil-humidity {
      text-align: center;
      padding: 10px;
      background-color: #11144d;
      width: 30%;
      .data-title {
        font-size: 20px;
        color: #eee7e7;
      }

      .data-value {
        font-size: 20px;
        font-weight: bold;
        color: #1890ff;
      }
    }
  }
}
</style>
