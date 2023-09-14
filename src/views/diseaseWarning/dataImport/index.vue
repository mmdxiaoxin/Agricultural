<template>
  <div class="card content-box">
    <span class="text">批量添加数据 🍓🍇🍈🍉</span>
    <el-button type="primary" :icon="Upload" @click="batchAdd"> 批量添加数据</el-button>
    <ImportExcel ref="importRef" />
  </div>
</template>

<script setup lang="ts" name="dataImport">
import { ref } from "vue";
import { exportUserInfo, BatchAddData } from "@/api/modules/user";
import { Upload } from "@element-plus/icons-vue";
import ImportExcel from "@/components/ImportExcel/index.vue";

const importRef = ref();
const batchAdd = () => {
  let params = {
    title: "数据",
    tempApi: exportUserInfo,
    importApi: BatchAddData
  };
  importRef.value.acceptParams(params);
};
</script>

<style scoped lang="scss"></style>
