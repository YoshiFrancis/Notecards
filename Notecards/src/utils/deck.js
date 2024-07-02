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

export const getUserDeck = async (username, deckTitle) => {
  const response = await fetch(url + "notecards/" + username + "/" + deckTitle);
  if (response.status == 200) {
    let data = await response.json();
    return data;
  } else {
    console.error("error fetching deck from", username, "with id", deckTitle);
    return {
      username: "",
      user_id: -1,
      title: ""
    };
  }
}

export const createDeck = async (title) => {
  title.trim();
  title = title.replaceAll(" ", "-");
  if (title.length <= 1) 
      return [false, {}];
    
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