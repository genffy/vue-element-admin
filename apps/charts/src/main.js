import Vue from 'vue'

import Cookies from 'js-cookie'

import Router from 'vue-router'

import 'normalize.css/normalize.css' // a modern alternative to CSS resets

import Element from 'element-ui'
// import '@/styles/element-variables.scss'
import enLang from 'element-ui/lib/locale/lang/en'// 如果使用中文语言包请默认支持，无需额外引入，请删除该依赖

// import '@/styles/index.scss' // global css

import App from './App'
// import store from '@/store'
// import routes from './route'

// import '@/icons' // icon
// import '@/permission' // permission control
// import '@/utils/error-log' // error log

// import * as filters from '@/filters' // global filters

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../../../mock')
  mockXHR()
}
Vue.use(Router)

Vue.use(Element, {
  size: Cookies.get('size') || 'medium', // set element-ui default size
  locale: enLang // 如果使用中文，无需设置，请删除
})

// // register global utility filters
// Object.keys(filters).forEach(key => {
//   Vue.filter(key, filters[key])
// })

Vue.config.productionTip = false

const page_id = '#page-charts'

let router = null
let instance = null

function render(props = {}) {
  const { container } = props
  router = new Router({
    // base: window.__POWERED_BY_QIANKUN__ ? '/vue' : '/',
    // mode: 'history',
    scrollBehavior: () => ({ y: 0 }),
    // routes
  })

  instance = new Vue({
    router,
    // store,
    render: h => h(App)
  }).$mount(container ? container.querySelector(page_id) : page_id)
}

if (!window.__POWERED_BY_QIANKUN__) {
  render()
}
function storeTest(props) {
  props.onGlobalStateChange &&
    props.onGlobalStateChange(
      (value, prev) => console.log(`[onGlobalStateChange - ${props.name}]:`, value, prev),
      true
    )
  props.setGlobalState &&
    props.setGlobalState({
      ignore: props.name,
      user: {
        name: props.name
      }
    })
}
/**
 * bootstrap 只会在微应用初始化的时候调用一次，下次微应用重新进入时会直接调用 mount 钩子，不会再重复触发 bootstrap。
 * 通常我们可以在这里做一些全局变量的初始化，比如不会在 unmount 阶段被销毁的应用级别的缓存等。
 */
export async function bootstrap() {
  console.log('[vue] vue app bootstraped')
}
/**
 * 应用每次进入都会调用 mount 方法，通常我们在这里触发应用的渲染方法
 */
export async function mount(props) {
  console.log('[vue] props from main framework', props)
  storeTest(props)
  render(props)
}
/**
 * 应用每次 切出/卸载 会调用的方法，通常在这里我们会卸载微应用的应用实例
 */
export async function unmount() {
  instance.$destroy()
  instance.$el.innerHTML = ''
  instance = null
  router = null
}
/**
 * 可选生命周期钩子，仅使用 loadMicroApp 方式加载微应用时生效
 */
export async function update(props) {
  console.log('update props', props)
}
