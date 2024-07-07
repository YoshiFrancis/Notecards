import { useEffect, useState } from "react"
import '../styles/Notecard.css'
const Notecard = ({ front, back }) => {
  const [text, setText] = useState('');
  function flipCard() {
    if (text == front) {
      setText(back);
    } else {
      setText(front);
    }
  }
  useEffect(() => {
    setText(front);
  }, [front])
  return (
    <div className="notecard">
      <div className="notecard-text">
        <p>{text}</p>
      </div>
      <button className="notecard-flip-button" onClick={flipCard}>Flip</button>
    </div>
  )
}

export default Notecard