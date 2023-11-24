<template>
    <div>
      <div ref="lineChart" style="width: 400px; height: 400px;"></div>
    </div>
  </template>
  
  <script>
  import * as echarts from 'echarts';
  
  export default {
    data() {
      return {
        // 数据
        data: {
          categories: ['A', 'B', 'C', 'D', 'E'],
          values: [10, 20, 15, 25, 30]
        }
      };
    },
    mounted() {
      this.createLineChart();
    },
    methods: {
      createLineChart() {
        const lineChart = echarts.init(this.$refs.lineChart);
  
        const option = {
          title: {
            text: '折线图示例'
          },
          tooltip: {},
          legend: {
            data: ['数据']
          },
          xAxis: {
            data: this.data.categories
          },
          yAxis: {},
          series: [{
            name: '数据',
            type: 'line',
            data: this.data.values
          }]
        };
  
        lineChart.setOption(option);
      }
    }
  };
  </script>
  