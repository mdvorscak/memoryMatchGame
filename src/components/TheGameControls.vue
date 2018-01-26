<template>
  <button 
    class="reset" 
    :disabled="!(gameActive || gameOver)" 
    @click="reset"
    :class="{ gameActive, gameOver}" 
    v-text="label"
  ></button>
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
    /** @description fires the reset event if the button could be clicked. */
    reset() {
      /** This is the 'server side' validation that the disabled status hasn't been tampered with */
      if (this.gameActive || this.gameOver) {
        /** @event TheGameControls#reset
         *  @see TheGame#resetBoard()
         */
        this.$emit('reset');
      }
    }
  },
  computed: {
    /** @description Will return the correct label based on play state */
    label() {
      return this.gameOver ? 'Play Again' : 'Reset Game';
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