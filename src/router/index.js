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
  },
  {
    path: '/:category',
    name: 'category',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/ItemList.vue'),
    beforeEnter: (to, from, next) => {
      store.commit('setNavBarTitle', 'category')
      next()
    },
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
