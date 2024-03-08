import React, { useState } from 'react';
import './App.css';
import { GoogleGenerativeAI } from '@google/generative-ai';
import Response from './components/Response';

function App() {
  const [response, setResponse] = useState('');
  const [userInput, setUserInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const genAI = new GoogleGenerativeAI("AIzaSyDOda5QQXEAEhORxSWjuKpg1f42xJXhb00");

  async function run() {
    setLoading(true);
    setError('');

    try {
      const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
      const prompt = userInput;
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      setResponse(text);
    } catch (error) {
      setError('Error generating content. Please try again.');
    } finally {
      setLoading(false);
    }
  }
  const handleKeyyPress = (event)=>{
    if(event.key === "ENTER"){
      run()
    }
  }

  return (
    <div className="App">
      <div className="container">
        <h1>Generative AI Demo</h1>
        <div className="input-container">
          <input
            type="text"
            className="userinput"
            placeholder="Enter your input"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
          />
          <button onClick={run} onKeyPress={handleKeyyPress }>Generate</button>
        </div>
        {loading ? <p>Generating...</p> : null}
        {error ? <p className="error">{error}</p> : null}
        {response ? <Response response={response} /> : null}
      </div>
    </div>
  );
}

export default App;
