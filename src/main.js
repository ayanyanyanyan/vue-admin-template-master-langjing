import Vue from 'vue'


import 'normalize.css/normalize.css' // A modern alternative to CSS resets
import ElementUI from 'element-ui'

import { ElementTiptapPlugin } from 'element-tiptap';
import 'element-tiptap/lib/index.css';

import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/index.scss' // global css
import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon


if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

// Vue.use(VueQuillEditor)

Vue.use(ElementUI)
// 安装 element-tiptap 插件
Vue.use(ElementTiptapPlugin, {
  lang: "zh", // 见 i18n
  spellcheck: true, // 可被 editor 同名 prop 重写
});
// 现在你已经在全局注册了 `el-tiptap` 组件。
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
