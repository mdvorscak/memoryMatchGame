import clone from 'clone';
import objectMerge from 'object-merge';
import shuffle from 'shuffle-array';
/* eslint-disable global-require */
// require the image paths here so that webpack can identify the resources correctly
const cardPool = [{ id: 1, image: require('../assets/cards/memes/ancient-alien-guy.jpg') },
  { id: 2, image: require('../assets/cards/memes/awkward-seal.jpg') },
  { id: 3, image: require('../assets/cards/memes/aysi.jpg') },
  { id: 4, image: require('../assets/cards/memes/bad-luck-brian.jpg') },
  { id: 5, image: require('../assets/cards/memes/business-cat.jpg') },
  { id: 6, image: require('../assets/cards/memes/captain-picard.jpg') },
  { id: 7, image: require('../assets/cards/memes/conspiracy-keanu.jpg') },
  { id: 8, image: require('../assets/cards/memes/foul-bachelor-frog.jpg') },
  { id: 9, image: require('../assets/cards/memes/futurama-fry.jpg') },
  { id: 10, image: require('../assets/cards/memes/philosoraptor.jpg') },
  { id: 11, image: require('../assets/cards/memes/scumbag-steve.jpg') },
  { id: 12, image: require('../assets/cards/memes/winter-is-coming.jpg') }];

export default function getCards(numberOfCards, numberOfMatches) {
  const baseProps = { flipped: false, matched: false };
  const baseCards = cardPool.filter((elm, index) => index < numberOfCards)
    .map(elm => objectMerge(elm, baseProps));
  let allCards = [];
  allCards = allCards.concat(baseCards);
  for (let i = 1; i < numberOfMatches; i++) {
    allCards = allCards.concat(clone(baseCards));
  }
  // Randomize the order
  shuffle(allCards);

  return allCards;
}
/* eslint-enable global-require */
