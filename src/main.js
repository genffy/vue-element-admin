import Vue from 'vue'

import Cookies from 'js-cookie'

import 'normalize.css/normalize.css' // a modern alternative to CSS resets

import Element from 'element-ui'
import './styles/element-variables.scss'
import enLang from 'element-ui/lib/locale/lang/en'// 如果使用中文语言包请默认支持，无需额外引入，请删除该依赖

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import './icons' // icon
import './permission' // permission control
import './utils/error-log' // error log

import * as filters from './filters' // global filters

// qiankun
import { registerMicroApps, start } from 'qiankun'

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

Vue.use(Element, {
  size: Cookies.get('size') || 'medium', // set element-ui default size
  locale: enLang // 如果使用中文，无需设置，请删除
})

// register global utility filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

try {
  registerMicroApps([
    {
      name: 'chartsPage', // app name registered
      // entry: '//localhost:9527/charts.html',
      entry: { scripts: ['//localhost:9527/static/js/charts.js'] },
      container: '#page-charts',
      activeRule: (location) => {
        const isActive = location.hash.startsWith('#/charts')
        console.log('chartsPage isActive', isActive)
        return isActive
      }
    },
    {
      name: 'componentsPage', // app name registered
      // entry: '//localhost:9527/components.html',
      entry: { scripts: ['//localhost:9527/static/js/components.js'] },
      container: '#page-components',
      activeRule: (location) => {
        const isActive = location.hash.startsWith('#/components')
        console.log('componentsPage isActive', isActive)
        return isActive
      }
    },
    {
      name: 'nestedPage', // app name registered
      // entry: '//localhost:9527/nested.html',
      entry: { scripts: ['//localhost:9527/static/js/nested.js'] },
      container: '#page-nested',
      activeRule: (location) => {
        const isActive = location.hash.startsWith('#/nested')
        console.log('nestedPage isActive', isActive)
        return isActive
      }
    },
    {
      name: 'tablePage', // app name registered
      // entry: '//localhost:9527/table.html',
      entry: { scripts: ['//localhost:9527/static/js/table.js'] },
      container: '#page-table',
      activeRule: (location) => {
        const isActive = location.hash.startsWith('#/table')
        console.log('tablePage isActive', isActive)
        return isActive
      }
    }
  ])
} catch (e) {
  console.error('注册/启动子应用失败')
}

new Vue({
  el: '#app',
  router,
  store,
  mounted() {
    setTimeout(() => {
      start()
    })
  },
  render: h => h(App)
})
