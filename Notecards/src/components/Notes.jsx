import { useEffect, useState } from "react"

const Notes = () => {
  const [notes, setNotes] = useState('')

  useEffect(() => {
    const saveBeforeReload = () => {
      alert(notes)
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
    </div>
  )

}

export default Notes;