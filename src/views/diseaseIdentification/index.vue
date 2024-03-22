<template>
  <div class="disease-identification card">
    <div class="left-panel card">
      <!--  模型选择    -->
      <div class="l_panel-model">
        <h3>模型选择</h3>
        <el-form-item>
          <el-select v-model="modelValue" placeholder="Select" size="large" style="width: 240px" @change="changeSelector">
            <el-option v-for="item in modelOption" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
      </div>
      <!--  光谱处理    -->
      <div class="l_panel-spectrum">
        <h3>光谱处理(预处理)</h3>
        <el-form-item>
          <el-radio-group v-model="spectrumRadio" class="spectrum-group" @change="changeRadio($event)">
            <el-popover
              v-for="option in preprocessingOption"
              :key="option.value"
              trigger="hover"
              placement="top-start"
              :content="option.description"
            >
              <template #reference>
                <el-radio :label="option.label" border class="spectrum-items" />
              </template>
            </el-popover>
          </el-radio-group>
        </el-form-item>
      </div>
      <!-- 文件上传     -->
      <div class="l_panel-upload">
        <div class="l3-title"><h3>文件上传</h3></div>
        <div class="l3-main">
          <el-upload
            ref="uploadRef"
            drag
            :limit="1"
            :file-list="fileList"
            :on-exceed="handleExceed"
            :on-success="handleSuccess"
            :http-request="uploadFile"
            :auto-upload="false"
          >
            <el-icon class="el-icon--upload">
              <upload-filled />
            </el-icon>
            <div class="el-upload__text">将文件拖到此处 or <em>单击以上传</em></div>
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
      <el-tabs v-model="activeName" type="card" class="r_panel" tab-position="top">
        <el-tab-pane label="模型处理结果" name="handle" class="r_panel-result">
          <el-card class="result-card" shadow="hover" v-for="(item, index) in modelProcessingResults" :key="index">
            <template #header>
              <div class="card-header">{{ item.description }}</div>
            </template>
            <el-image
              class="card-content"
              :src="item.src"
              :zoom-rate="1.2"
              :max-scale="7"
              :min-scale="0.2"
              :preview-src-list="modelProcessingResults.map(item => item.src)"
              :initial-index="index"
              fit="cover"
            >
              <template #error>
                <div class="card-slot">
                  <el-icon>
                    <icon-picture />
                  </el-icon>
                </div>
              </template>
            </el-image>
          </el-card>
        </el-tab-pane>
        <el-tab-pane label="模型诊断结果" name="diagnosis" class="r_panel-diagnosis">
          <!--   诊断结果     -->
          <div class="diagnosis-chart">
            <ProbabilityPieChart :data="probabilityData" class="diagnosis" />
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script setup lang="ts" name="diseaseIdentification">
import { ref } from "vue";
import type { UploadProps, UploadRawFile, UploadUserFile } from "element-plus";
import { UploadFilled } from "@element-plus/icons-vue";
import { ElMessage, ElMessageBox, genFileId } from "element-plus";
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
  fileList.value.forEach(item => {
    if (item.status === "success") {
      item.status = "ready";
    }
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
  fileList.value.forEach(item => {
    if (item.status === "success") {
      item.status = "ready";
    }
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
const handleSuccess: UploadProps["onSuccess"] = (response, uploadFile, uploadFiles) => {
  ElMessage.success(`上传成功`);
};

//文件上传
const uploadFile = async (files: UploadFileOption) => {
  let formData = new FormData();
  formData.append("input_image", files.file);
  try {
    const { data } = await uploadTheFileToBePredicted(formData);
    fileList.value.push(files.file);
    probabilityData.value = data.predictions;
  } catch (e) {
    ElMessage.error("上传失败");
  }
};

const handleExceed: UploadProps["onExceed"] = files => {
  uploadRef.value!.clearFiles();
  const file = files[0] as UploadRawFile;
  file.uid = genFileId();
  uploadRef.value!.handleStart(file);
};

const handleSubmit = () => {
  uploadRef.value!.submit();
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const beforeRemove: UploadProps["beforeRemove"] = (uploadFile, uploadFiles) => {
  return ElMessageBox.confirm(`确定删除记录 ${uploadFile.name} ?`).then(
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
