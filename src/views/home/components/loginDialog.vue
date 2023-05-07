<template>
  <div class="login">
    <el-dialog
      :model-value="dialogVisible"
      width="30%"
      :before-close="handleCloseDialog"
    >
      <template #header>
        <img src="../../../assets/img/login_logo.png" alt="">
      </template>
      <el-form
        ref="loginFormRef"
        label-width="100px"
        :model="loginForm"
        :rules="rules"
        style="max-width: 460px"
      >
        <el-form-item label="" prop="username">
          <el-input v-model="loginForm.username" placeholder="手机号"/>
        </el-form-item>
        <el-form-item label="" prop="password">
          <el-input v-model="loginForm.password" placeholder="密码"/>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <div class="weChatLogin" @click="handleCloseDialog">
            <img src="../../../assets/img/WechatIMG62.png" alt="">
            <span>微信登陆</span>
          </div>
          <div class="login" @click="handleLogin(loginFormRef)">
            登陆
          </div>
        </div>
      </template>
    </el-dialog>
  </div>
</template>
<script setup>
import JSEncrypt from 'jsencrypt/bin/jsencrypt.min';
import { reactive, ref, defineEmits, defineProps } from 'vue';
import { ElMessage } from 'element-plus';
import { login } from '../../../api/home';
import { useUserStore } from "../../../stores/user"

//状态管理
const userStore = useUserStore();

//定义组件属性
const props = defineProps({ dialogVisible: Boolean})
const emit = defineEmits(['handleCloseDialog'])
const loginFormRef = ref()
const loginForm = reactive({
  username: '15911064450',
  password: 'abcd1234'
})
const rules = reactive({
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
})

// 登录密码加密
const publicKey = 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAuM81gEYgChoIKH3fXbvq6K0IlX7Efi6OHQBjyX9ZylSLCC06HyP+Q9gEt3Xd4TrlFfQ7alijYw2CA8mCOA14GFDJa2Gctk8xMTb/ffoaxRiwEjUI9pOFpjTnn/lfIDhGhCOMLdmvVOaO9ym7voun4qnEv8fA6JtdDSOMxrTv5ODvzMnhsW2Z7Ljf0RKBUjeo0cPTwY2xvrXqycJQB7UL9RqbROrAP7NIfOJU0a9jw2y/tUBsPATTRXK7EFFDcRbjQKwX8LF+jUt/SL5x60dk69ZN8D0ni7/gUg6ZlRzTvoIZFTrOzuxHPwrtgpFsw6AcWJZxea1nF/RR0IYgAtUuLQIDAQAB'
const encrypt = (txt) => {
  const encryptor = new JSEncrypt()
  encryptor.setPublicKey(publicKey) // 设置公钥
  return encryptor.encrypt(txt) // 对需要加密的数据进行加密
}

// 登录
const handleLogin = (loginFormRef) => {
  loginFormRef.validate((valid, fields) => {
    if (valid) {
      const { username, password } = loginForm;
      const params = {
        username,
        password: encrypt(password)
      }
      login(params).then((res) => {
        ElMessage({
          message: '登陆成功！',
          type: 'success',
        })
        handleCloseDialog();
        //设置token;
        const { token, user } = res;
        const { user: userInfo } = user;
        userStore.setToken(token);
        userStore.setUserInfo(userInfo);
      })
    }
  })
}

const handleCloseDialog = () => {
  emit("handleCloseDialog")
}

</script>
<style lang="scss" scoped>
div.login {
  ::v-deep {
    .el-dialog {
      width: 460px;
      height: 311px;
      border-radius: 20px;
      background: #363535;
      .el-dialog__header {
        margin-right: 0;
        padding: 40px 110px 10px;
        box-sizing: border-box;
        img {
          width: 155px;
          height: 20px;
          display: block;
          margin: 0 auto;
        }
      }
      .el-dialog__body {
        padding: 0;
        .el-form-item {
          width: 372px;
          margin: 25px auto !important;
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
        padding: 0;
        div.dialog-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 44px;
          >div {
            width: 183px;
            height: 48px;
            line-height: 48px;
            text-align: center;
            border-radius: 20px;
            cursor: pointer;
            img {
              width: 20px;
              height: 16px;
              margin-right: 20px;
              vertical-align: middle;
            }
            &.weChatLogin {
              background: #fff;
              color: #000;
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
