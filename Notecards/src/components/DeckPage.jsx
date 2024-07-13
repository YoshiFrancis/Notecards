import { useEffect, useState } from "react";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom"
import { deleteDecks, getUserDeck } from "../utils/deck";
import NotecardContainer from "./NotecardContainer";
import '../styles/DeckPage.css'
import NotecardSlide from "./NotecardSlide";
import { getUserId } from "../utils/user";

const DeckPage = () => {
  const { username, deckTitle } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [notecards, setNotecards] = useState([]);
  const [editedFlag, setEditedFlag] = useState(false);

  useEffect(() => {
    async function getCards()  {
      let data = await getUserDeck(username, deckTitle);
      setNotecards(data);
    }
    getCards();
  }, [])

  useEffect(() => {
    async function getCards()  {
      let data = await getUserDeck(username, deckTitle);
      setNotecards(data);
    }
    getCards();
  }, [editedFlag])

  const deleteDeck = async () => {
    const success = await deleteDecks(
      [{
        user_id: getUserId(),
        deck_id: parseInt(searchParams.get('deckId')),
        title: deckTitle,
        username: username
      }]
    )

    if (success) 
      navigate(`/notecards/${username}`)

    const flagEdited = () => {
      setEditedFlag(!editedFlag);
    }
      
  }

  return (
    <div className="deckpage">
      <h1>{deckTitle}</h1>
      <h3>By <Link to={"/notecards/" + username}>{username}</Link></h3>
      <h3><Link to={`/notecards/${username}/${deckTitle}/notes?deckId=${searchParams.get('deckId')}`}>Notes</Link></h3>
      <h3><button onClick={deleteDeck}>Delete Deck</button></h3>
      <h3><Link to={`/notecards/${username}/create/${deckTitle}?deckId=${searchParams.get('deckId')}`}>Create Cards</Link></h3>
      <div className="deckpage-notecard-slide-container">
        <NotecardSlide username={username} deckTitle={deckTitle} />
      </div>
      <br />
      <div className="deckpage-notecard-container">
        <NotecardContainer notecards={notecards} setEditedFlag={setEditedFlag}/>
      </div>
    </div>
  )
}

export default DeckPage;