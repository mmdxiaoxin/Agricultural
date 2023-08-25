<template>
  <div class="historicalData-box card">
    <div class="top-box">
      <div class="top-title">历史数据</div>
      <el-tabs v-model="tabActive" class="demo-tabs">
        <el-tab-pane v-for="item in tab" :key="item.name" :label="item.label" :name="item.name"></el-tab-pane>
      </el-tabs>
      <div class="dashboard">
        <TestEcharts />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import TestEcharts from "@/views/diseaseWarning/historicalData/component/TestEcharts.vue";

const tabActive = ref(1);
const tab = [
  { label: "近24小时", name: 1 },
  { label: "近七日", name: 2 },
  { label: "近一月", name: 3 },
  { label: "近三月", name: 4 },
  { label: "近半年", name: 5 },
  { label: "近一年", name: 6 }
];
</script>

<style scoped lang="scss">
.historicalData-box {
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
