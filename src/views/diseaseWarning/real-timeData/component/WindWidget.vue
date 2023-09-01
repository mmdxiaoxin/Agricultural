<template>
  <div class="wind-widget card">
    <div class="wind-speed">
      <div class="title">风速</div>
      <div class="value">{{ windSpeed }} m/s</div>
    </div>
    <div class="wind-direction">
      <div class="title">风向</div>
      <div class="value">{{ windDirection }} °</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const windSpeed = ref(0); // 风速
const windDirection = ref(0); // 风向

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
.wind-widget {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  padding: 20px;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: scale(1.02);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  .wind-speed,
  .wind-direction {
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
}
</style>
