<template>
    <div
      id="lineChart"
      ref="lineChart"
      :style="{ height: height, width: width }"
    ></div>
  </template>
  <script>
  import * as echarts from "echarts";
  export default {
    props: {
      width: {
        type: String,
        default: "100%",
      },
      height: {
        type: String,
        default: "100%",
      },
      params: {
        type: Array,
      },
    },
    data() {
      return {
        option: {},
        chart: null,
      };
    },
    watch: {
      params: {
        handler() {
          this.restoreChart();
        },
        deep: true,
      },
    },
    mounted() {
      //问题版本分布
      this.restoreChart();
    },
    methods: {
      restoreChart() {
        this.initData();
        this.initEchart();
        this.refreshChart();
      },
      // 绘制图表
      refreshChart() {
        if (!this.chart) return false;
        this.chart.setOption(this.option || {}, true);
        window.addEventListener("resize", () => {
          this.chart.resize();
        });
      },
      initEchart() {
        this.chart = echarts.init(this.$refs.lineChart);
      },
      //问题版本分布
      initData() {
        const name = this.params.map(item => item.name);
        const count = this.params.map(item => item.count);
        this.option = {
          color: ["#FA7417"],
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "line",
            },
            formatter: function (params) {
              const name = params[0].name;
              let htmlContent = "<div><span>" + name + "</span><br />";
              params.forEach((item) => {
                htmlContent += `<span>${item.marker + "弹幕数量" + item.value}</span><br />`;
              });
              htmlContent += "</div>";
              return htmlContent;
            },
          },
          grid: {
            left: 40,
            right: 40,
            bottom: 40,
            top: 40,
            containLabel: true,
          },
          toolbox: {
            feature: {
              saveAsImage: {}
            }
          },
          xAxis: {
            type: "category",
            axisLine: {
              show: false,
              lineStyle: {
                color: "rgba(0,0,0,0.6)",
              },
            },
            axisTick: {
              show: false,
            },
            axisLabel: {
              show: true,
            },
            data: name,
          },
          yAxis: {
            name: "数量",
            nameLocation: "end",
            nameTextStyle: {
              align: "right",
              padding: [0, 5, 0, 0],
            },
            minInterval: 1,
            type: "value",
            axisLine: {
              show: false, // x轴不显示线
              lineStyle: {
                color: "rgba(0,0,0,0.6)",
              },
            },
            axisTick: {
              show: false,
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: "rgba(0,0,0,0.25)",
              },
            },
            axisLabel: {},
          },
          series: [
            {
              data: count,
              type: "line",
              smooth: true,
              symbol: "none",
              areaStyle: {
                normal: {
                  color: {
                    type: "linear",
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [
                      {
                        offset: 0,
                        color: "#EFA39C", // 0% 处的颜色
                      },
                      {
                        offset: 1,
                        color: "#FEFEFE", // 100% 处的颜色
                      },
                    ],
                    global: false, // 缺省为 false
                  }
                },
              },
            },
          ],
        };
      },
    },
  };
  </script>
  <style></style>
