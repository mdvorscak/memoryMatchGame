<template>
  <div class="card" 
    @click="flip" 
    :class="{ flipped, matched }" 
    :style="backgroundImage"
  >
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: Number,
      required: true
    },
    position: {
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
      // prevent an already flipped card from being flipped again
      if (this.matched || this.flipped) return;
      /** @event GameCard#flip
        * @type {Array[number]}
        * @param id - the id of the card
        * @param position - the position of the card
       */
      this.$emit('flip', this.id, this.position);
    }
  },
  computed: {
    /** @description Used to obfuscate the cards url, to prevent cheating by inspecting the cards.
     *    Will only appear if the card is flipped up, used by the card's style attribute
     */
    backgroundImage() {
      return this.image && this.flipped ? { 'background-image': `url(${this.image})` } : {};
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