import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    classMap: ['decrease', 'discount', 'special', 'invoice', 'guarantee']
  }
})
