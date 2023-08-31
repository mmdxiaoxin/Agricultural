<template>
  <div class="content-box card">
    <div class="message">
      <h2>消息通知</h2>
      <el-tabs v-model="activeName">
        <el-tab-pane label="通知(5)" name="first">
          <div class="message-list">
            <div class="message-item">
              <img src="@/assets/images/msg01.png" alt="" class="message-icon" />
              <div class="message-content">
                <span class="message-title">一键三连 🧡</span>
                <span class="message-date">一分钟前</span>
              </div>
            </div>
            <div class="message-item">
              <img src="@/assets/images/msg02.png" alt="" class="message-icon" />
              <div class="message-content">
                <span class="message-title">一键三连 💙</span>
                <span class="message-date">一小时前</span>
              </div>
            </div>
            <div class="message-item">
              <img src="@/assets/images/msg03.png" alt="" class="message-icon" />
              <div class="message-content">
                <span class="message-title">一键三连 💚</span>
                <span class="message-date">半天前</span>
              </div>
            </div>
            <div class="message-item">
              <img src="@/assets/images/msg04.png" alt="" class="message-icon" />
              <div class="message-content">
                <span class="message-title">一键三连 💜</span>
                <span class="message-date">一星期前</span>
              </div>
            </div>
            <div class="message-item">
              <img src="@/assets/images/msg05.png" alt="" class="message-icon" />
              <div class="message-content">
                <span class="message-title">一键三连 💛</span>
                <span class="message-date">一个月前</span>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="消息(0)" name="second">
          <div class="message-empty">
            <img src="@/assets/images/notData.png" alt="notData" />
            <div>暂无消息</div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="代办(0)" name="third">
          <div class="message-empty">
            <img src="@/assets/images/notData.png" alt="notData" />
            <div>暂无代办</div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
const activeName = ref("first");
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
