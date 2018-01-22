<template>
  <div class="card" v-on:click="flip" v-bind:class="{ flipped, matched }">
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
    }
  },
  methods: {
    flip: function flip() {
      if (this.matched) return;
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
}
.card.flipped {
  background-color: green;
}
.card.matched {
  opacity: .2;
}
</style>