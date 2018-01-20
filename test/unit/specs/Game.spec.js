import { mount } from '@vue/test-utils';
import Game from '@/components/Game';
import Board from '@/components/Board';

describe('Game.vue', () => {
  it('should contain exactly one game board', () => {
    const wrapper = mount(Game);
    expect(wrapper.findAll(Board).length).to.equal(1);
  });
  it('render it\'s wrapper', () => {
    const wrapper = mount(Game);
    expect(wrapper.contains('#game')).to.equal(true);
  });
});