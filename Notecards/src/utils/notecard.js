const url = 'http://localhost:4221/'


export const createCards = async (cards, deckName) => {
  console.log(cards)
  const response = await fetch(url + "create/" + deckName, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(cards)
  })

  if (response.status == 201) {
    return true;
  } else {
    return false;
  }
}