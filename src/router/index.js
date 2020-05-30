import Vue from 'vue'
import Router from 'vue-router'
/* 引入所有的路由组件 */
import Rank from '../components/rank/rank.vue'
import Recommend from '../components/recommend/recommend.vue'
import Search from '../components/search/search.vue'
import Singer from '../components/singer/singer.vue'

/* 使用router */
Vue.use(Router)

export default new Router({
  routes: [
    {path: '/', redirect: '/recommend'},
    {path: '/rank', component: Rank},
    {path: '/recommend', component: Recommend},
    {path: '/seqrch', component: Search},
    {path: '/singer', component: Singer}
  ]
})