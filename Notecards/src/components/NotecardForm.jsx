import React, { useState } from 'react';
import "../styles/NotecardForm.css"
import { useParams } from 'react-router-dom';

const NotecardForm = () => {
  const { deckName } = useParams();
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
  const handleSubmit = (e) => {
    e.preventDefault();
    // Process form data here (e.g., send to a server)
    console.log('Form submitted:', formData);
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
