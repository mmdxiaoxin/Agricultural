<template>
  <div class="chart-container-small" ref="chartContainer"></div>
</template>

<script>
import { onMounted, ref, watch } from "vue";
import * as echarts from "echarts";

export default {
  name: "IlluminanceChart",
  setup() {
    const chartContainer = ref(null);

    // const data = ref([]);

    // Simulated real-time data
    const data = ref([
      { time: "08:00", illuminance: 10 },
      { time: "09:00", illuminance: 20 },
      { time: "10:00", illuminance: 40 },
      { time: "11:00", illuminance: 60 },
      { time: "12:00", illuminance: 80 }
    ]);

    // Function to update data
    const updateData = () => {
      const newData = [...data.value];
      newData.push({
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        illuminance: Math.random() * 100 // Simulated illuminance value (0 to 100)
      });
      if (newData.length > 20) {
        newData.shift();
      }
      data.value = newData;
    };

    onMounted(() => {
      drawChart();
      // Start the data update interval
      setInterval(updateData, 2000); // Update data every 2 seconds
    });

    const drawChart = () => {
      const chart = echarts.init(chartContainer.value);

      const option = {
        title: {
          text: "光照强度"
        },
        tooltip: {
          trigger: "axis"
        },
        xAxis: {
          type: "category",
          data: data.value.map(item => item.time)
        },
        yAxis: {
          type: "value",
          name: "Klux"
        },
        series: [
          {
            name: "光照强度",
            type: "line",
            data: data.value.map(item => item.illuminance)
          }
        ]
      };

      chart.setOption(option);
    };

    // Watch for real-time data changes and update the chart
    watch(data, newData => {
      const chart = echarts.getInstanceByDom(chartContainer.value);

      chart.setOption({
        xAxis: {
          data: newData.map(item => item.time)
        },
        series: [
          {
            data: newData.map(item => item.illuminance)
          }
        ]
      });
    });

    return {
      chartContainer,
      data
    };
  }
};
</script>

<style scoped lang="scss">
@import "../../../../../styles/chartStyle";
</style>
