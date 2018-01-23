<template>
  <button class="reset" v-on:click="reset">Reset Game</button>
</template>

<script>
export default {
  props: {
    gameOver: {
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
hover-color = #e3e3e3
button.reset
    background-color #f3f3f3
    color #333
    border 1px solid #9c9c9c
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
    &:focus
        outline none 
        border-color #3498db
        background-color hover-color
    &:hover
        background-color hover-color
</style>