import { useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom"
import { getUserDeck } from "../utils/deck";
import NotecardContainer from "./NotecardContainer";
import '../styles/DeckPage.css'
import NotecardSlide from "./NotecardSlide";

const DeckPage = () => {
  const { username, deckTitle } = useParams();
  const [searchParams] = useSearchParams();
  const [notecards, setNotecards] = useState([]);
  useEffect(() => {
    async function getCards()  {
      let data = await getUserDeck(username, deckTitle);
      setNotecards(data);
    }
    getCards();
  }, [])

  return (
    <div className="deckpage">
      <h1>{deckTitle}</h1>
      <h3>By <Link to={"/notecards/" + username}>{username}</Link></h3>
      <h3><Link to={`/notecards/${username}/create/${deckTitle}?deckId=${searchParams.get('deckId')}`}>Create Cards</Link></h3>
      {/* <h4><Link to={"/notecards/" + username + "/" + deckTitle + "/edit"}>Edit Deck</Link></h4> */}
      <div className="deckpage-notecard-slide-container">
        <NotecardSlide username={username} deckTitle={deckTitle} />
      </div>
      <br />
      <div className="deckpage-notecard-container">
        <NotecardContainer notecards={notecards} />
      </div>
    </div>
  )
}

export default DeckPage;