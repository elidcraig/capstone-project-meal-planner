import React from 'react';
import { Routes, Route } from 'react-router-dom'
import LoginForm from './pages/LoginForm';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/login' element={ <LoginForm/> } />
        <Route path='/signup' />
        <Route path='/account' />
      </Routes>
    </div>
  );
}

export default App;
