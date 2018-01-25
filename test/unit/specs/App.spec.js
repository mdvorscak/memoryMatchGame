import { mount } from '@vue/test-utils';
import App from '@/App';
import Game from '@/components/TheGame';

describe('App.vue', () => {
  it('should contain exactly one game', () => {
    const wrapper = mount(App);
    expect(wrapper.findAll(Game).length).to.equal(1);
  });
  it('render it\'s wrapper', () => {
    const wrapper = mount(App);
    expect(wrapper.contains('#app')).to.equal(true);
  });
});
