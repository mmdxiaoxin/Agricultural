<template>
  <div class="dataVisualize-box">
    <div class="card top-box">
      <div class="top-bar">数据统计</div>
      <div class="top-content">
        <el-row :gutter="40">
          <el-col class="mb40" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
            <div class="item-left sle">
              <span class="left-title">设备总数</span>
              <div class="img-box">
                <img src="./images/book-sum.png" alt="" />
              </div>
              <span class="left-number">{{ 4 }}个</span>
            </div>
          </el-col>
          <el-col class="mb40" :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
            <div class="item-center">
              <div class="gitee-traffic traffic-box">
                <div class="traffic-img">
                  <img src="./images/add_person.png" alt="" />
                </div>
                <span class="item-value">{{ 2682 }}</span>
                <span class="traffic-name sle">设备记录总数</span>
              </div>
              <div class="gitHub-traffic traffic-box">
                <div class="traffic-img">
                  <img src="./images/add_team.png" alt="" />
                </div>
                <span class="item-value">{{ 8 }}</span>
                <span class="traffic-name sle">站点总数</span>
              </div>
              <div class="today-traffic traffic-box">
                <div class="traffic-img">
                  <img src="./images/today.png" alt="" />
                </div>
                <span class="item-value">{{ 426 }}</span>
                <span class="traffic-name sle">今日设备记录</span>
              </div>
              <div class="yesterday-traffic traffic-box">
                <div class="traffic-img">
                  <img src="./images/book_sum.png" alt="" />
                </div>
                <span class="item-value">{{ 623 }}</span>
                <span class="traffic-name sle">昨日设备记录</span>
              </div>
            </div>
          </el-col>
          <el-col class="mb40" :xs="24" :sm="24" :md="24" :lg="10" :xl="10">
            <div class="item-right">
              <div class="echarts-title">正常记录 / 异常记录占比</div>
              <div class="book-echarts">
                <Pie ref="pieRef" />
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="card bottom-box">
      <div class="bottom-title">数据来源</div>
      <div class="bottom-tabs">
        <el-tabs v-model="tabActive" class="demo-tabs">
          <el-tab-pane v-for="item in tab" :key="item.name" :label="item.label" :name="item.name"></el-tab-pane>
        </el-tabs>
      </div>
      <div class="curve-echarts">
        <Curve ref="curveRef" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="dataVisualize">
import { ref, onMounted } from "vue";
import Pie from "./components/pie.vue";
import Curve from "./components/curve.vue";

const tabActive = ref(1);
const pieRef = ref();
const curveRef = ref();

onMounted(() => {
  pieRef.value.initChart(pieData);
  curveRef.value.initChart(curveData);
});

const tab = [
  { label: "近24小时", name: 1 },
  { label: "近七日", name: 2 },
  { label: "近一月", name: 3 },
  { label: "近三月", name: 4 },
  { label: "近半年", name: 5 },
  { label: "近一年", name: 6 }
];
const pieData = [
  { value: 3684, name: "正常记录" },
  { value: 23, name: "异常记录" }
];
const curveData = [
  { value: 30, spotName: "武功猕猴桃试验站" },
  { value: 90, spotName: "泾阳蔬菜示范站" },
  { value: 10, spotName: "临渭葡萄研究所" },
  { value: 70, spotName: "白水苹果试验站" }
];
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
