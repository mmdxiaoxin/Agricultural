<template>
  <div class="register-container flx-center">
    <div class="register-box">
      <div class="register-form">
        <div class="register-logo">
          <img class="register-icon" src="@/assets/images/AgricultureLogo.svg" alt="" />
          <h2 class="logo-text">账号注册</h2>
        </div>
        <el-form ref="registerFormRef" :model="registerForm" :rules="registerRules" size="large">
          <el-form-item prop="username">
            <el-input v-model="registerForm.username" placeholder="请输入用户名(邮箱)">
              <template #prefix>
                <el-icon class="el-input__icon">
                  <user />
                </el-icon>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="registerForm.password" type="password" show-password placeholder="请输入密码">
              <template #prefix>
                <el-icon class="el-input__icon">
                  <lock />
                </el-icon>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop="confirm">
            <el-input v-model="registerForm.confirm" type="password" show-password placeholder="请确认密码">
              <template #prefix>
                <el-icon class="el-input__icon">
                  <lock />
                </el-icon>
              </template>
            </el-input>
          </el-form-item>
        </el-form>
        <div class="register-btn">
          <el-button :icon="CircleClose" round size="large" @click="backToLogin"> 返回</el-button>
          <el-button :icon="UserFilled" round size="large" type="primary" :loading="loading" @click="register(registerForm)">
            注册
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="register">
import { ElForm, ElMessage, FormItemRule } from "element-plus";
import { reactive, ref } from "vue";
import { CircleClose, UserFilled } from "@element-plus/icons-vue";
import router from "@/routers/index";
import { Register } from "@/api/interface/index";

type FormInstance = InstanceType<typeof ElForm>;
const loading = ref(false);
const registerFormRef = ref<FormInstance>();
const registerRules: { [key: string]: FormItemRule[] } = {
  username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }],
  confirm: [
    { required: true, message: "请输入密码", trigger: "blur" },
    {
      validator: (rule, value, callback) => {
        if (value !== registerForm.password) {
          callback(new Error("两次输入密码不一致"));
        } else {
          callback();
        }
      },
      trigger: "blur"
    }
  ]
};

const registerForm = reactive<Register.ReqRegisterForm>({
  username: "",
  password: "",
  confirm: ""
});

// resetForm
const backToLogin = () => {
  router.push("/login");
};

//注册账号
const register = async (formEl: FormInstance | undefined) => {
  if (!registerFormRef.value) return;

  try {
    await registerFormRef.value.validate();
    console.log("表单数据:", formEl);
    // 执行你的注册逻辑
    ElMessage.success("注册成功");
    router.push("/login");
  } catch (error) {
    // 验证失败，显示错误信息
    console.error("表单验证失败:", error);
    ElMessage.error("注册失败,请检查表单数据");
  }
};
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
