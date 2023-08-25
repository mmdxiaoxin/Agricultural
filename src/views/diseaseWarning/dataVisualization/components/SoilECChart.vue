<template>
  <div class="chart-container-small" ref="chartContainer"></div>
</template>

<script>
import { onMounted, ref } from "vue";
import * as echarts from "echarts";

export default {
  name: "SoilECChart",
  setup() {
    const chartContainer = ref(null);

    const data = ref([
      { time: "08:00", soilEC: 500 },
      { time: "09:00", soilEC: 550 },
      { time: "10:00", soilEC: 600 },
      { time: "11:00", soilEC: 580 },
      { time: "12:00", soilEC: 570 }
    ]);

    onMounted(() => {
      drawChart();
    });

    const drawChart = () => {
      const chart = echarts.init(chartContainer.value);

      const option = {
        title: {
          text: "土壤电导率"
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
          name: "us"
        },
        series: [
          {
            name: "土壤电导率",
            type: "line",
            data: data.value.map(item => item.soilEC)
          }
        ]
      };

      chart.setOption(option);
    };

    // Function to update data
    const updateData = () => {
      const currentTime = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

      // Generate random data for soil EC
      const newSoilECData = {
        time: currentTime,
        soilEC: Math.random() * 300 + 500 // Simulated soil EC value (500 to 800 us)
      };

      data.value.push(newSoilECData);

      if (data.value.length > 20) {
        data.value.shift();
      }
    };

    onMounted(() => {
      drawChart();

      // Start the data update interval
      setInterval(updateData, 2000); // Update data every 2 seconds
    });

    return {
      chartContainer,
      data
    };
  }
};
</script>

<style scoped lang="scss">
@import "../../../../styles/chartStyle.scss";
</style>
