import React, { useState } from 'react';
import "../styles/DeckForm.css"
import { Navigate, redirect, useNavigate } from 'react-router-dom';
import { createDeck } from "../utils/deck.js"
import { getUsername } from '../utils/user.js';

const DeckForm = () => {
  // State to store form data
  const [formData, setFormData] = useState({
    name: '',
  });

  const navigate = useNavigate();

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
    const response = await createDeck(formData.name)
    if (response[0] && getUsername() != "") 
      navigate(`/notecards/${getUsername()}/create/${formData.name}`)
    else 
      console.error("network errors!")

  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default DeckForm;
