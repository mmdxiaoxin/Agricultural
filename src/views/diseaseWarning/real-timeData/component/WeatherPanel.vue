<template>
  <div class="weather-container">
    <div class="wind-speed card">
      <div class="title">风速</div>
      <div class="value">{{ windSpeed }} m/s</div>
    </div>
    <div class="wind-direction card">
      <div class="title">风向</div>
      <div class="value">{{ windDirection }} °</div>
    </div>
    <div class="light-intensity card">
      <div class="title">光照强度</div>
      <div class="value">{{ lightIntensity }} KLux</div>
    </div>
    <div class="meteorological-information card">
      <div class="title">大气压强</div>
      <div class="value">{{ atmosphericPressure }} hPa</div>
    </div>
    <div class="co2PPM card">
      <div class="title">CO2浓度</div>
      <div class="value">{{ atmosphericPressure }} ppm</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const windSpeed = ref(0); // 风速
const windDirection = ref(0); // 风向
const lightIntensity = ref(0); //光照强度
const atmosphericPressure = ref(0); //大气压强
// 模拟风速和风向数据的更新
const updateWindData = () => {
  // 假设从数据源获取风速和风向数据，这里使用随机数模拟更新
  windSpeed.value = parseFloat((Math.random() * 10).toFixed(2));
  windDirection.value = Math.floor(Math.random() * 360); // 随机生成风向（0到360度之间）
  lightIntensity.value = parseFloat((Math.random() * 10).toFixed(2));
  atmosphericPressure.value = parseFloat((Math.random() * 10).toFixed(2));
};

// 模拟数据实时更新
setInterval(updateWindData, 5000); // 每5秒更新一次数据
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
  .co2PPM {
    grid-column: 4/7;
    grid-row: 2/3;
  }
}
</style>
