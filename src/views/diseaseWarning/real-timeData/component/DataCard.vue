<template>
  <div class="data-card">
    <el-card :header="props.item.name" shadow="hover">
      <!-- 数据内容 -->
      <div class="data-content">
        <p>{{ props.item.value }} {{ props.item.unit }}</p>
        <p v-if="props.item.error" class="error-message">{{ props.item.errorMsg }}</p>
      </div>
    </el-card>
  </div>
</template>
<script setup lang="ts">
import { DataHandle } from "@/api/interface";

const props = defineProps({
  item: {
    type: Object as () => DataHandle.ResRealDeviceData, // 指定 item 的类型为 DeviceData 接口
    required: true
  }
});
</script>
<style scoped lang="scss">
.data-card {
  margin: 10px;
  display: inline-block;
  width: 280px;

  .el-card {
    margin: 10px;
    border-radius: 20px;
    border-color: #c0c4cc;

    &:hover {
      transform: translateY(-0.5rem);
    }
  }

  .data-content {
    padding: 10px;
    font-size: 18px;
    color: #1890ff;
    font-weight: bold;
  }

  .error-message {
    color: red;
  }
}
</style>
