import { useEffect, useRef, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { getNotes, updateNotes } from "../utils/notes";
import { getUserId } from "../utils/user";

const Notes = () => {
  const [notes, setNotes] = useState('')
  const [searchParams] = useSearchParams();
  const notesRef = useRef(notes);

  useEffect(() => {
    notesRef.current = notes;
  }, [notes]);


  useEffect(() => {
    let deck_id = searchParams.get("deckId");

    async function initializeNotes() {
      let gnotes = await getNotes(deck_id);
      if (gnotes)
        setNotes(gnotes.text);
    }

    initializeNotes();

    const saveBeforeReload = () => {
      updateNotes(getUserId(), parseInt(deck_id), notesRef.current);
    }
    window.addEventListener('beforeunload', saveBeforeReload);

    return () => {
      window.removeEventListener('beforeunload', saveBeforeReload);
    };
  }, [])



  return (
    <div>
      <h1>Notes</h1>
      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}>
      </textarea>
      <button onClick={() => updateNotes(getUserId(), parseInt(searchParams.get("deckId")), notes)}>Update</button>
    </div>
  )

}

export default Notes;