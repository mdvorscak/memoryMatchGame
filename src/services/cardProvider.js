export default function getCards(numberOfCards) {
  const cards = [];
  for (let x = 0; x < numberOfCards; x++) {
    cards.push({ id: x });
  }
  return cards;
}
