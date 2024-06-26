import { getUserId, getUsername } from "./user";

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

export const getAllUserDecks = async (username) => {
  const response = await fetch(url + "notecards/" + username);
  if (response.status == 200) {
    let decks = await response.json();
    return decks;
  } else {
    console.error("error fetching decks from", username);
    return []
  }
}

export const getUserDeck = async (username, deckId) => {
  const response = await fetch(url + "notecards/" + username + "/" + deckId);
  if (response.status == 200) {
    let deck = await response.json();
    return deck;
  } else {
    console.error("error fetching deck from", username, "with id", deckId);
    return {
      username: "",
      user_id: -1,
      title: ""
    };
  }
}

export const createDeck = async (title) => {
  console.log
  const response = await fetch(url + "create", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username: getUsername(),
      user_id: getUserId(),
      title: title
    })
  })

  if (response.status == 201) {
    let data = await response.json();
    return [true, data["deck_id"]];
  } else {
    return [false, {}];
  }
}