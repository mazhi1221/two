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
createApp(App).use(VueAxios, axios);

//定义一个应用级的错误处理器，它将捕获所有由子组件上抛而未被处理的错误：
app.config.errorHandler = (err) => {
  alert(err);
}

//动态绑定多个值
//某些指令会需要一个“参数”，在指令名后通过一个冒号隔开做标识。 这里 href 就是一个参数 | 这里的参数是要监听的事件名称
//在指令参数上也可以使用一个 JavaScript 表达式，需要包含在一对方括号内
//使用 reactive() 函数创建一个响应式对象或数组，在 Vue 中，状态都是默认深层响应式的。
//只有代理对象是响应式的，更改原始对象不会触发更新。因此，使用 Vue 的响应式系统的最佳实践是 仅使用你声明对象的代理版本。
//要在组件模板中使用响应式状态，需要在 setup() 函数中定义并返回。当使用单文件组件（SFC）时，我们可以使用 <script setup> 来大幅度地简化代码。

//为保证访问代理的一致性，对同一个原始对象调用 reactive() 会总是返回同样的代理对象，而对一个已存在的代理对象调用 reactive() 会返回其本身：


app.use(router)
app.mount('#app')
