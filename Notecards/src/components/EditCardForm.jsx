import { useState } from "react"
import { updateCards } from "../utils/notecard";

const EditCardForm = ({ notecard, stopEditing }) => {
  const [front, setFront] = useState(notecard.front);
  const [back, setBack] = useState(notecard.back);

  const update = async (e) => {
    e.preventDefault();
    await updateCards([{
      ...notecard,
      front: front,
      back: back
    }]);

    stopEditing();
  }

  return (
    <>
      <h1>Edit form</h1>
      <form onSubmit={update}>
        <div>
          <label>
            Front:
            <input
              type="text"
              name="front"
              value={front}
              onChange={(e) => setFront(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Back:
            <input
            type="text"
              name="back"
              value={back}
              onChange={(e) => setBack(e.target.value)}
              required
            />
          </label>
        </div>
        <button type="submit">Submit</button>
      </form>
    </>
  );

}

export default EditCardForm