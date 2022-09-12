import React from 'react';
import MiniList from '../components/MiniList';
import MiniPlan from '../components/MiniPlan';

function AuthLandingPage() {
  return (
  <div className='auth-landing-page'>
    <MiniPlan />
    <MiniList />
  </div>);
}

export default AuthLandingPage;