<template>
  <div class="login">
    <el-dialog
      :model-value="dialogVisible"
      title="欢迎您登录"
      width="30%"
      :before-close="handleClose"
    >
      <el-form
        ref="loginFormRef"
        label-position="top"
        label-width="100px"
        :model="loginForm"
        :rules="rules"
        style="max-width: 460px"
      >
        <el-form-item label="用户名">
          <el-input v-model="loginForm.username" />
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="loginForm.password" />
        </el-form-item>
      </el-form>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handleLogin(loginFormRef)">登录</el-button>
          <el-button type="primary" @click="dialogVisible = false">
            取消
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script setup>
import JSEncrypt from 'jsencrypt/bin/jsencrypt.min'
import { login } from '@/api/login.js'
import { reactive, ref } from 'vue'

const props = defineProps({
  dialogVisible: Boolean
})
const loginFormRef = ref()

const loginForm = reactive({
  username: '',
  password: ''
})

const rules = reactive({
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
})

// 登录密码加密
const publicKey =
  'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAuM81gEYgChoIKH3fXbvq6K0IlX7Efi6OHQBjyX9ZylSLCC06HyP+Q9gEt3Xd4TrlFfQ7alijYw2CA8mCOA14GFDJa2Gctk8xMTb/ffoaxRiwEjUI9pOFpjTnn/lfIDhGhCOMLdmvVOaO9ym7voun4qnEv8fA6JtdDSOMxrTv5ODvzMnhsW2Z7Ljf0RKBUjeo0cPTwY2xvrXqycJQB7UL9RqbROrAP7NIfOJU0a9jw2y/tUBsPATTRXK7EFFDcRbjQKwX8LF+jUt/SL5x60dk69ZN8D0ni7/gUg6ZlRzTvoIZFTrOzuxHPwrtgpFsw6AcWJZxea1nF/RR0IYgAtUuLQIDAQAB'
const encrypt = (txt) => {
  const encryptor = new JSEncrypt()
  encryptor.setPublicKey(publicKey) // 设置公钥
  return encryptor.encrypt(txt) // 对需要加密的数据进行加密
}

// 登录
const handleLogin = (loginFormRef) => {
  loginFormRef.validate((valid, fields) => {
    if (valid) {
      const params = {
        ...loginForm.value,
        password: encrypt(loginForm.value.password)
      }
      login(params).then((res) => {
        const { token, user } = res
        // this.$store.commit('setUser', 'Bearer ' + token)
      })
    }
  })
}

const handleClose = () => {}
</script>
<style lang="scss" scoped>
</style>