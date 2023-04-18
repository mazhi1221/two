<template>
  <div class="studioDetail">
    <el-dialog
      width="30%"
      :model-value="dialogVisible"
      :before-close="handleCloseDialog"
    >
      <ul class="content">
        <li>
          <img :src="detailDialogData.content.url" alt="">
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
            <div class="num">
              <span class="iconfont icon-daohangshoucangyishoucang"></span>
              <span>25</span>
            </div>
            <div class="num">
              <span class="iconfont icon-24gf-bookmarks"></span>
              <span>14</span>
            </div>
            <div class="btn" @click="selectImage">
              <span>编辑</span>
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
      ul.content {
        width: 994px;
        height: 621px;
        margin-left: 33px;
        display: flex;
        justify-content: space-between;
        >li:first-child {
          width: 482px;
          height: 621px;
          border-radius: 30px;
          display: flex;
          align-items: center;
          img {
            width: 100%;
          }
        }
        >li:last-child {
          width: 482px;
          height: 621px;
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
            div.num {
              span {
                font-size: 22px;
                font-weight: 500;
                line-height: 35px;
                color: #fff;
                &:first-child {
                  margin-right: 30px;
                }
              }
            }
            div.btn {
              width: 117px;
              height: 45px;
              line-height: 45px;
              text-align: center;
              border-radius: 20px;
              background: #860AB8;
              font-size: 22px;
              font-weight: 500;
              color: #fff;
              cursor: pointer;
            }
          }
        }
      }
    }
  }
}
</style>
