<template>
  <div id="app">
   <m-header></m-header>
   <tab></tab>
   <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
import MHeader from './components/m-header/m-header.vue'
import Tab from './components/tab/tab.vue'
/* 本质上是class 标签是小写 而且可以不用驼峰 */
export default {
  name: 'App',
  components: {
    MHeader,
    Tab
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
