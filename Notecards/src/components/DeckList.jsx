import React, { useEffect, useState } from "react"
import { getAllDecks, getAllUserDecks } from "../utils/deck"
import { Link } from "react-router-dom"

const DeckList = ({ username }) => {
  const [decks, setDecks] = useState([])
  useEffect(() => {
    async function getDecks() {
      let newDecks = []
      if (username == "")
        newDecks = await getAllDecks();
      else 
        newDecks = await getAllUserDecks(username)
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
        <li key={deck["deck_id"]}><Link to={"/notecards/" + deck["username"] + "/" + deck["deck_id"]}>{deck["title"]}</Link></li>
      ))}

    </ul>
  )
}

export default DeckList;