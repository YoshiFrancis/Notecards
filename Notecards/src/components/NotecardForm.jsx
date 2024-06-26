import React, { useEffect, useState } from 'react';
import "../styles/NotecardForm.css"
import { useParams, useSearchParams } from 'react-router-dom';
import { createCards } from '../utils/notecard';
import { getUserId } from '../utils/user';

const NotecardForm = () => {
  const { deckName } = useParams();
  const [searchParams] = useSearchParams();
  let deckId = -1;

  useEffect(() => {
    deckId = parseInt(searchParams.get('deckId'));
    console.log(deckId)
  }, [])
  // State to store form data
  const [formData, setFormData] = useState({
    front: '',
    back: ''
  });

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Process form data here (e.g., send to a server)
    console.log('Form submitted:', formData);

    const isSuccess = await createCards([{
      deck_id: deckId,
      front: formData.front,
      back: formData.back,
      user_id: getUserId(),
      card_id: -1
    }], deckName)

    if (!isSuccess) {
      console.log("network error")
      return
    }

    setFormData({
      front: '',
      back: '',
    })
  };

  return (
    <>
      <h1>{ deckName } form</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Front:
            <input
              type="text"
              name="front"
              value={formData.front}
              onChange={handleChange}
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
              value={formData.back}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default NotecardForm;
