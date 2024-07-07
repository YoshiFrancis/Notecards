import { useEffect, useState } from "react";
import { getUserDeck } from "../utils/deck";
import Notecard from "./Notecard";
import { useParams } from "react-router-dom";
import '../styles/NotecardSlide.css'

const NotecardSlide = ({ username, deckTitle }) => {
  const [notecards, setNotecards] = useState([]);
  const [notecard, setNotecard] = useState(null);
  const [notecardIdx, setNotecardIdx] = useState(0);
  
  async function goNext() {
    if (notecardIdx == notecards.length) {
      let new_notecards =  await getUserDeck(username, deckTitle);
      setNotecards(new_notecards);
      setNotecardIdx(0);
      setNotecard(new_notecards[0]);
    } else {
      setNotecardIdx(notecardIdx + 1);
      setNotecard(notecards[notecardIdx]);
    }
  }

  useEffect(() => {
    goNext();
  }, [])

  return (
    <div className="notecard-container">
      {notecard && <Notecard front={notecard.front} back={notecard.back} /> }
      <button id="next-button" onClick={goNext}>NEXT</button>
    </div>
  )
}

export default NotecardSlide;