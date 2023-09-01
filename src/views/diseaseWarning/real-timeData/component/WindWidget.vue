<template>
  <div class="wind-widget card">
    <div class="wind-top">
      <div class="wind-speed">
        <div class="title">风速</div>
        <div class="value">{{ windSpeed }} m/s</div>
      </div>
      <div class="wind-direction">
        <div class="title">风向</div>
        <div class="value">{{ windDirection }} °</div>
      </div>
    </div>
    <!-- 降雨量组件 -->
    <div class="rain-fall">
      <Rainfall chart-data="31" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Rainfall from "@/views/diseaseWarning/real-timeData/component/Rainfall.vue";

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
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-start;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
  transition: all 0.3s ease;
  cursor: pointer;
  height: 300px;
  width: 300px;
  margin: 20px;
  &:hover {
    transform: scale(1.02);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  .wind-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-bottom: 20px;
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

  .rain-fall {
    width: 100%;
    display: flex;
    justify-content: center;
  }
}
</style>
