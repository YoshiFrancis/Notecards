import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom"
import { getUserDeck } from "../utils/deck";
import NotecardContainer from "./NotecardContainer";

const DeckPage = () => {
  const [searchParams] = useSearchParams();
  const [notecards, setNotecards] = useState([]);
  const [title, setTitle] = useState("");
  useEffect(() => {
    async function getCards()  {
      let deck_id = searchParams.get("deckId")
      let username = searchParams.get("username")
      let data = await getUserDeck(username, deck_id);
      setNotecards(data["notecards"]);
      setTitle(data["title"]);
    }
    getCards();
  }, [])

  return (
    <div>
      <h1>{title}</h1>
      <h3>By <Link to={"/notecards/" + username}>{username}</Link></h3>
      <div className="deckpage-notecard-container">
        <NotecardContainer notecards={notecards} />
      </div>
    </div>
  )
}

export default DeckPage;