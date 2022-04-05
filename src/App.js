import React, { useState } from 'react';
import './App.css';
import ResidentsList from './Components/ResidentsList';
import Search from './Components/Search';
import Error from './Components/Error';

function App() {

  const [student, setStudent] = useState([])
  const [error, setError] = useState("")

  const matchedName = (name) => {
    setStudent([...student, name])
  }

  const errorMessage = (message) => {
    setError(message)
    setTimeout(() => setError(""), 5000);
  }

  return (
    <div className="container">

   

      <div className="screen">

        <Search matchedName={matchedName} errorMessage={errorMessage} />

        {error ? <Error message={error} /> : null}
        
      </div>
      
      <ResidentsList student={student} />

    </div>
  );
}

export default App;