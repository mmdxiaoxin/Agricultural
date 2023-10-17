<template>
  <el-dialog v-model="dialogVisible" title="修改密码" width="500px" draggable>
    <el-form ref="passwordFormRef" :model="passwordForm" label-width="100px" :rules="rules">
      <el-form-item label="原密码" prop="oldPassword">
        <el-input v-model="passwordForm.oldPassword" type="password" show-password></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="newPassword">
        <el-input v-model="passwordForm.newPassword" type="password" show-password></el-input>
      </el-form-item>
      <el-form-item label="确认新密码" prop="confirmPassword">
        <el-input v-model="passwordForm.confirmPassword" type="password" show-password></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="resetDialog(passwordFormRef)">取消</el-button>
        <el-button type="primary" @click="updatePassword">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, defineExpose, reactive } from "vue";
import type { FormInstance } from "element-plus";

const dialogVisible = ref(false);
const passwordFormRef = ref<FormInstance>();
const passwordForm = reactive({
  oldPassword: "",
  newPassword: "",
  confirmPassword: ""
});

const openDialog = () => {
  dialogVisible.value = true;
};

const resetDialog = (formEl: FormInstance | undefined) => {
  if (!formEl) {
    dialogVisible.value = false;
    return;
  }
  formEl.resetFields();
  dialogVisible.value = false;
};

// 定义验证规则
const rules = {
  oldPassword: [
    { required: true, message: "请输入原密码", trigger: "blur" }
    // 添加更多验证规则
  ],
  newPassword: [
    { required: true, message: "请输入新密码", trigger: "blur" }
    // 添加更多验证规则
  ],
  confirmPassword: [
    { required: true, message: "请确认新密码", trigger: "blur" }
    // 添加更多验证规则
  ]
};

const updatePassword = () => {
  // 在这里编写更新密码的逻辑
  // 检查密码是否符合要求，向后端发送请求等
  // 如果要手动触发验证，可以使用 passwordFormRef.value.validate() 方法
  dialogVisible.value = false;
};

defineExpose({ openDialog });
</script>
