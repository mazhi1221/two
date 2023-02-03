<template>
    <div class="header">
        <div class="logoBox">
            <div class="img">
                <img src="../../assets/img/logo.png" alt="logo" />
            </div>
            <h2>禅</h2>
        </div>
        <div class="loginInfo">
            <el-switch 
                v-model="isDark"
                inline-prompt
                :active-icon="Moon"
                :inactive-icon="Sunny"
                style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
            />
        </div>
    </div>
</template>
<script setup>
import { useDark } from '@vueuse/core'
import { Sunny, Moon } from '@element-plus/icons-vue'

const isDark = useDark({
    valueDark: 'dark',
    valueLight: 'light',
})

</script>
<style lang="scss" scoped>
div.header {
    width: 100%;
    height: 100%;
    padding: 0 22px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    div.logoBox {
        display: flex;
        align-items: center;
        div.img {
            width: 31px;
            height: 31px;
            margin-right: 12px;

            img {
                width: 100%;
            }
        }

        h2 {
            font-size: 20px;
            color: #fff;
            font-weight: normal;
        }
    }
    div.loginInfo {
        display: flex;
        align-items: center;
        font-size: 16px;
        color: #fff;
    }
}
</style>
