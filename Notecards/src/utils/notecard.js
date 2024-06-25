const url = 'http://localhost:4221/'

export const getAllDecks = async () => {
  const response = await fetch(url + "notecards")
  if (response.status == 200) {
    let decks = response.json();
    return decks;
  } else {
    console.error("error fetching decks")
    return []
  }
}