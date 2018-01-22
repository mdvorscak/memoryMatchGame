/* eslint-disable global-require */
const cardPool = [{ id: 1, url: require('../assets/cards/memes/ancient-alien-guy.jpg') },
  { id: 2, url: require('../assets/cards/memes/awkward-seal.jpg') },
  { id: 3, url: require('../assets/cards/memes/aysi.jpg') },
  { id: 4, url: require('../assets/cards/memes/bad-luck-brian.jpg') },
  { id: 5, url: require('../assets/cards/memes/business-cat.jpg') },
  { id: 6, url: require('../assets/cards/memes/captain-picard.jpg') },
  { id: 7, url: require('../assets/cards/memes/conspiracy-keanu.jpg') },
  { id: 8, url: require('../assets/cards/memes/foul-bachelor-frog.jpg') },
  { id: 9, url: require('../assets/cards/memes/futurama-fry.jpg') },
  { id: 10, url: require('../assets/cards/memes/philosoraptor.jpg') },
  { id: 11, url: require('../assets/cards/memes/scumbag-steve.jpg') },
  { id: 12, url: require('../assets/cards/memes/winter-is-coming.jpg') }];

export default function getCards(numberOfCards) {
  return cardPool.filter((elm, index) => index <= numberOfCards);
}
/* eslint-enable global-require */
