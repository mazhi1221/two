<template>
  <div class="fashionTrend">
    <div class="fashionTrendContain">
      <ul>
        <li class="tagGroup">
          <el-space :size="20">
            <div
              :class="['tag', { active: officialActive === item.type }]"
              v-for="item in officialDocuments"
              @click="officialActive = item.type"
            >
              <span>{{ item.type }}</span>
            </div>
          </el-space>
        </li>
        <li class="fashionCard" v-for="item in officialDocuments">
          <template v-if="officialActive === item.type">
            <img :src="item.imgUrl" alt="">
            <div class="description">
              <p class="title">{{ item.title }}</p>
              <p class="subTitle">{{ item.subTitle }}</p>
              <p class="description">{{ item.description }}</p>
            </div>
          </template>
        </li>
      </ul>
    </div>

  </div>
</template>
<script setup>
const officialActive = $ref("消费者洞察");
const officialDocuments = [
  {
    type: "消费者洞察",
    title: "了解消费者的生活方式和使用习惯",
    subTitle: "我们通过消费者的视角帮助您预见未来，对未来几年消费者的思维、感受和行为方式有着无与伦比的洞察力。",
    description: "通过详细准确的消费者预测和服务，我们展示了消费者的行为、兴趣和品味将如何影响他们的生活、工作和娱乐方式。这使您能够预见到生活方式的巨大变化，并开发满足消费者需求的产品和服务。",
    imgUrl: "http://bucket-bangxiehui-1.oss-cn-beijing.aliyuncs.com/assets/fashionTrend1.jpg"
  },
  {
    type: "产品设计",
    title: "自信创造产品",
    subTitle: "我们的设计方向激发了您的消费者想要购买的产品、体验和服务;从它们的外观和味道到感觉和功能。",
    description: "通过专业的、数据驱动的趋势预测和设计方向，我们通过了解正确的趋势，并将其转化为设计精美的产品和包装，帮助您获得市场份额，使您与众不同，并对可持续发展敏感。",
    imgUrl: "http://bucket-bangxiehui-1.oss-cn-beijing.aliyuncs.com/assets/fashionTrend2.jpg"
  },
  {
    type: "市场策略",
    title: "正确的市场策略",
    subTitle: "我们将趋势预测方法与最新的预测分析和数据科学相结合，帮助您在正确的时间为您的品牌和消费者推出正确的产品。",
    description: "通过数据支持的订阅和咨询服务，我们让您走在趋势的前面，并准确地告诉您在哪里下注。我们还为您提供有效的零售和沟通策略，以最大限度地提高品牌参与度和销售额。",
    imgUrl: "http://bucket-bangxiehui-1.oss-cn-beijing.aliyuncs.com/assets/fashionTrend3.jpg"
  },
]
</script>
<style lang="scss" scoped>
div.fashionTrend {
  width: 100%;
  height: calc(100vh - 78px);
  position: relative;
  div.fashionTrendContain {
    width: 1440px;
    height: 100%;
    margin: 0 auto;
    padding-top: 20px;
    box-sizing: border-box;
    ul {
      width: 100%;
      height: 100%;
      position: relative;
      li.tagGroup {
        position: absolute;
        top: 20px;
        left: 0;
        right: 0;
        z-index: 2;
        display: flex;
        justify-content: center;
        div.tag {
          height: 40px;
          line-height: 40px;
          padding: 0 12px;
          border-radius: 20px;
          font-weight: 900;
          font-size: 24px;
          color: #3D3D3D;
          cursor: pointer;
          &.active {
            color: #fff;
            background: #000000;
          }
        }
      }
      li.fashionCard {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 1;
        display: flex;
        justify-content: start;
        align-items: center;
        img {
          height: 60%;
        }
        div.description {
          width: 700px;
          margin-left: 110px;
          p.title {
            font-size: 30px;
            font-weight: bold;
            color: #fff;
            margin-bottom: 60px;
          }
          p.subTitle, p.description {
            font-size: 24px;
            color: #fff;
            &.subTitle {
              margin-bottom: 40px;
            }
          }
        }
      }
    }
  }
}
</style>
