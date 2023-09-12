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
    <div class="meteorological-information card">气象信息</div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const windSpeed = ref(0); // 风速
const windDirection = ref(0); // 风向
const lightIntensity = ref(0); //光照强度
// 模拟风速和风向数据的更新
const updateWindData = () => {
  // 假设从数据源获取风速和风向数据，这里使用随机数模拟更新
  windSpeed.value = parseFloat((Math.random() * 10).toFixed(2));
  windDirection.value = Math.floor(Math.random() * 360); // 随机生成风向（0到360度之间）
};

// 模拟数据实时更新
setInterval(updateWindData, 5000); // 每5秒更新一次数据
</script>

<style scoped lang="scss">
.weather-container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  height: 100%;
  width: 100%;
  grid-gap: 5px;

  .wind-speed,
  .wind-direction,
  .light-intensity {
    text-align: center;
    flex: 1;

    .title {
      font-size: 18px;
      color: #333;
      margin-bottom: 10px;
    }

    .value {
      font-size: 24px;
      color: #1890ff;
      font-weight: bold;
    }
  }

  .wind-speed {
    grid-column: 1/2;
    grid-row: 1/2;
  }
  .wind-direction {
    grid-column: 2/3;
    grid-row: 1/2;
  }
  .light-intensity {
    grid-column: 3/4;
    grid-row: 1/2;
  }
  .meteorological-information {
    grid-column: 1/4;
    grid-row: 2/3;
  }
}
</style>
