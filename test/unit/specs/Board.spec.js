import { mount } from '@vue/test-utils';
import Board from '@/components/Board';
import Card from '@/components/Card';

describe('Game.vue', () => {
  describe('rendering', () => {
    it('render it\'s wrapper', () => {
      const wrapper = mount(Board);
      expect(wrapper.contains('#board')).to.equal(true);
    });
  });
  describe('states', () => {
    describe('initial state', () => {
      it('should contain 24 cards at the start of the game', () => {
        const wrapper = mount(Board);
        expect(wrapper.findAll(Card).length).to.equal(24);
      });

      it('should start with all cards facing down', () => {
        const wrapper = mount(Board);
        const allFaceDown = wrapper.findAll(Card).wrappers
          .reduce((acc, current) => current.vm.faceDown && acc, true);
        expect(allFaceDown).to.equal(true);
      });
    });
  });
});
