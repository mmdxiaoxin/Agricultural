<template>
  <el-container class="site-description card">
    <el-main class="site-content">
      <div class="site-header" @click="saveContent">
        <span class="text">{{ props.siteName }} <el-button :icon="Edit" circle size="small" /></span>
        <el-tag>站点介绍</el-tag>
      </div>
      <el-divider direction="horizontal" style="width: 100%" @click="saveContent" />
      <ApiStatistic @click="saveContent" />
      <div class="content-view" v-html="content" v-if="!EditMode" @click="editContent"></div>
      <WangEditor v-else v-model:value="content" height="300px" />
    </el-main>
    <el-divider direction="vertical" style="height: 100%" />
    <el-aside>
      <div class="site-aside" @click="saveContent">
        <span class="text"> ABOUT </span>
      </div>
    </el-aside>
  </el-container>
</template>

<script setup lang="ts">
import ApiStatistic from "./SiteStatistic.vue";
import { Edit } from "@element-plus/icons-vue";
import { ref } from "vue";
import WangEditor from "@/components/WangEditor/index.vue";

const EditMode = ref(false);
const content = ref("");
const props = defineProps({
  siteName: String
});

const editContent = () => {
  EditMode.value = true;
};
const saveContent = () => {
  EditMode.value = false;
};
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
