import { useEffect, useState } from 'react';
import '../styles/NotecardContainer.css'
import EditCardForm from './EditCardForm';

const NotecardContainer = ({notecards, setEditedFlag}) => {
  const [editFlag, setEditFlag] = useState(false);
  const [currNotecard, setCurrNotecard] = useState({});

  const editCard = (notecard) => {
    setCurrNotecard(notecard);
    setEditFlag(true);
  }

  const stopEditing = () => {
    setCurrNotecard({});
    setEditFlag(false);
  }

  return (
    <>
      <ul className='notecard-list'>
        {notecards.map((notecard) => (
          <li key={notecard.card_id} className='notecard-row-container'>
            <span className="back-text">{notecard.back}</span>
            <span className="front-text">{notecard.front}</span>
            <button onClick={() => editCard(notecard)}>Edit</button>
            {editFlag && <EditCardForm notecard={currNotecard} stopEditing={stopEditing} setEditedFlag={setEditedFlag}/>}
          </li>
        ))}
      </ul>
    </>
    
  )
}

export default NotecardContainer;