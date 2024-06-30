import { useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom"
import { getUserDeck } from "../utils/deck";
import NotecardContainer from "./NotecardContainer";
import '../styles/DeckPage.css'

const DeckPage = () => {
  const { username, deckTitle } = useParams();
  const [notecards, setNotecards] = useState([]);
  useEffect(() => {
    async function getCards()  {
      let data = await getUserDeck(username, deckTitle);
      setNotecards(data);
    }
    getCards();
  }, [])

  return (
    <div>
      <h1>{deckTitle}</h1>
      <h3>By <Link to={"/notecards/" + username}>{username}</Link></h3>
      <div className="deckpage-notecard-container">
        <NotecardContainer notecards={notecards} />
      </div>
    </div>
  )
}

export default DeckPage;