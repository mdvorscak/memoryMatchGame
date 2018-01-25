import { mount } from '@vue/test-utils';
import Card from '@/components/Card';


describe('Card.vue', () => {
  describe('face down', () => {
    let sut;
    beforeEach(() => {
      sut = mount(Card, {
        propsData: {
          flipped: false,
          image: 'path/to/image.jpg'
        }
      });
    });
    it('should not show an image when card is flipped down', () => {
      expect(sut.html()).not.to.contain('background-image');
    });

    it('should show the card back when flipped down', () => {
      expect(sut.hasStyle('background-color', '#57286B')).to.equal(true);
    });
  });

  describe('face up', () => {
    let sut;
    beforeEach(() => {
      sut = mount(Card, {
        propsData: {
          flipped: true,
          image: 'path/to/image.jpg'
        }
      });
    });
    it('should not show the card back when flipped', () => {
      expect(sut.hasStyle('background-color', 'transparent')).to.equal(true);
    });

    it('should show the image when flipped up', () => {
      expect(sut.html()).to.contain('background-image');
    });
  });

  describe('flipping', () => {
    it('should emit a flip event when clicked on', () => {
      const id = 42;
      const sut = mount(Card, {
        propsData: {
          flipped: false,
          id: 42
        }
      });
      sut.find('.card').trigger('click');
      expect(sut.emitted().flip[0][0]).to.equal(id);
    });

    it('should not emit a flip event when clicked on if already flipped', () => {
      const sut = mount(Card, {
        propsData: {
          flipped: true,
          id: 42
        }
      });
      sut.find('.card').trigger('click');
      /* eslint-disable no-unused-expressions */
      expect(sut.emitted().flip).not.to.be.ok;
      /* eslint-enable no-unused-expressions */
    });

    it('should not emit a flip event when clicked on if already matched', () => {
      const sut = mount(Card, {
        propsData: {
          matched: true,
          id: 42
        }
      });
      sut.find('.card').trigger('click');
      /* eslint-disable no-unused-expressions */
      expect(sut.emitted().flip).not.to.be.ok;
      /* eslint-enable no-unused-expressions */
    });
  });
});
