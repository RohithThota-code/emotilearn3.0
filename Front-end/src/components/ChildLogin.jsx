import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import "../styles/ChildLogin.css";

const ChildLogin = ({ onStartQuiz }) => {
  const navigate = useNavigate();
  const [childName, setChildName] = useState('');

  const handlePlayGame = async (e) => {
    e.preventDefault();
    if (childName.trim() !== '') {
      const sessionId = uuidv4().replace(/-/g, '').slice(0, 10); // Generate and slice UUID to 10 characters
      try {
        const response = await fetch('http://localhost:3000/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            childName,
            sessionId,
          }),
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Session started successfully:', data);
        onStartQuiz(childName, sessionId); // Call the onStartQuiz function after successful API call
        navigate('/quiz');
      } catch (error) {
        console.error('Failed to start session:', error);
      }
    }
  };

  return (
    <div className="start-screen">
      <h1>Child Login</h1>
      <form onSubmit={handlePlayGame}>
        <label htmlFor="childName">Enter child name:</label>
        <input
          type="text"
          id="childName"
          name="childName"
          value={childName}
          onChange={(e) => setChildName(e.target.value)}
          required
        />
        <br />
        <button type="submit" className="submit-button">Submit</button>
      </form>
    </div>
  );
};

export default ChildLogin;
