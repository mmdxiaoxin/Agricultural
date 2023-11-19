<template>
  <el-dialog v-model="dialogVisible" title="个人信息" min-width="500px" draggable>
    <div class="el-dialog--center">
      <el-page-header @back="closeDialog">
        <template #content>
          <div class="items-center">
            <el-avatar class="mr-3" :size="32" :src="useStore.userInfo.avatar" />
            <span style="margin-left: 20px" v-if="!editMode">{{ useStore.userInfo.name }}</span>
            <el-input v-else v-model="editedUserInfo.name" style="max-width: 30%; margin-left: 20px" />
            <el-tag style="margin-left: 20px" :type="getTagType(useStore.userInfo.currentRole)">
              {{ useStore.userInfo.currentRole }}
            </el-tag>
          </div>
        </template>
        <template #extra>
          <div class="items-center">
            <el-button :type="editMode ? 'info' : 'primary'" @click="toggleEditMode">
              {{ editMode ? "保存" : "编辑" }}
            </el-button>
          </div>
        </template>
        <el-descriptions :column="1" border>
          <el-descriptions-item label="邮箱">
            <span v-if="!editMode">{{ useStore.userInfo.email }}</span>
            <el-input v-else v-model="editedUserInfo.email" />
          </el-descriptions-item>
          <el-descriptions-item label="手机号">
            <span v-if="!editMode">{{ useStore.userInfo.phone }}</span>
            <el-input v-else v-model="editedUserInfo.phone" />
          </el-descriptions-item>
          <el-descriptions-item label="个人简介" class="descriptions">
            <span v-if="!editMode">{{ useStore.userInfo.description }}</span>
            <el-input v-else v-model="editedUserInfo.description" />
          </el-descriptions-item>
        </el-descriptions>
      </el-page-header>
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useUserStore } from "@/stores/modules/user";
import { getTagType } from "@/utils/workPlace";

const useStore = useUserStore();
const dialogVisible = ref(false);
const editMode = ref(false);

const editedUserInfo = ref({
  name: useStore.userInfo.name,
  email: useStore.userInfo.email,
  phone: useStore.userInfo.phone,
  description: useStore.userInfo.description
});

const openDialog = () => {
  dialogVisible.value = true;
};

const closeDialog = () => {
  dialogVisible.value = false;
  editMode.value = false;
};

const toggleEditMode = () => {
  if (editMode.value) {
    // 保存修改后的个人信息，这里可以进行保存逻辑
    // 例如，将editedUserInfo的值提交到后端
  }
  editMode.value = !editMode.value;
};

defineExpose({ openDialog });
</script>

<style scoped lang="scss">
.items-center {
  display: flex;
  align-items: center;

  .descriptions {
    width: 100%;
    border: #575757 1px solid;
    min-height: 250px;
  }
}
</style>
