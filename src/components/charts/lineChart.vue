<template>
    <div
        id="lineChart"
        ref="lineChart"
        :style="{ height: height, width: width }"
    ></div>
</template>
  <script>
import * as echarts from 'echarts'
export default {
    props: {
        width: {
            type: String,
            default: '100%'
        },
        height: {
            type: String,
            default: '100%'
        },
        params: {
            type: Array
        }
    },
    data() {
        return {
            option: {},
            chart: null
        }
    },
    watch: {
        params: {
            handler() {
                this.restoreChart()
            },
            deep: true
        }
    },
    mounted() {
        //问题版本分布
        this.restoreChart()
    },
    methods: {
        restoreChart() {
            this.initData()
            this.initEchart()
            this.refreshChart()
        },
        // 绘制图表
        refreshChart() {
            if (!this.chart) return false
            this.chart.setOption(this.option || {}, true)
            window.addEventListener('resize', () => {
                this.chart.resize()
            })
        },
        initEchart() {
            this.chart = echarts.init(this.$refs.lineChart)
        },
        //问题版本分布
        initData() {
            const name = this.params.map((item) => item.name)
            const count = this.params.map((item) => item.count)
            this.option = {
                color: ['#FA7417'],
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'line'
                    },
                },
                grid: {
                    left: 40,
                    right: 40,
                    bottom: 40,
                    top: 40,
                    containLabel: true
                },
                toolbox: {
                    feature: {
                        saveAsImage: {}
                    }
                },
                xAxis: {
                    type: 'category',
                    axisLine: {
                        show: false,
                        lineStyle: {
                            color: 'rgba(0,0,0,0.6)'
                        }
                    },
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        show: true
                    },
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                },
                yAxis: {
                    name: '数量',
                    nameLocation: 'end',
                    nameTextStyle: {
                        align: 'right',
                        padding: [0, 5, 0, 0]
                    },
                    minInterval: 1,
                    type: 'value',
                    axisLine: {
                        show: false, // x轴不显示线
                        lineStyle: {
                            color: 'rgba(0,0,0,0.6)'
                        }
                    },
                    axisTick: {
                        show: false
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: 'rgba(0,0,0,0.25)'
                        }
                    },
                    axisLabel: {}
                },
                series: [
                    {
                        name: '传感器',
                        type: 'line',
                        stack: 'Total',
                        data: [120, 132, 101, 134, 90, 230, 210]
                    },
                    {
                        name: '传感器',
                        type: 'line',
                        stack: 'Total',
                        data: [220, 182, 191, 234, 290, 330, 310]
                    }
                ]
            }
        }
    }
}
</script>
  <style></style>
