import { useState } from "react"

const Notecard = ({ front, back }) => {
  [text, setText] = useState(front);
  function flipCard() {
    if (text == front) {
      setText(back);
    } else {
      setText(front);
    }
  }
  return (
    <div className="notecard">
      <h3>{text}</h3>
      <button className="notecard-flip-button" onClick={flipCard}>Flip</button>
    </div>
  )
}

export default Notecard