import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import './assets/main.css'
import 'element-plus/theme-chalk/dark/css-vars.css'

const app = createApp(App)

//引入ElementPlus
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import zhCn from 'element-plus/dist/locale/zh-cn.mjs';
app.use(ElementPlus, {
  locale: zhCn,
});

//引入axios
import axios from 'axios'
import VueAxios from 'vue-axios'
app.use(VueAxios, axios);

//定义一个应用级的错误处理器，它将捕获所有由子组件上抛而未被处理的错误：
app.config.errorHandler = (err) => {
  alert(err);
}

app.use(router)
app.mount('#app')
