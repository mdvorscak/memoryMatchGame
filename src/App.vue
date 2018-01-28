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

html, body
  height 100%

body 
  margin 0
  display flex
  flex-direction column
  color theme-black
  font-family 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale

footer
  text-align center
  margin 10px 0
  & .redheart
    color theme-red

#app 
  flex 1 0 auto
</style>
