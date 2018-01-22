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

<style>
.card {
    width: 100px;
    height: 150px;
    background-color: red;
    border-radius: 4px;
    margin: 10px;
    display: inline-block;
    border: 1px solid #333;
}
.card.flipped {
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  background-color: transparent;
}
.card.matched {
  opacity: .2;
}
</style>