<template>
  <el-dialog v-model="dialogVisible" title="个人信息" width="500px" draggable>
    <div>
      <h3>用户信息</h3>
      <p><strong>用户名:</strong> {{ userInfo.username }}</p>
      <p><strong>性别:</strong> {{ userInfo.gender }}</p>
      <p><strong>身份证号:</strong> {{ userInfo.idCard }}</p>
      <p><strong>邮箱:</strong> {{ userInfo.email }}</p>
      <p><strong>地址:</strong> {{ userInfo.address }}</p>
      <p><strong>创建时间:</strong> {{ userInfo.createTime }}</p>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { User } from "@/api/interface";

const dialogVisible = ref(false);
const userInfo = ref<User.ResUserList>({
  username: "小新AI",
  gender: "男",
  idCard: "123456789012345678",
  email: "xxxxxx@qq.com",
  address: "xx省xx市xx区",
  createTime: "2021-08-01 12:00:00"
});
const openDialog = () => {
  dialogVisible.value = true;
};

defineExpose({ openDialog });
</script>
