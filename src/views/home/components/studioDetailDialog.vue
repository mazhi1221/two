<template>
  <div class="studioDetail">
    <el-dialog
      width="30%"
      :model-value="dialogVisible"
      :before-close="handleCloseDialog"
    >
      <div class="header">
        <div class="header_title">为什么黑色总是吸引消费者的注意？</div>
        <div class="header_num">
          <div>
            <span class="iconfont icon-a-shoucang1"></span>
            <span>14</span>
          </div>
          <div>
            <span class="iconfont icon-redian"></span>
            <span>238</span>
          </div>
          <div>
            <span class="iconfont icon-dianzan"></span>
            <span>2318</span>
          </div>
          <div>
            <span class="iconfont icon-aixin_shixin"></span>
            <span>388</span>
          </div>
        </div>
      </div>
      <ul class="content">
        <li>
          <el-image :src="detailDialogData.content.url" fit="cover" />
        </li>
        <li>
          <div class="author">
            <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
            <span class="authorName">stephenlee</span>
            <div class="attention">
              <span class="iconfont icon-shoucang1"></span>
              <span>关注</span>
            </div>
          </div>
          <div class="comment">
            <ul class="comment_inner">
              <li>
                <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
                <span>这幅图片是我精心制作表达对黑色外套的设计</span>
              </li>
            </ul>
          </div>
          <div class="operate">
            <div class="addComment">
              <span>添加评论……</span>
            </div>
            <div class="createBtn">
              <span class="iconfont icon-tupian2"></span>
              <span class="iconfont icon-fasong"></span>
              <div>创作</div>
            </div>
          </div>
        </li>
      </ul>
    </el-dialog>
  </div>
</template>
<script setup>
import { reactive, ref, defineEmits, defineProps } from 'vue';
import { useUserStore } from "../../../stores/user"

const userStore = useUserStore();
const props = defineProps({
  dialogVisible: Boolean,
  detailDialogData: Object,
});
const emit = defineEmits(['handleCloseDialog'])

const handleCloseDialog = () => {
  emit("handleCloseDialog")
}

//点击瀑布流图片
const router = useRouter();
const selectImage = () => {
  const { id, name } = props.detailDialogData;
  router.push({
    name: 'studiosCreate',
    query: { id, name }
  })
}
</script>
<style lang="scss" scoped>
div.studioDetail {
  ::v-deep {
    .el-dialog {
      width: 1100px;
      height: 724px;
      border-radius: 20px;
      background: #363535;
      header button {
        top: 0;
        right: -15px;
      }
      div.header {
        height: 92px;
        padding: 0 30px;
        box-sizing: border-box;
        margin-bottom: 24px;
        border-radius: 20px;
        background: #6D6A6A;
        display: flex;
        justify-content: space-between;
        align-items: center;
        >div.header_title {
          font-size: 24px;
          font-weight: 900;
          color: #FFFFFF;
        }
        >div.header_num {
          width: 400px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          span {
            font-size: 16px;
            color: #fff;
          }
        }
      }
      ul.content {
        width: 994px;
        height: 505px;
        margin-left: 33px;
        display: flex;
        justify-content: space-between;
        >li:first-child {
          width: 482px;
          height: 505px;
          border-radius: 30px;
          display: flex;
          align-items: center;
          .el-image {
            width: 100%;
            height: 100%;
            border-radius: 20px;
          }
        }
        >li:last-child {
          width: 482px;
          height: 505px;
          div.author {
            height: 65px;
            padding: 0 0 23px;
            border-bottom: 1px solid #2c2a2a;
            display: flex;
            align-items: center;
            .el-avatar {
              margin-right: 20px;
            }
            span.authorName {
              font-size: 16px;
              color: #fff;
              margin-right: 28px;
            }
            div.attention {
              width: 71px;
              height: 25px;
              line-height: 25px;
              text-align: center;
              border-radius: 20px;
              background: #EE16C3;
              font-weight: bold;
              font-size: 16px;
              color: #fff;
            }
          }
          div.comment {
            height: calc(100% - 110px);
            overflow: hidden;
            ul {
              margin-top: 30px;
              li {
                display: flex;
                align-items: center;
                .el-avatar {
                  margin-right: 20px;
                }
                span {
                  color: #fff;
                }
              }
            }
          }
          div.operate {
            height: 45px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            >div.addComment {
              font-size: 16px;
              font-weight: 900;
              color: #fff;
            }
            >div.createBtn {
              display: flex;
              justify-content: space-between;
              align-items: center;
              span {
                color: #fff;
                margin-right: 20px;
              }
              div {
                width: 91px;
                height: 35px;
                line-height: 35px;
                text-align: center;
                border-radius: 20px;
                background: #7b0caf;
                color: #fff;
              }
            }
          }
        }
      }
    }
  }
}
</style>
