<template>
  <div class="studioDetail">
    <el-dialog
      width="30%"
      :model-value="dialogVisible"
      :before-close="handleCloseDialog"
    >
      <ul class="content">
        <li>
          <el-image :src="detailDialogData.content.url" fit="cover" />
        </li>
        <li>
          <div class="description">
            黑色将成为席卷核心及时尚单品的关键色彩，采用包括黑色调与法式海军蓝在内的核心色调搭配神秘的鸭青色与午夜粽，结合不同肌理及光泽的材质，在丰富视觉层次的同时易于搭配。另外，全黑色造型及暗色的印花值得关注。棕色系作为该调色盘的底色，顺应复古美学。智能蓝与橙色的组合可用于日常搭配，小面积的酸橙色色块可用于造型点缀，也可以考虑运用在印花中。该色盘尤其适用于年轻与运动市场。
          </div>
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
                <div class="message_">
                  <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
                  <span>这幅图片是我精心制作表达对黑色外套的设计</span>
                </div>
                <div class="operate_">
                  <div class="left">
                    <span>回复</span>
                  </div>
                  <div class="right">
                    <span>查看/收起回复</span>
                  </div>
                </div>
                <ul class="son_comment_inner">
                  <li>
                    <div>
                      <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
                      <span>这幅图片是我精心制作表达对黑色外套的设计</span>
                    </div>
                    <div class="a">
                      <img class="big" src="http://bucket-bangxiehui-1.oss-cn-beijing.aliyuncs.com/assets/IMG_0721.PNG" alt="">
                    </div>
                    <div class="a">
                      <span>回复</span>
                    </div>
                  </li>
                </ul>
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
              <div @click="selectImage">创作</div>
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
        height: 615px;
        margin-left: 33px;
        display: flex;
        justify-content: space-between;
        >li:first-child {
          width: 482px;
          height: 100%;
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
          height: 100%;
          div.description {
            font-size: 16px;
            color: #FFFFFF;
            margin-bottom: 20px;
          }
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
            height: calc(100% - 305px);
            overflow: hidden;
            >ul.comment_inner {
              margin-top: 30px;
              >li {
                div.message_ {
                  display: flex;
                  align-items: center;
                  .el-avatar {
                    margin-right: 20px;
                  }
                  span {
                    color: #fff;
                  }
                }
                div.operate_ {
                  display: flex;
                  justify-content: space-between;
                  margin-bottom: 10px;
                  span {
                    color: #fff;
                  }
                }
                ul.son_comment_inner {
                  padding-left: 20px;
                  box-sizing: border-box;
                  li {
                    div {
                      display: flex;
                      align-items: center;
                      &.a {
                        padding-left: 60px;
                        box-sizing: border-box;
                      }
                      .el-avatar {
                        margin-right: 20px;
                      }
                      span {
                        color: #fff;
                      }
                      img.big {
                        width: 100px;
                        height: 100px;
                      }
                    }
                  }
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
                cursor: pointer;
              }
            }
          }
        }
      }
    }
  }
}
</style>
