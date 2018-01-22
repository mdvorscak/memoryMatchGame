<template>
  <div id="game">
      <h2 class="messageBanner" v-text="currentMessage"></h2>
      <div id="board">
        <card v-for="card in cards" :key="card.id" :id="card.id" v-on:flip="flipCard" :matched="card.matched" :flipped="card.flipped" />
      </div>
  </div>
</template>

<script>
import shuffle from 'shuffle-array';
import Card from '@/components/Card';
import cardProvider from '@/services/cardProvider';

export default {
  props: {
    numberOfCards: {
      type: Number,
      required: true
    },
    numberOfMatches: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      cards: [],
      /**
       * maps between the underlying card id and the displayed card id, like this:
       * displayedId: underlyingId
       * note: there should be twice as many displayedIds as underlying Ids
       * (since each card will have 1 duplicate)
       */
      cardMap: new Map(),
      cardDataModels: [],
      matchFound: false,
      flippingActive: false,
      currentlyFlipped: -1,
      currentMessage: 'Click a card to begin'
    };
  },
  created() {
    // get the underlying card models
    this.cardDataModels = cardProvider(this.numberOfCards);
    // prepare the available ids
    const cardsViewModelsSize = this.numberOfCards * this.numberOfMatches;
    const availableIds = [];
    for (let i = 0; i < cardsViewModelsSize; i++) {
      availableIds.push(i);
    }
    // Randomize the order
    shuffle(availableIds);
    // Map the dataModel to the view model
    let currentDataModel;
    let currentId;
    for (let i = 0; i < this.numberOfCards; i++) {
      currentDataModel = this.cardDataModels[i];
      for (let x = 0; x < this.numberOfMatches; x++) {
        currentId = availableIds.pop();
        this.cards[currentId] = { id: currentId, matched: false, flipped: false };
        this.cardMap.set(currentId, currentDataModel.id);
      }
    }
  },
  components: {
    Card
  },
  methods: {
    flipCard: function flipCard(id) {
      // Vue.set(this.cards, id, this.cards[id].flipped = true);
      this.cards[id].flipped = true;
      this.$set(this.cards, id, this.cards[id]);
      if (this.cardMap.get(this.currentlyFlipped) === this.cardMap.get(id)) {
        this.correctMatch(id);
      } else if (this.flippingActive) {
        this.incorrectMatch(id);
      } else {
        // First card flipped
        this.currentlyFlipped = id;
        this.flippingActive = true;
      }
    },
    correctMatch: function correctMatch(id) {
      this.currentMessage = 'You found a match!';
      // set both of the cards to matched
      this.cards[id].matched = true;
      this.$set(this.cards, id, this.cards[id]);
      this.cards[this.currentlyFlipped].matched = true;
      this.$set(this.cards, this.currentlyFlipped, this.cards[this.currentlyFlipped]);
      this.matchFound = true;
      this.resetCards();
    },
    incorrectMatch: function correctMatch(id) {
      this.currentMessage = 'Try again';
      // flip both cards back down
      this.cards[id].flipped = false;
      this.$set(this.cards, id, this.cards[id]);
      this.cards[this.currentlyFlipped].flipped = false;
      this.$set(this.cards, this.currentlyFlipped, this.cards[this.currentlyFlipped]);
      this.resetCards();
    },
    resetCards: function resetCards() {
      this.flippingActive = false;
      this.currentlyFlipped = -1;
    }
  }
};
</script>

<style>
#board{
  margin: 0 auto;
  width: 720px; /** 6 * (Card width + card margin) **/
}
.messageBanner {
  text-align: center;
}
</style>
