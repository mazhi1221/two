<template>
  <div class="fashionTrend" >
    <div class="fashionTrendContain">
      <div class="category">
        <el-space :size="90">
          <div
            v-for="(item,index) in officialDocuments"
            :class="['tag', { active: officialActive === item.value }]"
<<<<<<< HEAD
            @click="officialActive = item.value"
=======
            @click="TitleClick(item,index) "
>>>>>>> 19f8d25... code
            :key="index"
          >
            <span class="title">{{ item.name }}</span>
          </div>
        </el-space>
      </div>
      <div class="content">
        <Futurestrategy
          v-show="officialActive === 'futureStrategy'"
          :data="renderData.futureStrategy"
        />
        <trend-info
          v-show="officialActive === 'marketAnalysis'"
          :data="renderData.marketAnalysis"
        />
        <MarketAnalysis
          v-show="officialActive === 'researchDesign'"
          :data="renderData.researchDesign"
        />
        <trend-info
          v-show="officialActive === 'brandInterpretation'"
          :data="renderData.brandInterpretation"
        />
      </div>
    </div>
  </div>
</template>
<script setup>
import TrendInfo from "../components/trendInfo.vue"
<<<<<<< HEAD
import MarketAnalysis from "../components/components/MarketAnalysis.vue";
=======
>>>>>>> 19f8d25... code
import Futurestrategy from "../components/components/Futurestrategys.vue"
import renderData from "./imageConfig.json";

const officialActive = $ref("futureStrategy")
const TitleClick = (item,index)=> {
  console.log(item,index);
  officialActive = item.value
}
const officialDocuments = [
  { name: "未来策略", value: "futureStrategy" },
  { name: "市场策略", value: "marketAnalysis" },
  { name: "调研设计", value: "researchDesign" },
  { name: "品牌解读", value: "brandInterpretation" },
]
</script>
<style lang="scss" scoped>
div.fashionTrend {
  width: 100%;
  padding-top: 120px;
  padding-bottom: 120px;
<<<<<<< HEAD
  background: #000000;
=======
  // background-color: white;
>>>>>>> 19f8d25... code
  div.fashionTrendContain {
    width: 1440px; // 全屏
    margin: 0 auto;
    
    >div.category {
      display: flex;
      justify-content: center;
      margin-bottom: 64px;
      
      div.tag {
        span.title {
          cursor: pointer;
          color: #fff;
          font-size: 18px;
          font-weight: bold;
        }
        &.active {
          span.title {
            text-decoration: underline;
          }
        }
      }
    }
    >div.content {

    }
  }
}
</style>
