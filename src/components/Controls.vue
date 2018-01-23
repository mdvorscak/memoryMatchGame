<template>
  <button class="reset" :disabled="!gameActive" v-on:click="reset" v-bind:class="{ gameActive, gameOver}">Reset Game</button>
</template>

<script>
export default {
  props: {
    gameOver: {
      type: Boolean,
      required: true
    },
    gameActive: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    reset() {
      this.$emit('reset');
    }
  }
};
</script>

<style lang="stylus">
@import '../common/theme'
colorButton(new-color, hover = true)
  border-color new-color
  background-color lighten(new-color, 30)
  if hover
    &:hover
      background-color lighten(new-color, 20)
  
button.reset
    colorButton(#999, false)
    color theme-black
    border 1px solid
    margin 0 10px
    border-radius 3px
    display inline-block
    padding 0 30px
    vertical-align middle
    font-size 14px
    line-height 37px
    text-align center
    text-transform uppercase
    transition .1s ease-in-out
    transition-property color, background-color, border-color
    &:focus:not(:&:disabled)
        outline none 
        border-color #3498db
    &:disabled
      opacity: .3
    &.gameActive
      colorButton(theme-red)
    &.gameOver
      colorButton(theme-green)
</style>