<template>
  <FixedHeader :title="siteTitle"/>

  <div id="app">
    <router-view></router-view>
  </div>
  <FixedFooter />
</template>

<script>
import FixedHeader from './components/Header.vue'
import FixedFooter from './components/Footer.vue'

export default {
  name: 'App',
  components: {
    FixedHeader,
    FixedFooter
  },
  data() {
    return {
      siteTitle: 'Ministering Tools'
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
