<template>
    <div class="header">
        <div class="logoBox">
            <div class="img">
                <img src="../../assets/img/logo.png" alt="logo" />
            </div>
            <h2>智慧运行系统</h2>
        </div>
        <div class="loginInfo">
            <el-switch 
                v-model="theme"
                inline-prompt
                :active-icon="Moon"
                :inactive-icon="Sunny"
                style="--el-switch-on-color: #ff0000; --el-switch-off-color: #409eff"
            />
        </div>
    </div>
</template>
<script setup>
import { useDark } from '@vueuse/core'
import { Sunny, Moon } from '@element-plus/icons-vue'

//html元素标签类名为 dark 或 空
//el-theme-appearance = auto, 随系统模式切换
//el-theme-appearance = light, 不随系统模式切换，为白天模式

const theme = useDark()

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
            font-weight: normal;
        }
    }
    div.loginInfo {
        display: flex;
        align-items: center;
        font-size: 16px;
    }
}
</style>
