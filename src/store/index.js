import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

const store = new Vuex.Store({
  state,
  mutations: {
    SET_USERINFO (state, userInfo) {
      state.userInfo = userInfo
    }
  },
  actions: {
    // _____login 页面 第四种没有下边 action
    // async login(store, payload){
    //   // console.log(payload);
    //   const data = await Vue.prototype.$axios.post('/login', payload)
    //   // console.log(data);
    //   if(data.code === 200){
    //     Vue.prototype.$message.success(data.msg)
    //     store.commit('SET_USERINFO', data.data)
    //     return true
    //   }else{
    //     Vue.prototype.$message.error(data.msg);
    //     return false
    //   }
    // }
  },
  plugins: [   // 每一次vuex 初始化的时候都会执行plugins 里的函数
    createPersistedState({
      storage: {
        getItem: key => sessionStorage.getItem(key),
        // Please see https://github.com/js-cookie/js-cookie#json, on how to handle JSON.
        setItem: (key, value) =>
          sessionStorage.setItem(key, value, { expires: 3, secure: true }),
        removeItem: key => sessionStorage.removeItem(key)
      }
    })
  ]
})

export default store
