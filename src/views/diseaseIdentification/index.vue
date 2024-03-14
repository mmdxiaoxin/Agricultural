<template>
  <el-form v-model="plantForm" class="diseaseIdentify-container card">
    <div class="diseaseIdentify-container-left card">
      <!--  模型选择    -->
      <div class="l1">
        <h3>模型选择</h3>
        <el-form-item>
          <el-select v-model="modelValue" placeholder="Select" size="large" style="width: 240px">
            <el-option v-for="item in modelOption" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
      </div>
      <!--  光谱处理    -->
      <div class="l2">
        <h3>光谱处理(预处理)</h3>
        <el-form-item>
          <el-radio-group v-model="spectrumRadio" class="l2-item-group">
            <el-popover
              v-for="option in preprocessingOption"
              :key="option.value"
              trigger="hover"
              placement="top-start"
              :content="option.description"
            >
              <template #reference>
                <el-radio :label="option.label" border class="l2-items" />
              </template>
            </el-popover>
          </el-radio-group>
        </el-form-item>
      </div>
      <!-- 文件上传     -->
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
        <el-tab-pane label="模型处理结果" name="handle" class="result-panel">
          <el-image
            style="width: 250px; height: 250px"
            v-for="(url, index) in srcList"
            :src="url"
            :key="index"
            :zoom-rate="1.2"
            :max-scale="7"
            :min-scale="0.2"
            :preview-src-list="srcList"
            :initial-index="0"
            fit="cover"
          >
            <template #error>
              <div class="image-slot">
                <el-icon><icon-picture />加载失败</el-icon>
              </div>
            </template>
          </el-image>
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

// 测试图片
const srcList = [
  "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
  "https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg",
  "https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg",
  "https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg"
];

//测试模型选项
const modelOption = [
  { value: "1", label: "模型1" },
  { value: "2", label: "模型2" },
  { value: "3", label: "模型3" },
  { value: "4", label: "模型4" }
];

//测试预处理函数
const preprocessingOption = [
  { value: "1", label: "NONE", description: "什么都不做" },
  { value: "2", label: "MMS", description: "最大最小值归一化" },
  { value: "3", label: "SS", description: "标准差标准化" },
  { value: "4", label: "CT", description: "均值中心化" },
  { value: "5", label: "SNV", description: "标准正态变换" },
  { value: "6", label: "MA", description: "移动平均平滑" },
  { value: "7", label: "SG", description: "Savitzky-Golay平滑滤波" },
  { value: "8", label: "D1", description: "一阶导数" },
  { value: "9", label: "D2", description: "二阶导数" },
  { value: "9", label: "DT", description: "趋势校正(DT)" },
  { value: "9", label: "DT2", description: "改进的趋势校正" }
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
        align-content: flex-start;

        .l2-items {
          width: 20%;
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

    .result-panel {
      display: flex;
      flex-wrap: wrap;
      flex-direction: row;
      justify-content: space-between;
    }
  }
}
</style>
