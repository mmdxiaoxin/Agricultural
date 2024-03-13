<template>
  <el-form v-model="plantForm" class="diseaseIdentify-container card">
    <div class="diseaseIdentify-container-left card">
      <div class="l1">
        <h3>模型选择</h3>
        <el-form-item>
          <el-select v-model="modelValue" placeholder="Select" size="large" style="width: 240px">
            <el-option v-for="item in modelOption" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
      </div>
      <div class="l2">
        <h3>光谱处理(预处理)</h3>
        <el-form-item>
          <el-radio-group v-model="spectrumRadio" class="l2-item-group">
            <el-radio v-for="option in preprocessingOption" :key="option.value" :label="option.label" border class="l2-items" />
          </el-radio-group>
        </el-form-item>
      </div>
      <div class="l3">
        <h3>文件上传</h3>
        <el-form-item prop="plantImage">
          <UploadImg v-model:image-url="plantForm.plantImage" width="235px" height="135px" :file-size="3">
            <template #empty>
              <el-icon><Picture /></el-icon>
              <span>请上传图像</span>
            </template>
            <template #tip> 图像大小不能超过 3M </template>
          </UploadImg>
        </el-form-item>
        <el-form-item>
          <el-button> 取消 </el-button>
          <el-button type="primary">提交</el-button>
        </el-form-item>
      </div>
    </div>
    <div class="diseaseIdentify-container-right card">
      <el-tabs v-model="activeName" type="card" class="demo-tabs" @tab-click="handleClick">
        <template #addIcon>
          <el-icon><Select /></el-icon>
        </template>
        <el-tab-pane label="模型处理结果" name="handle">
          <el-image-viewer v-if="imgViewVisible" :url-list="[plantForm.plantImage]" @close="imgViewVisible = false" />
          <el-image
            v-else
            style="width: 100%; height: 100%"
            :src="plantForm.plantImage"
            fit="contain"
            @click="imgViewVisible = true"
          />
        </el-tab-pane>
        <el-tab-pane label="模型诊断结果" name="diagnosis">待更新。。。</el-tab-pane>
      </el-tabs>
    </div>
  </el-form>
</template>

<script setup lang="ts" name="diseaseIdentification">
import { ref } from "vue";
import { Select } from "@element-plus/icons-vue";
import type { TabsPaneContext } from "element-plus";
import UploadImg from "@/components/Upload/Img.vue";

const modelOption = [
  { value: "1", label: "模型1" },
  { value: "2", label: "模型2" },
  { value: "3", label: "模型3" },
  { value: "4", label: "模型4" }
];
const preprocessingOption = [
  { value: "1", label: "模型1" },
  { value: "2", label: "模型2" },
  { value: "3", label: "模型3" },
  { value: "4", label: "模型4" }
];
const activeName = ref("handle");
const modelValue = ref("");
const spectrumRadio = ref("");
const plantForm = ref({ plantImage: "" });
const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event);
};
</script>
<style scoped lang="scss">
.diseaseIdentify-container {
  display: flex;
  height: 100%;

  .diseaseIdentify-container-left {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    width: 35%;

    .l1 {
      height: 100px;
    }

    .l2 {
      min-height: 200px;

      .l2-item-group {
        height: 80%;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-between;
        align-content: flex-start;

        .l2-items {
          margin-bottom: 20px;
        }
      }
    }

    .l3 {
      height: 100px;
    }
  }

  .diseaseIdentify-container-right {
    width: 64%;
    margin-left: 1%;
  }
}
</style>
