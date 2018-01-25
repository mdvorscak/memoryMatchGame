<template>
  <div class="card" v-on:click="flip" v-bind:class="{ flipped, matched }" v-bind:style="backgroundImage">
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: Number,
      required: true
    },
    matched: {
      type: Boolean,
      required: true
    },
    flipped: {
      type: Boolean,
      required: true
    },
    image: {
      type: String,
      required: false
    }
  },
  methods: {
    flip() {
      if (this.matched || this.flipped) return;
      this.$emit('flip', this.id);
    }
  },
  computed: {
    backgroundImage() {
      return this.image ? { 'background-image': `url(${this.image})` } : {};
    }
  }
};
</script>

<style lang="stylus">
@import '../common/theme'
@import '../common/app'
@import '../common/card-dimensions'

center(outer, inner)
  (outer - inner)/2
.card 
  width card-width
  height card-height
  background-color theme-purple
  border-radius app-border-radius
  margin app-space
  display inline-block
  position relative
  border app-border
  &:before
    border app-border
    border-radius app-border-radius
    width 20px
    z-index 1
    background-color theme-red
    height 20px
    display inline-block
    position absolute
    top center(card-height, @height)
    left center(card-width, @width)
    transform rotate(45deg)
    content: ' '
  &:after
    width 100%
    background-color theme-gold
    height 40px
    display inline-block
    position absolute
    top center(card-height, @height)
    content: ' '
    
.card.flipped 
  background-size contain
  background-repeat no-repeat
  background-position center
  background-color transparent
  &:before
  &:after
    display none 

.card.matched 
  opacity .2

</style>