import { useEffect, useState } from "react"

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
      <h3>{text}</h3>
      <p>Text: {text}</p>
      <button className="notecard-flip-button" onClick={flipCard}>Flip</button>
    </div>
  )
}

export default Notecard