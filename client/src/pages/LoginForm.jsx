import React, { useState } from 'react';

const formDefault = {
  username: '',
  password: ''
}

function LoginForm() {
  const [formData, setFormData] = useState(formDefault)

  function handleFormChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  async function handleFormSubmit(e) {
    e.preventDefault()

    const response = await fetch('/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
    const data = await response.json()
    console.log(data)
  }

  return (
  <form className='login-form' onSubmit={ handleFormSubmit }>
    <input type='text' name='username' value={ formData.username } onChange={ handleFormChange }/><br/>
    <input type='password' name='password' value={ formData.password } onChange={ handleFormChange }/><br/>
    <input type='submit'/>
  </form>
  );
}

export default LoginForm;