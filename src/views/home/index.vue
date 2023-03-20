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
          <div class="loginBtn" @click="dialogVisible = true">登陆</div>
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
        <div>
          <p>一键轻松构思</p>
          <p>帮助您想方案策划、脚本故事、设计思路</p>
          <p></p>
        </div>
      </div>
    </div>
    <div class="referral referralEven">
      <div class="referralContain">
        <div>
          <p>一键画出画像</p>
          <p>帮助您把文字内容形象化展示、让沟通不再有障碍</p>
          <p></p>
        </div>
      </div>
    </div>
    <div class="referral referralOdd">
      <div class="referralContain">
        <div>
          <p>多端使用，实时同步</p>
          <p>电脑端、移动端、网页端实时同步轻松掌握</p>
          <p>历史文档随时恢复</p>
        </div>
      </div>
    </div>
    <div class="priceInfo">
      <div class="priceInfoContain">
        <div class="priceInfoItem">
          <div class="titleCon">
            <span>Free</span>
            <span>免费版</span>
          </div>
          <p class="info">使用免费版开始尝鲜AIGC带来的便利</p>
          <div class="point">
            <p></p>
          </div>
        </div>
        <div class="priceInfoItem">
          <div class="titleCon">
            <span>Standard</span>
            <span>标准版</span>
          </div>
          <p class="info">使用标准版让产生内容不再是难题</p>
        </div>
        <div class="priceInfoItem">
          <div class="titleCon">
            <span>Pro</span>
            <span>专业版</span>
          </div>
          <p class="info">使用专业版让产生内容变得轻松愉悦</p>
        </div>
      </div>
    </div>
    <login :dialogVisible="dialogVisible"/>
  </div>
</template>
<script setup>
import { ArrowDown } from '@element-plus/icons-vue';
import { loginOut } from "@/api/login.js";
import login from './components/login.vue';
import { reactive, ref } from 'vue';

const dialogVisible = ref(false);

//退出登录
const handleLoginOut = () => {
  loginOut().then(res => {
    console.log(res);
  })
}

</script>
<style lang="scss" scoped>
div.home {
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
      p:first-child {
        color: #fff;
        font-size: 28px;
        font-weight: bold;
        margin-bottom: 10px;
      }
      p:nth-child(2) {
        color: #fff;
        font-size: 16px;
        margin-bottom: 10px;
      }
      p:nth-child(3) {
        color: #fff;
        font-size: 16px;
        margin-bottom: 10px;
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
}
</style>
