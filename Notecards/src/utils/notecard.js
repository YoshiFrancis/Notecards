const url = 'http://localhost:4221/'


export const createCards = async (cards, deckId) => {
  const response = await fetch(url + "/create/" + deckId, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(cards)
  })

  if (response.status == 200) {
    return true;
  } else {
    return false;
  }
}