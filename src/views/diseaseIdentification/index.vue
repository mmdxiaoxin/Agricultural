<template>
  <div class="diseaseIdentify-container card">
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
        <div class="l3-title"><h3>文件上传</h3></div>
        <div class="l3-main">
          <el-upload
            ref="uploadRef"
            class="upload-demo"
            drag
            :file-list="fileList"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            :auto-upload="false"
          >
            <el-icon class="el-icon--upload"><upload-filled /></el-icon>
            <div class="el-upload__text">Drop file here or <em>click to upload</em></div>
            <template #tip>
              <div class="el-upload__tip">jpg/png files with a size less than 500kb</div>
            </template>
          </el-upload>
          <el-button type="success" @click="handleSubmit">提交</el-button>
        </div>
      </div>
    </div>
    <!--  模型处理结果   -->
    <div class="diseaseIdentify-container-right card">
      <!--  处理结果   -->
      <el-tabs v-model="activeName" type="card">
        <template #addIcon>
          <el-icon><Select /></el-icon>
        </template>
        <el-tab-pane label="模型处理结果" name="handle" class="result-panel">
          <el-card class="r1-card" shadow="hover" v-for="(item, index) in modelProcessingResults" :key="index">
            <template #header>
              <div class="r1-card-header">{{ item.description }}</div>
            </template>
            <el-image
              class="r1-card-image"
              :src="item.src"
              :zoom-rate="1.2"
              :max-scale="7"
              :min-scale="0.2"
              :preview-src-list="modelProcessingResults.map(item => item.src)"
              :initial-index="index"
              fit="cover"
            >
              <template #error>
                <div class="image-slot">
                  <el-icon><icon-picture /></el-icon>
                </div>
              </template>
            </el-image>
          </el-card>
        </el-tab-pane>
        <el-tab-pane label="模型诊断结果" name="diagnosis">
          <!--   诊断结果     -->
          待更新。。。
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script setup lang="ts" name="diseaseIdentification">
import { ref } from "vue";
import { Select } from "@element-plus/icons-vue";
import type { UploadFile, UploadFiles, UploadProps } from "element-plus";
import { UploadFilled } from "@element-plus/icons-vue";
import { ElMessageBox } from "element-plus";
import { Picture as IconPicture } from "@element-plus/icons-vue";
import type { UploadInstance } from "element-plus";

// 测试图片
const modelProcessingResults = [
  { src: "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg", description: "RGB还原" },
  { src: "https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg", description: "图像分割" },
  { src: "https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg", description: "去除背景" },
  { src: "https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg0", description: "测试内容" }
];

//测试模型选项
const modelOption = [
  { value: "1", label: "Net2_59" },
  { value: "2", label: "Res_RGB" }
];

//预处理函数配置
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
//标签页
const activeName = ref("handle");

//模型选择
const modelValue = ref("");

//光谱处理
const spectrumRadio = ref("");

//文件上传
const uploadRef = ref<UploadInstance>();
const fileList = ref([]);

const handleRemove: UploadProps["onRemove"] = (file, uploadFiles) => {
  console.log(file, uploadFiles);
};

const handleSubmit = () => {
  uploadRef.value!.submit();
};

const beforeRemove: UploadProps["beforeRemove"] = (uploadFile: UploadFile, uploadFiles: UploadFiles) => {
  console.log(uploadFile, uploadFiles);
  return ElMessageBox.confirm(`确定取消上传 ${uploadFile.name} ?`).then(
    () => true,
    () => false
  );
};
</script>
<style scoped lang="scss">
@import "./index";
</style>
