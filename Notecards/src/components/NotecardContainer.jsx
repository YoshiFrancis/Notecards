import '../styles/NotecardContainer.css'

const NotecardContainer = ({notecards}) => {
  return (
    <ul className='notecard-list'>
      {notecards.map((notecard) => (
        <li key={notecard.card_id} className='notecard-row-container'>
          <span className="back-text">{notecard.back}</span>
          <span className="front-text">{notecard.front}</span>
        </li>
      ))}
    </ul>
  )
}

export default NotecardContainer;