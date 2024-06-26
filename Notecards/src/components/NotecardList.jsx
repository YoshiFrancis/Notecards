import React, { useEffect, useState } from "react"
import { getAllDecks } from "../utils/deck"

const NotecardList = () => {
  const [decks, setDecks] = useState([])
  useEffect(() => {
    async function getDecks() {
      let newDecks = await getAllDecks();
      newDecks.map(deck => (
        console.log(deck["title"])
      ))
      setDecks([...newDecks])
    }
    getDecks();
  }, [])

  useEffect(() => {
    console.log(decks)
  }, [decks])
  return (
    <ul>
      {decks.map((deck) => (
        <li key={deck["deck_id"]}>{deck["title"]}</li>
      ))}

    </ul>
  )
}

export default NotecardList;