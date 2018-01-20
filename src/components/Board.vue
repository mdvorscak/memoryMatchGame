<template>
  <div id="board">
    <div v-for="card in cards" :key="card.id">
      <card :id="card.id" />
    </div>
  </div>
</template>

<script>
import Card from '@/components/Card';

const cards = [];
for (let x = 0; x < 24; x++) {
  cards.push({ id: x });
}
export default {

  data() {
    return {
      cards
    };
  },
  components: {
    Card
  }
};
</script>

<style>
</style>
