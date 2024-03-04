<script setup>
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'

const show = ref(false)

onMounted(() => {
  const chart = echarts.init(document.getElementById('chart-container'))
  chart.setOption({
    title: {
      text: 'ECharts entry example'
    },
    tooltip: {},
    xAxis: {
      data: ['shirt', 'cardign', 'chiffon shirt', 'pants', 'heels', 'socks']
    },
    yAxis: {},
    series: [{
      name: 'sales',
      type: 'bar',
      data: [5, 20, 36, 10, 10, 20]
    }]
  })
})
</script>

<template>
    <div id="chart-container"></div>
</template>

<style lang="less" scoped>
.read-the-docs {
  color: #888;
}

#chart-container {
width: 100%;
height: 100%;
}
</style>
