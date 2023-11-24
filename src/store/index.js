import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    sdata: ''
  },
  // 使用 vuex-persistedstate 插件
  plugins: [
    createPersistedState({
      // 配置项
      key: 'my-app', // 用于本地存储中的键名
      storage: window.localStorage, // 存储引擎，可以是 localStorage 或 sessionStorage
      paths: ['sdata']// 要持久化的状态路径
    })
  ],
  mutations: {
    updatesdata(state, newsdata) {
      state.sdata = newsdata
    }
  },
  modules: {
    app,
    settings,
    user
  },
  getters
})

export default store
