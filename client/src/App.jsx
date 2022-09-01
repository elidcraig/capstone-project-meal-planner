import React from 'react';
import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/login' />
        <Route path='/signup' />
        <Route path='/account' />
      </Routes>
    </div>
  );
}

export default App;
