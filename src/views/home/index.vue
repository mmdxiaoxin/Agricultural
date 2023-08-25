<template>
  <div class="home card">
    <img class="home-bg" src="@/assets/images/welcome.svg" alt="welcome" />
    <div class="features">
      <div class="feature">
        <router-link to="/deviceManagement/sensorDataView" class="card">
          <h2>物联网设备管理模块</h2>
          <p>根据商户号和设备序列号，完成设备的增删改查，查看设备在线状态和当前/历史数据</p>
        </router-link>
      </div>
      <div class="feature">
        <router-link to="/modelApplication" class="card">
          <h2>模型应用模块</h2>
          <p>将模型搭载在服务器上，实现前后端数据交互和模型返回结果，应用于数据分析和预测</p>
        </router-link>
      </div>
      <div class="feature">
        <router-link to="/diseaseWarning/dataVisualization" class="card">
          <h2>病害预警模块</h2>
          <p>读取历史和实时数据，实现可视化展示和病虫害预警，提供防治信息和建议</p>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="home"></script>

<style scoped lang="scss">
@import "./index.scss";
</style>
