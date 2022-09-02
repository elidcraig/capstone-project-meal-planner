import React from 'react';
import MiniList from '../components/MiniList';
import MiniPlan from '../components/MiniPlan';

function AuthLandingPage() {
  return (
  <div className='auth-landing-page'>
    You are signed in!
    <MiniPlan />
    <MiniList />
  </div>);
}

export default AuthLandingPage;