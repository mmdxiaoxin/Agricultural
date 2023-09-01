<template>
  <div class="soil-data-visual-chart">
    <div class="soil-data">
      <div class="soil-temperature card">
        <div class="data-title">风速</div>
        <div class="data-value">{{ props.windSpeed }} m/s</div>
      </div>
      <div class="soil-humidity card">
        <div class="data-title">风向</div>
        <div class="data-value">{{ props.windDirection }} °</div>
      </div>
      <div class="soil-conductivity card">
        <div class="data-title">光照</div>
        <div class="data-value">{{ props.light }} klux</div>
      </div>
      <div class="weather card">
        <div class="data-title">天气</div>
        <div class="data-value">{{ weatherData?.description || "Loading..." }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps(["windSpeed", "windDirection", "light"]);
</script>

<style scoped lang="scss">
@mixin soil-item($soil-item: Basic) {
  text-align: center;
  padding: 10px;
  background-color: #11144d;
  .data-title {
    font-size: 20px;
    color: #eee7e7;
  }

  .data-value {
    font-size: 20px;
    font-weight: bold;
    color: #1890ff;
  }
}

.soil-data-visual-chart {
  padding: 20px;
  width: 89%;
  height: 84%;

  .soil-data {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    .soil-temperature,
    .soil-conductivity,
    .soil-humidity {
      @include soil-item;
      width: 30%;
    }

    .weather {
      @include soil-item;
      width: 100%;
      margin-top: 10%;
    }
  }
}
</style>
