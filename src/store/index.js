import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router/index.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    authenticated: localStorage.getItem('auth') ? true : false,
    role: localStorage.getItem('role') || 'null',
    user: {},
    NavBarTitle: 'Dashboard',
  },
  getters: {
  },
  mutations: {
    authenticate: (state , status) => {
      state.authenticated = status
    },
    setRole: (state, payload) => {
      state.role = payload
    },
    setUser: (state, payload) => {
      state.user = payload
    },
    setNavBarTitle: (state, payload) => {
      state.NavBarTitle = payload
    }
  },
  actions: {
    getUser(context) {
      Vue.axios.post('/check-login').then(
        res => {
          console.log(res)
          context.commit('setUser', res.data)
        }
      ).catch((error)=>{
        if(error.response.status == 401){
          context.dispatch('logout')
        }
      })
    },
    logout(context) {
      localStorage.removeItem('auth')
      localStorage.removeItem('role')
      localStorage.removeItem('token')

      context.commit('authenticate', false)
      context.commit('setRole', null)
      context.commit('setUser', {})

      Vue.axios.post('/logout').then(res => {
        console.log('logout request')
        console.log(res)

      }).catch((err) => {
        console.log('logout error')
        console.log(err)
      })
      if (!(router.currentRoute.name == 'login')) {
        router.push({ name: 'login' })
      }
    },
  },
  modules: {
  }
})
