// import Vue from 'vue'
// import Router from 'vue-router'
import routerConf from '../../router/modules/table'
import App from './App'
routerConf.component = App
// Vue.use(Router)
// const createRouter = () => new Router({
//   // mode: 'history', // require service support
//   scrollBehavior: () => ({ y: 0 }),
//   routes: [routerConf]
// })

// const router = createRouter()

export default [routerConf]
