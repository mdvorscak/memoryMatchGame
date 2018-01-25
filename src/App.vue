<template>
  <div id="app">
    <game :numberOfCards="12" :numberOfMatches="2"/>
  </div>
</template>

<script>
import Game from '@/components/TheGame';

export default {
  components: {
    Game
  }
};
</script>

<style lang="stylus">
@import 'common/theme'

body 
  margin 0

#app 
  font-family 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  color theme-black
</style>
