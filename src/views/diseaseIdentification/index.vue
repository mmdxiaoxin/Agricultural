<template>
  <div class="disease-identification card">
    <div class="left-panel card">
      <!--  模型选择    -->
      <div class="l1">
        <h3>模型选择</h3>
        <el-form-item>
          <el-select v-model="modelValue" placeholder="Select" size="large" style="width: 240px" @change="changeSelector">
            <el-option v-for="item in modelOption" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
      </div>
      <!--  光谱处理    -->
      <div class="l2">
        <h3>光谱处理(预处理)</h3>
        <el-form-item>
          <el-radio-group v-model="spectrumRadio" class="l2-item-group" @change="changeRadio($event)">
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
            :on-success="handleSuccess"
            :http-request="uploadFile"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            :auto-upload="false"
          >
            <el-icon class="el-icon--upload">
              <upload-filled />
            </el-icon>
            <div class="el-upload__text">Drop file here or <em>click to upload</em></div>
            <template #tip>
              <div class="el-upload__tip">暂时只支持单文件上传</div>
            </template>
          </el-upload>
          <el-button type="success" @click="handleSubmit">提交</el-button>
        </div>
      </div>
    </div>
    <!--  模型处理结果   -->
    <div class="right-panel card">
      <!--  处理结果   -->
      <el-tabs v-model="activeName" type="card" class="r-panel">
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
                  <el-icon>
                    <icon-picture />
                  </el-icon>
                </div>
              </template>
            </el-image>
          </el-card>
        </el-tab-pane>
        <el-tab-pane label="模型诊断结果" name="diagnosis" class="diagnosis-panel">
          <!--   诊断结果     -->
          <ProbabilityPieChart :data="probabilityData" class="predict-result" />
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script setup lang="ts" name="diseaseIdentification">
import { ref } from "vue";
import { Select } from "@element-plus/icons-vue";
import type { UploadFile, UploadFiles, UploadProps, UploadUserFile } from "element-plus";
import { UploadFilled } from "@element-plus/icons-vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { Picture as IconPicture } from "@element-plus/icons-vue";
import type { UploadInstance } from "element-plus";
import { uploadTheFileToBePredicted } from "@/api/modules/upload";
import { modelOption, modelProcessingResults, preprocessingOption } from "@/views/diseaseIdentification/common";
import { selectMethod, selectModel } from "@/api/modules/predict";
import ProbabilityPieChart from "@/views/diseaseIdentification/components/ProbabilityPieChart.vue";

//标签页
const activeName = ref("handle");

//模型选择
const modelValue = ref("");
const changeSelector = async (value: any) => {
  await selectModel({ model: value })
    .then(() => {
      ElMessage.success("模型选择成功");
    })
    .catch(reason => {
      ElMessage.error(`模型选择失败, 失败原因${reason}`);
    });
};

//光谱处理
const spectrumRadio = ref("");
const changeRadio = async (value: any) => {
  console.log(probabilityData.value);
  await selectMethod({ method: value })
    .then(() => {
      ElMessage.success("预处理函数选择成功");
    })
    .catch(reason => {
      ElMessage.error(`选择失败败, 失败原因${reason}`);
    });
};

//文件上传
interface UploadFileOption {
  file: File;
}

const uploadRef = ref<UploadInstance>();
const fileList = ref<UploadUserFile[]>([]);

//文件上传成功
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const handleSuccess: UploadProps["onSuccess"] = (response, file, uploadFiles) => {
  ElMessageBox.alert(`上传成功: ${file.name}`);
};

//文件上传
const uploadFile = async (files: UploadFileOption) => {
  let formData = new FormData();
  formData.append("input_image", files.file);
  try {
    const { data } = await uploadTheFileToBePredicted(formData);
    console.log(data);
    fileList.value.push(files.file);
    probabilityData.value = data.predictions;
    console.log(probabilityData);
    ElMessage.success("上传成功");
    console.log(data);
  } catch (e) {
    ElMessage.error("上传失败");
    console.log(e);
  }
};

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

//模型处理结果
const probabilityData = ref();
</script>
<style scoped lang="scss">
@import "./index";
</style>
