

const NotecardContainer = ({ notecards }) => {
  return (
    <div className="notecard-container">
      {notecards.map((notecard) => (
        <li key={notecard.card_id}>
          <span className="back-text">{notecard.back}</span>
          <span className="front-text">{notecard.front}</span>
        </li>
      ))}
    </div>
  )
}

export default NotecardContainer;