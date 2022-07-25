import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store/index'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter: (to, from, next) => {
      store.commit('setNavBarTitle', 'Home')
      next()
    },
  },
  {
    path: '/meubles',
    name: 'meubles',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/meubles.vue'),
    beforeEnter: (to, from, next) => {
      store.commit('setNavBarTitle', 'meubles')
      next()
    },
  },
  {
    path: '/bureaux',
    name: 'bureaux',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/bureaux.vue'),
    beforeEnter: (to, from, next) => {
      store.commit('setNavBarTitle', 'bureaux')
      next()
    },
  },
  {
    path: '/Chaises',
    name: 'Chaises',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Chaises.vue'),
    beforeEnter: (to, from, next) => {
      store.commit('setNavBarTitle', 'Chaises')
      next()
    },
  },
  {
    path: '/scolaires',
    name: 'scolaires',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/scolaires.vue'),
    beforeEnter: (to, from, next) => {
      store.commit('setNavBarTitle', 'scolaires')
      next()
    },
  },
  {
    path: '/:category/item/:id',
    name: 'item',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/item.vue'),
    beforeEnter: (to, from, next) => {
      store.commit('setNavBarTitle', 'item')
      next()
    },
  },
  {
    path: '/login',
    name: 'login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/login.vue'),
    beforeEnter: (to, from, next) => {
      if (store.state.authenticated) {
        store.commit('setNavBarTitle', 'Panel')
        next({ name: 'users' })
      }else{
        store.commit('setNavBarTitle', 'login')
        next()
      }
      
    },
  },
  {
    path: '/panel/users',
    name: 'users',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/users.vue') ,
    beforeEnter: (to, from, next) => {
      if (store.state.authenticated) {
        store.commit('setNavBarTitle', 'Panel')
        next()
      } else {
        console.log('auth not OK')

        next({ name: 'login' })
      }
    },
  },
  {
    path: '/panel/items',
    name: 'items',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/items.vue') ,
    beforeEnter: (to, from, next) => {
      if (store.state.authenticated) {
        store.commit('setNavBarTitle', 'Panel')
        next()
      } else {
        console.log('auth not OK')

        next({ name: 'login' })
      }
    },
  },
  {
    path: '/panel/items/:id',
    name: 'panel item',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/panel_item.vue') ,
    beforeEnter: (to, from, next) => {
      if (store.state.authenticated) {
        store.commit('setNavBarTitle', 'Panel')
        next()
      } else {
        console.log('auth not OK')

        next({ name: 'login' })
      }
    },
  },
  {
    path: '/panel/sold',
    name: 'sold',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/sold.vue') ,
    beforeEnter: (to, from, next) => {
      if (store.state.authenticated) {
        store.commit('setNavBarTitle', 'Panel')
        next()
      } else {
        console.log('auth not OK')

        next({ name: 'login' })
      }
    },
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
