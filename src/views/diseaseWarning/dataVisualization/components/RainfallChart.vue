<template>
  <div class="chart-container" ref="chartContainer"></div>
</template>

<script>
import { onMounted, ref } from "vue";
import * as echarts from "echarts";

export default {
  name: "RainfallChart",
  setup() {
    const chartContainer = ref(null);

    const data = ref([
      { time: "08:00", rainfall: 0 },
      { time: "09:00", rainfall: 1 },
      { time: "10:00", rainfall: 2 },
      { time: "11:00", rainfall: 4 },
      { time: "12:00", rainfall: 6 }
    ]);

    onMounted(() => {
      drawChart();
    });

    const drawChart = () => {
      const chart = echarts.init(chartContainer.value);

      const option = {
        title: {
          text: "降雨量"
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
          name: "mm"
        },
        series: [
          {
            name: "降雨量",
            type: "bar", // Use 'bar' for a bar chart
            data: data.value.map(item => item.rainfall)
          }
        ]
      };

      chart.setOption(option);
    };

    // Function to update data
    const updateData = () => {
      const currentTime = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

      // Generate random data for rainfall
      const newRainfallData = {
        time: currentTime,
        rainfall: Math.random() * 10 // Simulated rainfall value (0 to 10 mm)
      };

      data.value.push(newRainfallData);

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
@import "./chartStyle.scss";
</style>
