<template>
  <div id="app">
    <game :numberOfCards="1" :numberOfMatches="2"/>
  </div>
</template>

<script>
import Game from '@/components/Game';

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
