import { mount } from '@vue/test-utils';
import Controls from '@/components/Controls';


describe('Controls.vue', () => {
  describe('active game state', () => {
    let sut;
    beforeEach(() => {
      sut = mount(Controls, {
        propsData: {
          gameActive: true,
          gameOver: false
        }
      });
    });
    it('should not be disabled', () => {
      expect(sut.html()).not.to.contain('disabled');
    });

    it('should say "Reset Game"', () => {
      expect(sut.find('button').text()).to.equal('Reset Game');
    });

    it('should emit the reset event when clicked on', () => {
      sut.find('button').trigger('click');
      expect(sut.emitted().reset).to.be.ok;
    });
  });

  describe('End game state', () => {
    let sut;
    beforeEach(() => {
      sut = mount(Controls, {
        propsData: {
          gameActive: false,
          gameOver: true
        }
      });
    });
    it('should not be disabled', () => {
      expect(sut.html()).not.to.contain('disabled');
    });

    it('should say "Play Again"', () => {
      expect(sut.find('button').text()).to.equal('Play Again');
    });

    it('should emit the reset event when clicked on', () => {
      sut.find('button').trigger('click');
      expect(sut.emitted().reset).to.be.ok;
    });
  });

  describe('Initial state', () => {
    let sut;
    beforeEach(() => {
      sut = mount(Controls, {
        propsData: {
          gameActive: false,
          gameOver: false
        }
      });
    });
    it('should be disabled', () => {
      expect(sut.html()).to.contain('disabled');
    });

    it('should say "Reset Game"', () => {
      expect(sut.find('button').text()).to.equal('Reset Game');
    });

    it('should not emit the reset event when clicked on', () => {
      sut.find('button').trigger('click');
      expect(sut.emitted().reset).not.to.be.ok;
    });
  });
});
