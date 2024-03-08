import React, { useState } from 'react';
import './App.css';
import { GoogleGenerativeAI} from '@google/generative-ai';
import Response from './components/Response';


function App() {
  const [response , setResponse ] = useState()
  const [userInput , setUserInput] = useState("")
  const [loading , setLoading] =useState(false)
  // Replace with your actual Gemini API key



  // Access your API key (see "Set up your API key" above)
  const genAI = new GoogleGenerativeAI("AIzaSyDOda5QQXEAEhORxSWjuKpg1f42xJXhb00");
  
  async function run() {
    // For text-only input, use the gemini-pro model
    setLoading(true)
    const model = genAI.getGenerativeModel({ model: "gemini-pro"});
  
    const prompt = userInput
  
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    console.log(text);
    setResponse(text)
    setLoading(false)
  }
  
 
  

  return (
    <div className="App"> {/* Add a class for styling (optional) */}
    <div>
      <input type="text" className='userinput'  onChange={(e)=> setUserInput(e.target.value)}/>
      <button onClick={run} >Click</button>
    </div>
    {loading ? <p>Generating..</p>:  <p><Response response={response}/></p>}
    </div>
  );
}

export default App;
