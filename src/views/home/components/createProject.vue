<template>
  <div class="createProject">
    <el-dialog
      title="创建新口袋"
      width="30%"
      :model-value="dialogVisible"
      :before-close="handleCloseDialog"
    >
      <el-form
        ref="createFormRef"
        label-width="100px"
        :model="createForm"
        :rules="rules"
        style="max-width: 460px"
      >
        <el-form-item label="" prop="name">
          <el-input v-model="createForm.name" placeholder="口袋名称"/>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <div class="cancel" @click="handleCloseDialog">
            取消
          </div>
          <div class="login" @click="handleCreate(createFormRef)">
            创建
          </div>
        </div>
      </template>
    </el-dialog>
  </div>
</template>
<script setup>
import { reactive, ref, defineEmits, defineProps } from 'vue';
import { ElMessage } from 'element-plus'
import { createStudio } from '../../../api/home';
import { useRouter } from 'vue-router';

//定义组件属性
const props = defineProps({ dialogVisible: Boolean})
const emit = defineEmits(['handleCloseDialog'])
const createFormRef = ref()
const createForm = reactive({ name: '' })
const rules = reactive({
  name: [{ required: true, message: '请输入口袋名称', trigger: 'blur' }],
})

// 创建
const router = useRouter();
const handleCreate = (createFormRef) => {
  createFormRef.validate((valid, fields) => {
    if (valid) {
      const { name } = createForm;
      const params = { name };
      createStudio(params).then((res) => {
        const { id, name, createBy, createTime } = res;
        handleCloseDialog();
        router.push({
          name: 'studiosCreate',
          query: { id, name }
        })
        ElMessage({
          message: '创建成功！',
          type: 'success',
        })
      })
    }
  })
}

const handleCloseDialog = () => {
  emit("handleCloseDialog")
}

</script>
<style lang="scss" scoped>
div.createProject {
  ::v-deep {
    .el-dialog {
      width: 414px;
      height: 282px;
      border-radius: 20px;
      background: #363535;
      .el-dialog__header {
        margin-right: 0;
        padding: 40px 110px 0;
        box-sizing: border-box;
        text-align: center;
        span {
          font-size: 22px;
          font-weight: 900;
          color: #FFFFFF;
        }
      }
      .el-dialog__body {
        padding: 0;
        .el-form-item {
          width: 306px;
          margin: 25px 54px !important;
          .el-form-item__content {
            margin-left: 0 !important;
            .el-input {
              width: 100%;
              height: 44px;
              .el-input__wrapper {
                border-radius: 20px;
                padding: 1px 20px;
              }
            }
          }
        }
      }
      .el-dialog__footer {
        padding: 50px 0 0;
        div.dialog-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 54px;
          >div {
            width: 126px;
            height: 44px;
            border-radius: 30px;
            line-height: 44px;
            text-align: center;
            cursor: pointer;
            &.cancel {
              background: #fff;
            }
            &.login {
              background: #860AB8;
              color: #ffffff;
            };
          }
        }
      }
    }
  }
}
</style>
