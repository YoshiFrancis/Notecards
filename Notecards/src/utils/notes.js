import { getUserId, getUsername } from "./user";
const url = 'http://localhost:4221/'

export const updateNotes = async (user_id, deck_id, text="Nothing", count=0) => {
  if (count == 5) {
    console.log("Could not update notes!");
    return;
  }
  if (text == "")
      text = "Nothing";
  text = text.replace("\n", "\\n")
  console.log("Notes being updated:", text)
  const response = await fetch(url + "update-notes", {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    }, 
    body: JSON.stringify({
      user_id: user_id,
      deck_id: deck_id,
      text: text
    })
  });

  if (response.status != 200) {
    updateNotes(user_id, deck_id, text, count + 1);
  }
}

export const getNotes = async (deck_id) => {
  const response = await fetch(`${url}/notes/${getUserId()}/${deck_id}`);
  if (response.status == 302) {
    let data = await response.json()
    data.text = data.text.replace("\\n", "\n");
    return data;
  }
  else {
    console.log("Error getting notes!");
    return false;
  }

} 