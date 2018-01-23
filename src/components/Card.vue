<template>
  <div class="card" v-on:click="flip" v-bind:class="{ flipped, matched }" v-bind:style="{ 'background-image': 'url(' + image + ')' }">
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
    flip: function flip() {
      if (this.matched || this.flipped) return;
      this.$emit('flip', this.id);
    }
  }
};
</script>

<style lang="stylus">
card-width = 100px
card-height = 150px
center(outer, inner)
  (outer - inner)/2
.card 
  width card-width
  height card-height
  background-color #57286B
  border-radius 4px
  margin 10px
  display inline-block
  position relative
  border 1px solid #333
  /* transform: rotateY(180deg);
  transition: 0.6s; */
  &:before
    border 1px solid #333
    border-radius 4px
    width 20px
    z-index 1
    background-color #e74c3c
    height 20px
    display inline-block
    position absolute
    top center(card-height, @height)
    left center(card-width, @width)
    transform rotate(45deg)
    content: ' '
  &:after
    width 100%
    background-color #FFD52A
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
  /* transform: rotateY(0deg); */

.card.matched 
  opacity .2

</style>