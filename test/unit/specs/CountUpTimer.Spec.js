import {mount} from '@vue/test-utils';
import sinon from 'sinon';
import Timer from '@/components/CountUpTimer';

describe('Timer.vue', () => {
  let clock;
  before(() => {
    clock = sinon.useFakeTimers();
  });
  after(() => {
    clock.restore();
  });
  describe('start state', () => {
    it('should begin off when running is false', () => {
      const sut = mount(Timer, {propsData: {
        running: false
      }});
      clock.tick(2000);
      expect(sut.find('.secs').text()).to.equal('00');
      expect(sut.find('.mins').text()).to.equal('00');
    });

    it('should begin on when running is true', () => {
      const sut = mount(Timer, {propsData: {
        running: true
      }});
      clock.tick(20 * 1000);
      sut.setProps({running: false});
      expect(sut.find('.secs').text()).to.equal('20');
      expect(sut.find('.mins').text()).to.equal('00');
    });
  });

  it('should properly go to one minute when 60s have elapsed', () => {
    const sut = mount(Timer, {propsData: {
      running: true
    }});
    clock.tick(60 * 1000);
    sut.setProps({running: false});
    expect(sut.find('.secs').text()).to.equal('00');
    expect(sut.find('.mins').text()).to.equal('01');
  });

  it('should stop when the running state changes to false', () => {
    const sut = mount(Timer, {propsData: {
      running: true
    }});
    clock.tick(5 * 1000);
    sut.setProps({running: false});
    clock.tick(5 * 1000);

    expect(sut.find('.secs').text()).to.equal('05');
    expect(sut.find('.mins').text()).to.equal('00');
  });
});
