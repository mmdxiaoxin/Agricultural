<template>
  <div class="statistic-box">
    <el-row>
      <el-col :span="6">
        <el-statistic title="站点记录总数" :value="props.totalInfoCount" />
      </el-col>
      <el-col :span="6">
        <el-statistic title="站点设备数目" :value="props.deviceCount" />
      </el-col>
      <el-col :span="6">
        <el-statistic title="今日设备记录" :value="props.dailyInfoCount">
          <template #suffix>
            <el-icon style="vertical-align: -0.125em">
              <Clock />
            </el-icon>
          </template>
        </el-statistic>
      </el-col>
      <el-col :span="6">
        <el-statistic title="当前在线设备" :value="props.currentDeviceCount">
          <template #suffix>
            <el-icon style="vertical-align: -0.125em">
              <Connection />
            </el-icon>
          </template>
        </el-statistic>
      </el-col>
    </el-row>
  </div>
</template>
<script setup lang="ts">
import { Connection, Clock } from "@element-plus/icons-vue";
const props = defineProps({
  totalInfoCount: {
    type: Number,
    default: 2181
  },
  deviceCount: {
    type: Number,
    default: 1
  },
  dailyInfoCount: {
    type: Number,
    default: 18
  },
  currentDeviceCount: {
    type: Number,
    default: 1
  }
});
</script>
<style scoped lang="scss">
.statistic-box {
  margin-bottom: 20px;
}
</style>
