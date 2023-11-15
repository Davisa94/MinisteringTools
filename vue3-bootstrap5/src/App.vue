<template>
  <FixedHeader :title="siteTitle"/>

  <img alt="Vue logo" src="./assets/logo.png">
  <HelloWorld msg="Welcome to Your Vue.js App"/>
  <FixedFooter />
</template>

<script>
import FixedHeader from './components/Header.vue'
import HelloWorld from './components/HelloWorld.vue'
import FixedFooter from './components/Footer.vue'

export default {
  name: 'App',
  components: {
    FixedHeader,
    HelloWorld,
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
