
<template>
  <div class="bxo">
    <div v-for="item in 2" :key="item" class="box">
      <img :src="props.data[0].imgList[item - 1].url" alt="">
      <div>
        {{ props.data[0].imgList[item - 1].title }}
      </div>
    </div>

    <ul class="ul">
      <li v-for="(item, index) in props.data[1].imgList" :key="index">
        <img :src="item.url" alt="">
        <p>{{ item.title }}</p>
        <div>{{ item.description }}</div>
      </li>
    </ul>
  </div>
</template>
<script setup>
import { defineProps } from 'vue';

const props = defineProps({ data: Array })
console.log(props.data[1])
</script>
<style lang="scss" scoped>
.bxo {
  background-color: white;
  padding-bottom: 30px;
}

.bxo>.box {
  position: relative;
  height: 556.46px;
  img {
    width: 100%;
    height: 100%;
    vertical-align: bottom;
  }

  div {
    position: absolute;
    left: 74.03px;
    top: 450px;
    height: 43px;
    opacity: 1;
    // font-family: 思源黑体;
    font-size: 30px;
    font-weight: bold;
    letter-spacing: 0em;
    color: #FFFFFF;
  }
}

ul {
  overflow: hidden;
  margin-top: 30px;
  li {
    width: 25%;
    float: left;
    width: 341.37px;
    margin:0 0 15px 15px;
    img {
      width: 100%;
      height: 474.27px;
      border-radius: 20px;
    }
    p{
      font-size: 16px; 
      color: #3D3D3D;
      font-weight: 550;
      padding: 0px 5px;
    };
    div {
      color: #3D3D3D;
      font-size: 16px;
      font-weight: 350;
      letter-spacing: 0em;
      padding: 0px 5px;
    }
  }
}
</style>
