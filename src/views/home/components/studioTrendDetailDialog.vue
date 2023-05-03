<template>
  <div class="studioDetail">
    <el-dialog
      width="1284"
      :model-value="dialogVisible"
      :before-close="handleCloseDialog"
    >
      <ul class="content">
        <li>
          <el-image height="100%" :src="detailDialogData.url" fit="cover" />
        </li>
        <li>
          <div class="description">
            <p>{{ detailDialogData.description}}</p>
            <p>
              <span>Prompt建议：</span>
              <span>{{ detailDialogData.prompt }}</span>
            </p>
          </div>
          <div class="operate">
            <div class="createBtn">
              <el-avatar
                size="small"
                src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
              />
              <span>stephenlee</span>
              <span class="iconfont icon-shoucang"></span>
            </div>
            <div class="create" @click="selectImage">创作</div>
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
        height: 614px;
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
          display: flex;
          justify-content: space-between;
          flex-direction: column;
          div.description {
            flex: 1;
            p:first-child {
              font-size: 16px;
              font-weight: 500;
              color: #FFFFFF;
              margin-bottom: 20px;
            }
            p:last-child {
              font-size: 14px;
              font-weight: 500;
              color: #FFFFFF;
            }
          }
          div.operate {
            height: 45px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            >div.createBtn {
              display: flex;
              justify-content: space-between;
              align-items: center;
              span {
                color: #fff;
                margin-right: 20px;
              }
            }
            >div.create {
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
</style>
