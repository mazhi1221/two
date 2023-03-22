<template>
  <div class="home">
    <div class="nav">
      <div class="contain">
        <div class="left">
          <img alt="" src="../../assets/img/logo.png">
          <div>首页</div>
          <div>产品</div>
          <div>功能</div>
          <div>价格</div>
          <div>更多</div>
        </div>
        <div class="right">
          <div class="loginBtn" @click="loginBtnClick">登陆</div>
          <div class="registerBtn">注册</div>
          <el-dropdown>
            <span class="el-dropdown-link">
              中文 (简体)
              <el-icon class="el-icon--right">
                <arrow-down/>
              </el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>中文 (简体)</el-dropdown-item>
                <el-dropdown-item>English (US)</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
    </div>
    <div class="referral referralOdd">
      <div class="referralContain">
        <div class="textArea">
          <p>写需求就用帮写绘</p>
          <p>一键生成，轻松完成</p>
          <div>
            <div @click="tryFree">免费试用</div>
            <div @click="downLoadUse">下载使用</div>
          </div>
        </div>
        <div class="imgArea">
          <img class="imgFir" src="http://bucket-bangxiehui-1.oss-cn-beijing.aliyuncs.com/assets/a.png" alt="">
          <img class="imgSec" src="http://bucket-bangxiehui-1.oss-cn-beijing.aliyuncs.com/assets/b.png" alt="">
        </div>
      </div>
    </div>
    <div class="referral referralEven">
      <div class="referralContain">
        <div class="textArea">
          <p>一键轻松构思、迸发灵感</p>
          <p>帮助您想方案策划、脚本故事、设计思路、草图制作</p>
          <div>
            <div @click="tryFree">免费试用</div>
            <div @click="downLoadUse">下载使用</div>
          </div>
        </div>
        <div class="imgArea">
          <img class="imgThr" src="http://bucket-bangxiehui-1.oss-cn-beijing.aliyuncs.com/assets/c.png" alt="">
        </div>
      </div>
    </div>
    <div class="referral referralOdd">
      <div class="referralContain">
        <div class="imgArea">
          <img class="imgfor" src="http://bucket-bangxiehui-1.oss-cn-beijing.aliyuncs.com/assets/c.png" alt="">
        </div>
        <div class="textArea">
          <p>秒出您想要的一切原创内容</p>
          <p>文字内容形象化展示，告别无效搜索，让创作和沟通不再有障碍，强大词汇理解能力</p>
          <div>
            <div @click="tryFree">免费试用</div>
            <div @click="downLoadUse">下载使用</div>
          </div>
        </div>
      </div>
    </div>
    <div class="referral referralEven">
      <div class="referralContain">
        <div class="textArea">
          <p>多端使用，实时同步</p>
          <p>电脑端、移动端、网页端实时同步轻松掌控历史文档随时恢复</p>
          <div>
            <div @click="tryFree">免费试用</div>
            <div @click="downLoadUse">下载使用</div>
          </div>
        </div>
        <div class="imgArea">
          <img class="imgThr" src="http://bucket-bangxiehui-1.oss-cn-beijing.aliyuncs.com/assets/c.png" alt="">
        </div>
      </div>
    </div>
<!--    <div class="priceInfo">-->
<!--      <div class="priceInfoContain">-->
<!--        <div class="priceInfoItem">-->
<!--          <div class="titleCon">-->
<!--            <span>Free</span>-->
<!--            <span>免费版</span>-->
<!--          </div>-->
<!--          <p class="info">使用免费版开始尝鲜AIGC带来的便利</p>-->
<!--          <div class="point">-->
<!--            <p></p>-->
<!--          </div>-->
<!--        </div>-->
<!--        <div class="priceInfoItem">-->
<!--          <div class="titleCon">-->
<!--            <span>Standard</span>-->
<!--            <span>标准版</span>-->
<!--          </div>-->
<!--          <p class="info">使用标准版让产生内容不再是难题</p>-->
<!--        </div>-->
<!--        <div class="priceInfoItem">-->
<!--          <div class="titleCon">-->
<!--            <span>Pro</span>-->
<!--            <span>专业版</span>-->
<!--          </div>-->
<!--          <p class="info">使用专业版让产生内容变得轻松愉悦</p>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
    <div class="recommendedContent">
      <div class="contain">
        <div class="titleBar">
          <span>AIGC设计和创造</span>
        </div>
        <ul>
          <li v-for="(item, index) in recommendedContent">
            <img src="http://bucket-bangxiehui-1.oss-cn-beijing.aliyuncs.com/assets/userLogo.jpeg" alt="">
          </li>
          <li v-for="(item, index) in recommendedContent">
            <img src="http://bucket-bangxiehui-1.oss-cn-beijing.aliyuncs.com/assets/userLogo.jpeg" alt="">
          </li>
        </ul>
      </div>
    </div>
    <footer>
      <div class="contain">
        <div class="left">
          <div class="product">
            <div class="title">产品</div>
            <ul>
              <li>客户端windows</li>
              <li>浏览器插件</li>
              <li>客户端Mac</li>
              <li>word插件</li>
              <li>移动端iOS</li>
              <li>PPT插件</li>
              <li>移动端Android</li>
              <li>Excel插件</li>
              <li>移动端iPad</li>
            </ul>
          </div>
          <div class="company">
            <div class="title">公司</div>
            <ul>
              <li>关于我们</li>
              <li>使用愿景和价值观</li>
              <li>发展历程</li>
              <li>投资者关系</li>
            </ul>
          </div>
          <div class="other">
            <div class="title">其它</div>
            <ul>
              <li>联系我们</li>
              <li>商务合作</li>
              <li>隐私协议</li>
            </ul>
          </div>
        </div>
        <div class="right">
          <img src="http://bucket-bangxiehui-1.oss-cn-beijing.aliyuncs.com/assets/logo_dark.png" alt="">
        </div>
      </div>
    </footer>
    <login
      :dialogVisible="dialogVisible"
      @handleCloseDialog="dialogVisible = false;"
    />
  </div>
</template>
<script setup>
import Login from "./components/login.vue";
import { ArrowDown } from '@element-plus/icons-vue';
import { ref, onMounted } from 'vue';
import { useRouter , useRoute } from 'vue-router'
import { getTag, getTemplate } from '../../api/home'

const dialogVisible = ref(false);
const loginBtnClick = () => {
  dialogVisible.value = true;
}

const tags = ref([]);
const getTags = () => {
  getTag().then(res => {
    tags.value = res;
  })
}

const recommendedContent = ref([]);
const getRecommendedContent = () => {
  getTemplate().then(res => {
    recommendedContent.value = res;
  })
}

const $router = useRouter()
const $route = useRoute()
const tryFree = () => {
  $router.push({ path: 'drawerHome' })
}

const downLoadUse = () => {

}

onMounted(() => {
  getRecommendedContent();
})

</script>
<style lang="scss" scoped>
div.home {
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  div.nav {
    width: 100%;
    height: 107px;
    background: #45A0F4;

    div.contain {
      width: 1220px;
      height: 100%;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;

      div.left {
        height: 100%;
        display: flex;
        justify-content: start;
        align-items: center;

        img {
          width: 145px;
          height: 50px;
          margin-right: 80px;
        }

        div {
          font-size: 16px;
          margin-right: 30px;
          color: #fff;
          opacity: 1;
          cursor: pointer;
          &:hover {
            opacity: 0.8;
          }
        }
      }

      div.right {
        height: 100%;
        display: flex;
        justify-content: end;
        align-items: center;

        div.loginBtn, div.registerBtn {
          width: 90px;
          height: 42px;
          line-height: 42px;
          text-align: center;
          border-radius: 10px;
          cursor: pointer;
          color: #000;
          font-size: 16px;
          background: #fff;
          margin-right: 10px;

          &.registerBtn {
            color: #fff;
            background: #0381DB;
            margin-right: 50px;
          }
        }

        .el-dropdown-link {
          font-size: 16px;
          color: #fff;
          cursor: pointer;
        }
      }
    }
  }

  div.referral {
    width: 100%;
    height: 712px;
    &.referralOdd {
      background: #45A0F4;
    }
    &.referralEven {
      background: #3A9AF4;
    }
    >div.referralContain {
      width: 1220px;
      height: 100%;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      >div.textArea {
        p:first-child {
          color: #fff;
          font-size: 28px;
          font-weight: bold;
          margin-bottom: 10px;
        }
        p:nth-child(2) {
          color: #fff;
          font-size: 16px;
          margin-bottom: 50px;
        }
        div:nth-child(3) {
          display: flex;
          justify-content: start;
          align-items: center;
          >div {
            width: 149px;
            height: 42px;
            line-height: 42px;
            text-align: center;
            color: #fff;
            border-radius: 10px;
            cursor: pointer;
            &:first-child {
              background: #3ADCF4;
              margin-right: 24px;
            }
            &:last-child {
              background: #0381DB;
            }
          }
        }
        p:nth-child(3) {
          color: #fff;
          font-size: 16px;
          margin-bottom: 10px;
        }
      }
      >div.imgArea {
        flex-basis: 50%;
        height: 500px;
        position: relative;
        img {
          width: 550px;
          height: 400px;
          &.imgFir {
            position: absolute;
            top: 0;
            right: 0;
          }
          &.imgSec {
            position: absolute;
            top: 150px;
            right: 150px;
          }
          &.imgThr {
            position: absolute;
            top: 50px;
            right: 0;
          }
          &.imgfor {
            position: absolute;
            top: 50px;
            left: 0;
          }
        }
      }
    }
  }
  div.priceInfo {
    width: 100%;
    height: 712px;
    background: #449FF2;
    div.priceInfoContain {
      width: 1220px;
      height: 100%;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      div.priceInfoItem {
        width: 370px;
        height: 600px;
        border-radius: 20px;
        background: #fff;
        padding: 40px 30px;
        box-sizing: border-box;
        div.titleCon {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
          span {
            font-size: 22px;
            font-weight: bold;
            color: #000;
          }
        }
        p.info {
          font-size: 18px;
          color: #000;
        }
      }
    }
  }
  div.recommendedContent {
    width: 100%;
    height: 906px;
    background: #e9ebeb;
    div.contain {
      width: 1220px;
      height: 100%;
      margin: 0 auto;
      padding: 40px 0 60px;
      box-sizing: border-box;
      div.titleBar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 42px;
        span {
          font-size: 30px;
          font-weight: 500;
          line-height: 35px;
          color: #080707;
        }
      }
      ul {
        overflow: hidden;
        li {
          width: 230px;
          height: 330px;
          border-radius: 10px;
          margin-right: 100px;
          float: left;
          &:nth-child(4) {
            margin-right: 0;
          }
          &:nth-child(-n + 4) {
            margin-bottom: 64px;
          }
          img {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }
  footer {
    width: 100%;
    height: 380px;
    background: #fff;
    div.contain {
      width: 1220px;
      height: 100%;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      div.left {
        display: flex;
        justify-content: start;
        div.title {
          font-size: 22px;
          font-weight: 500;
          line-height: 35px;
          color: #3D3D3D;
          margin-bottom: 14px;
        }
        div.product {
          width: 320px;
          margin-right: 60px;
          ul {
            overflow: hidden;
            li {
              float: left;
              width: 50%;
              height: 35px;
              line-height: 35px;
            }
          }
        }
        div.company {
          width: 160px;
          margin-right: 60px;
          ul {
            li {
              height: 35px;
              line-height: 35px;
            }
          }
        }
        div.other {
          width: 160px;
          margin-right: 60px;
          ul {
            li {
              height: 35px;
              line-height: 35px;
            }
          }
        }
      }
      div.right {
        img {
          width: 146px;
          height: 60px;
        }
      }
    }
  }
}
</style>
