<template>
  <div id="game">
      <h2 class="messageBanner" v-text="currentMessage" v-bind:class="{ matchFound }"></h2>
      <div class="play-controls">
        <timer :running="gameActive"/>
        <controls v-on:reset="resetBoard" :gameOver="gameOver" :gameActive="gameActive" />
      </div>
      <div id="board">
        <card v-for="(card, position) in cards" :key="position" :id="card.id" :position="position" 
        :matched="card.matched" :flipped="card.flipped" :image="card.image" v-on:flip="flipCard"/>
      </div>
  </div>
</template>

<script>
import delay from 'delay';
import Card from '@/components/GameCard';
import Timer from '@/components/CountUpTimer';
import Controls from '@/components/TheGameControls';
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
      matchFound: false,
      flippingActive: false,
      currentlyFlipped: {
        id: -1,
        position: -1
      },
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
      this.cards = cardProvider(this.numberOfCards, this.numberOfMatches);
    },
    flipCard(id, position) {
      this.gameActive = true;
      if (this.clickingLocked) return;
      this.cards[position].flipped = true;
      this.$set(this.cards, position, this.cards[position]);
      if (this.currentlyFlipped.id === id) {
        this.correctMatch(position);
      } else if (this.flippingActive) {
        this.incorrectMatch(position);
      } else {
        // First card flipped
        this.currentlyFlipped = { id, position };
        this.flippingActive = true;
      }
    },
    correctMatch(position) {
      this.currentMessage = 'You found a match!';
      // set both of the cards to matched
      this.cards[position].matched = true;
      this.$set(this.cards, position, this.cards[position]);
      this.cards[this.currentlyFlipped.position].matched = true;
      this.$set(this.cards, this.currentlyFlipped.position,
        this.cards[this.currentlyFlipped.position]);
      this.matchFound = true;
      this.resetCards();
      this.matches += 1;
      if (this.matches === this.cards.length) {
        this.endGame();
      }
    },
    endGame() {
      this.currentMessage = 'Congrats, you won!';
      this.gameOver = true;
      this.gameActive = false;
    },
    async incorrectMatch(position) {
      this.currentMessage = 'Try again';
      this.matchFound = false;
      this.clickingLocked = true;
      await delay(1000);
      // flip both cards back down
      this.flipCardDown(position);
      this.flipCardDown(this.currentlyFlipped.position);
      this.resetCards();
      this.clickingLocked = false;
    },
    flipCardDown(position) {
      this.cards[position].flipped = false;
      this.$set(this.cards, position, this.cards[position]);
    },
    resetCards() {
      this.flippingActive = false;
      this.currentlyFlipped = {
        id: -1,
        position: -1
      };
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
@import '../common/card-dimensions'
full-card-size = (card-width + (card-margin + card-border) * 2)

#game
  margin 0 auto
  width 6 * full-card-size
  @media screen and (max-width: 420px) 
    width 3 * full-card-size


.messageBanner 
  text-align center
  &.matchFound 
    color theme-green
.play-controls
  display flex
  justify-content space-between
</style>
