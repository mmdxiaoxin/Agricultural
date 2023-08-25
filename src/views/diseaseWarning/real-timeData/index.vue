<template>
  <div class="real-timeData-box">
    <div class="top-box">
      <div class="top-title">当前数据</div>
      <div class="dashboard">
        <TemperatureGaugeChart type="air" />
        <TemperatureGaugeChart type="soil" />
      </div>
    </div>
  </div>
</template>

<script setup name="real-timeData">
import TemperatureGaugeChart from "@/views/diseaseWarning/real-timeData/component/TemperatureGaugeChart.vue";
</script>

<style scoped lang="scss">
.real-timeData-box {
  .top-box {
    margin-bottom: 1rem;
    padding-bottom: 1rem;
    padding-left: 1.5rem;
    padding-right: 1.5rem;
    background-color: white;
    .top-title {
      font-size: 24px;
      font-weight: bold;
      margin-bottom: 0.5rem;
      color: #333;
    }
  }
  .dashboard {
    display: flex;
    flex-wrap: wrap;
  }
}
</style>
