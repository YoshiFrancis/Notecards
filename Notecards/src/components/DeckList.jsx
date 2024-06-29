import React, { useEffect, useState } from "react"
import { getAllDecks, getAllUserDecks } from "../utils/deck"
import { Link } from "react-router-dom"
import '../styles/DeckList.css'
import DeckDescription from "./DeckDescription"

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
    <ul className="decklist">
      {decks.map((deck) => (
        <li key={deck["deck_id"]}>
          <Link to={"/notecards/" + deck["username"] + "/" + deck["title"]}>
            <DeckDescription username={deck["username"]} title={deck["title"]} className="deck-desc-holder"/>
          </Link>
        </li>
      ))}

    </ul>
  )
}

export default DeckList;