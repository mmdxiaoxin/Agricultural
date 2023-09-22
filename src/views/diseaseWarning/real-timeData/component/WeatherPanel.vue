<template>
  <div class="weather-container">
    <div class="wind-speed card">
      <div class="title">风速</div>
      <div class="value">{{ props.windSpeedData }} m/s</div>
    </div>
    <div class="wind-direction card">
      <div class="title">风向</div>
      <div class="value">{{ props.windDirectionData }} °</div>
    </div>
    <div class="light-intensity card">
      <div class="title">光照强度</div>
      <div class="value">{{ props.lightIntensityData }} KLux</div>
    </div>
    <div class="meteorological-information card">
      <div class="title">大气压强</div>
      <div class="value">{{ props.atmosphericPressureData }} hPa</div>
    </div>
    <div class="CO2-data card">
      <div class="title">CO2浓度</div>
      <div class="value">{{ props.co2Data }} ppm</div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  windSpeedData: {
    type: Number,
    default: NaN
  },
  windDirectionData: {
    type: Number,
    default: NaN
  },
  lightIntensityData: {
    type: Number,
    default: NaN
  },
  atmosphericPressureData: {
    type: Number,
    default: NaN
  },
  co2Data: {
    type: Number,
    default: NaN
  }
});
</script>

<style scoped lang="scss">
@import "../index";
.weather-container {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: 1fr 1fr;
  height: 100%;
  width: 100%;
  grid-gap: 5px;

  .wind-speed {
    grid-column: 1/3;
    grid-row: 1/2;
  }
  .wind-direction {
    grid-column: 3/5;
    grid-row: 1/2;
  }
  .light-intensity {
    grid-column: 5/7;
    grid-row: 1/2;
  }
  .meteorological-information {
    grid-column: 1/4;
    grid-row: 2/3;
  }
  .CO2-data {
    grid-column: 4/7;
    grid-row: 2/3;
  }
}
</style>
