
const DeckDescription = ({ username, title }) => {
  return (
    <div className="deck-desc-holder">
      <h3 className="deck-desc-title">{title}</h3>
      <p className="deck-desc-text">By {username}</p>
    </div>
  )
  
}

export default DeckDescription;