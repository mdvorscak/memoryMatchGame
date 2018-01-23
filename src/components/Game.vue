<template>
  <div id="game">
      <h2 class="messageBanner" v-text="currentMessage" v-bind:class="{ matchFound }"></h2>
      <div class="play-controls">
        <timer :running="!gameOver"/>
        <controls v-on:reset="resetBoard" :gameOver="gameOver" :gameActive="gameActive" />
      </div>
      <div id="board">
        <card v-for="card in cards" :key="card.id" :id="card.id" v-on:flip="flipCard" :matched="card.matched" :flipped="card.flipped" :image="card.image" />
      </div>
  </div>
</template>

<script>
import shuffle from 'shuffle-array';
import delay from 'delay';
import Card from '@/components/Card';
import Timer from '@/components/Timer';
import Controls from '@/components/Controls';
import cardProvider from '@/services/cardProvider';

const startMessage = 'Click a card to begin';

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
      currentMessage: startMessage,
      clickingLocked: false,
      matches: 0,
      gameActive: false,
      gameOver: false
    };
  },
  created() {
    this.initBoard();
  },
  components: {
    Card,
    Controls,
    Timer
  },
  methods: {
    initBoard() {
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
    flipCard: function flipCard(id) {
      this.gameActive = true;
      if (this.clickingLocked) return;
      this.cards[id].flipped = true;
      const currentModel = this.cardDataModels.find(model => this.cardMap.get(id) === model.id);
      this.cards[id].image = currentModel && currentModel.url;
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
      this.matches += 1;
      if (this.matches === this.cardDataModels.length) {
        this.endGame();
      }
    },
    endGame() {
      this.currentMessage = 'Congrats, you won!';
      this.gameOver = true;
    },
    incorrectMatch: async function correctMatch(id) {
      this.currentMessage = 'Try again';
      this.matchFound = false;
      this.clickingLocked = true;
      await delay(1000);
      // flip both cards back down
      this.flipCardDown(id);
      this.flipCardDown(this.currentlyFlipped);
      this.resetCards();
      this.clickingLocked = false;
    },
    flipCardDown: function flipCardDown(id) {
      this.cards[id].flipped = false;
      delete this.cards[id].image;
      this.$set(this.cards, id, this.cards[id]);
    },
    resetCards: function resetCards() {
      this.flippingActive = false;
      this.currentlyFlipped = -1;
    },
    resetBoard() {
      this.matchFound = false;
      this.currentMessage = startMessage;
      this.clickingLocked = false;
      this.matches = 0;
      this.gameActive = false;
      this.gameOver = false;
      this.resetCards();
      this.initBoard();
    }
  }
};
</script>

<style lang="stylus">
@import '../common/theme'

card-width = 100px
card-margin = 10px
card-border = 1px
#game
  margin 0 auto
  width 6 * (card-width + (card-margin + card-border) * 2) /** 6 * (Card width + card margin + border size (2)) **/

.messageBanner 
  text-align center
  &.matchFound 
    color theme-green
.play-controls
  display flex
  justify-content space-between
</style>
