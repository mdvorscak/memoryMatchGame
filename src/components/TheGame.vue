<template>
  <div id="game">
      <h2 
        class="messageBanner" 
        v-text="currentMessage" 
        :class="{ matchFound }"
      ></h2>
      <div class="play-controls">
        <timer :running="gameActive"/>
        <controls 
          @reset="resetBoard" 
          :gameOver="gameOver" 
          :gameActive="gameActive" 
        />
      </div>
      <div id="board">
        <card v-for="(card, position) in cards" 
          :key="position" 
          :id="card.id" 
          :position="position" 
          :matched="card.matched" 
          :flipped="card.flipped" 
          :image="card.image"
          @flip="flipCard"
        />
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
      /** The currently flipped cards important information
       *  id - id of card. Not unique since there are multiple cards with the same id
       *  position - the position of the card on the board (in the array)
      */
      currentlyFlipped: {
        id: -1,
        position: -1
      },
      currentMessage: startMessage,
      /** clicking is locked when an incorrect match is found but
       *    the cards have not yet been flipped back down */
      clickingLocked: false,
      matches: 0,
      /** Game starts inactive and activates when the user first clicks a card */
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
    /** @description Initializes the cards on the board */
    initBoard() {
      this.cards = cardProvider(this.numberOfCards, this.numberOfMatches);
    },
    /** @description flips a card up, triggered by card clicks
     *  @param id {number} - The id of the card
     *  @param position {number} - the position of the card on the board
    */
    flipCard(id, position) {
      this.gameActive = true;
      /** Critical section below  */
      if (this.clickingLocked) return;
      this.setCard(position, { flipped: true });

      if (this.currentlyFlipped.id === id) {
        this.correctMatch(position);
      } else if (this.flippingActive) {
        this.incorrectMatch(position);
      } else {
        /** First card flipped */
        this.currentlyFlipped = { id, position };
        this.flippingActive = true;
      }
    },
    /** @description Sets the cards to matched and if the number of matches
     *    is the same as the number of the number of cards, the game ends.
     *  @see {flipCard} for use
     */
    correctMatch(position) {
      this.currentMessage = 'You found a match!';
      // set both of the cards to matched
      this.setCard(position, { matched: true });
      this.setCard(this.currentlyFlipped.position, { matched: true });
      this.matchFound = true;
      this.resetCards();
      this.matches += 1;
      if (this.matches === this.cards.length) {
        this.endGame();
      }
    },
    /** @description Ends the game */
    endGame() {
      this.currentMessage = 'Congrats, you won!';
      this.gameOver = true;
      this.gameActive = false;
    },
    /** @description Resets the cards (flipping them down) after a 1 second delay
     *  @see {flipCard} for use
     */
    async incorrectMatch(position) {
      this.currentMessage = 'Try again';
      this.matchFound = false;
      /** critical section */
      this.clickingLocked = true;
      await delay(1000);
      // flip both cards back down
      this.setCard(position, { flipped: false });
      this.setCard(this.currentlyFlipped.position, { flipped: false });
      this.resetCards();
      this.clickingLocked = false;
      /** end of critical section */
    },
    /** @description Helper method to set properties on cards array
     *  @param position {number} - the position of the card in the array
     *  @param props {Object} - The properties to set on the card
    */
    setCard(position, props) {
      Object.keys(props).forEach((prop) => {
        this.cards[position][prop] = props[prop];
      });
      this.$set(this.cards, position, this.cards[position]);
    },
    resetCards() {
      this.flippingActive = false;
      this.currentlyFlipped = {
        id: -1,
        position: -1
      };
    },
    /** @description - Resets the board back to the initial start state
     *  @notes - Triggered by the reset/play again button in TheGameControls.vue
    */
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
