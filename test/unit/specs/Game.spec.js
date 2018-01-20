import { mount } from '@vue/test-utils';
import Game from '@/components/Game';
import Card from '@/components/Card';

describe('Game.vue', () => {
  describe('rendering', () => {
    it('render it\'s wrapper', () => {
      const wrapper = mount(Game);
      expect(wrapper.contains('#game')).to.equal(true);
    });
    it('render the board wrapper', () => {
      const wrapper = mount(Game);
      expect(wrapper.contains('#board')).to.equal(true);
    });
  });

  describe('states', () => {
    describe('initial state', () => {
      let wrapper;
      beforeEach(() => {
        wrapper = mount(Game);
      });
      it('should contain the number of cards passed to it at the start of the game', () => {
        expect(wrapper.findAll(Card).length).to.equal(24);
      });
      it('should start with all cards facing down', () => {
        const allFaceDown = wrapper.findAll(Card).wrappers
          .reduce((acc, current) => current.vm.faceDown && acc, true);
        expect(allFaceDown).to.equal(true);
      });
    });
  });

  describe('gameplay', () => {
    describe('messages', () => {
      it('should contain an informational banner when starting', () => {
        const wrapper = mount(Game);
        expect(wrapper.find('.messageBanner').text()).to.equal('Click a card to begin');
      });

      it('should inform you when a match is not found', () => {
        const wrapper = mount(Game);
        wrapper.setData({ matchFound: false, flippingActive: true });
        expect(wrapper.find('.messageBanner').text()).to.equal('Try again');
      });

      it('should inform you when a match is found', () => {
        const wrapper = mount(Game);
        wrapper.setData({ matchFound: true, flippingActive: true });
        expect(wrapper.find('.messageBanner').text()).to.equal('You found a match!');
      });
    });
    describe('clicking cards', () => {
      it('should flip the card when there are no others flipped up', () => {
        const wrapper = mount(Game);
        const firstCard = wrapper.findAll(Card).at(0);
        firstCard.trigger('click');
        expect(firstCard.vm.faceDown).to.equal(false);
      });

      it('should set the game state to flipping active', () => {
        const wrapper = mount(Game);
        const firstCard = wrapper.findAll(Card).at(0);
        firstCard.trigger('click');
        expect(wrapper.vm.flippingActive).to.equal(true);
      });

      it('should flip the a second card when one other is flipped', () => {
        const wrapper = mount(Game);
        wrapper.setData({ flipUpTime: 1000 });
        const allCards = wrapper.findAll(Card);
        const firstCard = allCards.at(0);
        const secondCard = allCards.at(1);
        firstCard.trigger('click');
        secondCard.trigger('click');
        expect(firstCard.vm.faceDown).to.equal(false);
        expect(secondCard.vm.faceDown).to.equal(false);
      });

      it('should remove the cards when they are a match', () => {

      });
    });

    it('should start when the board is created', () => {

    });

    it('should end when there are no more matches left', () => {

    });

    describe('anti-cheating measures', () => {
      it('should not use the real cards id to display the card', () => {

      });
    });
  });
});
