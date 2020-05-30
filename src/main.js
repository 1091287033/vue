import 'babel-polyfill'
import fastclick from 'fastclick'
import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'
import 'common/stylus/index.styl'
/* 推荐用法 */
fastclick.attach(document.body)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App) /* function(createelments){
  return c(app)
  } */
})
