<template>
  <div class="drawerTool">
    <div class="header">
      <div class="left">
        <img src="http://bucket-bangxiehui-1.oss-cn-beijing.aliyuncs.com/assets/drawerToolLogo.png" alt="">
        <span>文件名</span>
      </div>
      <div class="right">
        <img src="http://bucket-bangxiehui-1.oss-cn-beijing.aliyuncs.com/assets/userLogo.jpeg" alt="">
        <div class="export">
          <span>分享导出</span>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="catalogArea">
        <el-tabs v-model="activeName">
          <el-tab-pane label="目录" name="目录">
            <ul id="header-container" v-if="catalog.length">
              <li
                v-for="(item, index) in catalog"
                :type="item.type"
                :id="item.id"
                :key="item.id"
                @click="scrollToElem(item.id)"
              >
                {{ item.text }}
              </li>
            </ul>
          </el-tab-pane>
          <el-tab-pane label="版本" name="版本">
            <span>版本</span>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div class="editorArea">
        <div class="editorAreaContain">
          <div class="editorDom">
            <Editor ref="editor" />
          </div>
          <div class="wordCount">
            <div>0字</div>
            <div>
              <span>当前内容已于{{"12:35"}}自动保存</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import Editor from "./components/editor.vue";
import { ref, onMounted } from 'vue';

//初始化设置
const activeName = ref('目录');
const catalog = ref([]);


</script>
<style lang="scss" scoped>
div.drawerTool {
  width: 100%;
  height: 100%;
  >div.header {
    width: 100%;
    height: 89px;
    border-bottom: 1px solid #dfe0e1;
    background: #F7F8FC;
    padding: 0 48px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    div.left {
      display: flex;
      justify-content: space-between;
      align-items: center;
      img {
        width: 20px;
        height: 20px;
        margin-right: 30px;
      }
      span {
        font-family: Source Han Sans CN;
        font-size: 18px;
        font-weight: 500;
      }
    }
    div.right {
      display: flex;
      justify-content: space-between;
      align-items: center;
      img {
        width: 46px;
        height: 46px;
        border-radius: 50%;
        margin-right: 18px;
      }
      div.export {
        width: 91px;
        height: 42px;
        line-height: 42px;
        text-align: center;
        border-radius: 10px;
        opacity: 1;
        background: #43A8F0;
        span {
          font-size: 16px;
          font-weight: 500;
          color: #fff;
        }
      }
    }
  }
  >div.content {
    width: 100%;
    height: calc(100% - 90px);
    >div.catalogArea {
      float: left;
      width: 207px;
      height: 100%;
      background: #F7F8FC;
      border-right: 1px solid #dfe0e1;
      padding: 20px 30px;
      box-sizing: border-box;
      ul#header-container {
        width: 426px;
        height: 40px;
        margin: 14px auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
        li {
          cursor: pointer;
          &:hover {
            color: red;
          }
        }
      }
    }
    >div.editorArea {
      float: left;
      width: calc(100% - 208px);
      height: 100%;
      div.editorAreaContain {
        height: 100%;
        padding: 10px;
        box-sizing: border-box;
        background: rgb(235, 236, 239);
        div.editorDom {
          height: calc(100% - 30px);
        }
        div.wordCount {
          height: 30px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: #B9B5B5;
        }
      }
    }
  }
}
</style>
