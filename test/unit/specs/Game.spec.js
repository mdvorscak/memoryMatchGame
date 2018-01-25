import { mount } from '@vue/test-utils';
import Game from '@/components/Game';
import Card from '@/components/Card';

function mountSutWith(props) {
  return mount(Game, { propsData: props });
}

function mountSuthWith1Card() {
  return mountSutWith({ numberOfCards: 1, numberOfMatches: 2 });
}

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
        wrapper = mountSutWith({ numberOfCards: 12, numberOfMatches: 2 });
      });
      it('should contain the number of cards passed to it at the start of the game', () => {
        expect(wrapper.findAll(Card).length).to.equal(24);
      });
      it('should start with all cards facing down', () => {
        const allFaceDown = wrapper.findAll(Card).wrappers
          .reduce((acc, current) => !current.vm.flipped && acc, true);
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
    });
    describe('clicking cards', () => {
      it('should flip the card when there are no others flipped up', () => {
        const wrapper = mountSuthWith1Card();
        const firstCard = wrapper.findAll(Card).at(0);
        firstCard.trigger('click');
        expect(firstCard.vm.flipped).to.equal(false);
      });

      it('should set the game state to flipping active', () => {
        const wrapper = mountSuthWith1Card();
        const firstCard = wrapper.findAll(Card).at(0);
        firstCard.trigger('click');
        expect(wrapper.vm.flippingActive).to.equal(true);
      });
    });
  });
});
