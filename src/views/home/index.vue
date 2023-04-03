<template>
  <div class="home">
    <div class="home_contain">
      <div class="header">
        <div class="left">
          <img src="../../assets/img/home_logo.jpg" alt="">
          <img src="../../assets/img/home_logo_text.png" alt="">
          <div class="btn active">主页</div>
          <div class="btn">创建</div>
          <div class="btn">设计室</div>
          <div class="search">
            <img src="../../assets/img/home_paint.svg" alt="">
<!--            <input type="text">-->
            <div class="create">创造</div>
          </div>
        </div>
        <div class="right">

        </div>
      </div>
      <div class="bigIcon">

      </div>
      <div class="imgFlow">
        <masonry-image />
      </div>
    </div>
    <login
      :dialogVisible="dialogVisible"
      @handleCloseDialog="dialogVisible = false;"
    />
  </div>
</template>
<script setup>
import Login from "./components/login.vue";
import MasonryImage from "@/components/masonryImage/index.vue";
import { ref, onMounted } from 'vue';

let dialogVisible = ref(false);
const loginBtnClick = () => {
  dialogVisible.value = true;
}

onMounted(() => {

})

</script>
<style lang="scss" scoped>
div.home {
  width: 100%;
  height: 100%;
  background-image: url("../../assets/img/home_background.png");
  >div.home_contain {
    width: 1440px;
    margin: 0 auto;
    >div.header {
      width: 100%;
      height: 64px;
      padding: 24px 27px 0;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      align-items: center;
      >div.left {
        display: flex;
        justify-content: start;
        align-items: center;
        img:first-child {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          margin-right: 15px;
        }
        img:nth-child(2) {
          width: 41px;
          height: 34px;
          margin-right: 45px;
        }
        div.btn {
          width: 66px;
          height: 32px;
          line-height: 32px;
          text-align: center;
          border-radius: 20px;
          margin-right: 20px;
          font-size: 20px;
          font-weight: 900;
          color: #4D4D4D;
          cursor: pointer;
          &.active {
            background: #FFFFFF;
          }
        }
        div.search {
          width: 730px;
          height: 40px;
          border-radius: 20px;
          background: #FFFFFF;
          position: relative;
          img {
            position: absolute;
            top: 8px;
            left: 15px;
          }
          input {

          }
          div.create {
            position: absolute;
            top: 8px;
            right: 15px;
            width: 79px;
            height: 24px;
            line-height: 24px;
            text-align: center;
            border-radius: 20px;
            background: #860AB8;
            font-size: 12px;
            font-weight: 900;
            color: #FFFFFF;
            cursor: pointer;
          }
        }
      }
    }
    >div.bigIcon {

    }
    >div.imgFlow {

    }
  }
}
</style>
