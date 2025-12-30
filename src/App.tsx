import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { auth } from './config/firebase'

function App() {
  const [count, setCount] = useState(0)
  const getUser= async()=>{
     try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    console.log("Signed in with Google:", user);
    // You might want to return the user or handle further state updates here
    return user;
  }
  catch (error: any) { // Use 'any' for error type or more specific FirebaseError
    if (error.code === 'auth/cancelled-popup-request') {
      console.warn("Google sign-in popup was cancelled or blocked by the browser.");
      // Optionally, inform the user or try an alternative method like signInWithRedirect
    } else if (error.code === 'auth/popup-blocked') {
        console.warn("Google sign-in popup was blocked by the browser. Please allow popups for this site.");
    }
    else {
      console.error("Error with Google sign-in:", error.message);
    }
    throw error; // Re-throw the error if you want calling code to handle it
  }
  }
  
  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <button type="button" onClick={getUser}>authentication</button>
    </>
  )
}

export default App
