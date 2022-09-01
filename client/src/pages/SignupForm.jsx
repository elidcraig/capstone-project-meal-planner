import React, { useState } from 'react';

const formDefault = {
  username: '',
  email: '',
  password: '',
  passwordConfirm: ''
}

function SignupForm() {
  const [formData, setFormData] = useState(formDefault)

  function handleFormChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  async function handleFormSubmit(e) {
    e.preventDefault()

    const config = {
      username: formData.username,
      email: formData.email,
      password: formData.password,
      password_confirmation: formData.passwordConfirm
    }

    const response = await fetch('/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(config)
    })
    const data = await response.json()

    if(response.ok) {
      console.log(data)
      setFormData(formDefault)
    } else {
      console.log(data)
    }
  }

  return (
    <form className='signup-form' onSubmit={ handleFormSubmit }>
      <label for='username'>Username</label><br/>
      <input type='text' name='username' required value={ formData.username } onChange={ handleFormChange }/><br/>
      <label for='email'>Email</label><br/>
      <input type='text' name='email' required value={ formData.email } onChange={ handleFormChange }/><br/>
      <label for='password'>Password</label><br/>
      <input type='password' name='password' required value={ formData.password } onChange={ handleFormChange }/><br/>
      <label for='passwordConfirm'>Confirm Password</label><br/>
      <input type='password' name='passwordConfirm' required value={ formData.passwordConfirm } onChange={ handleFormChange }/><br/>
      <input type='submit'/>
    </form>
  );
}

export default SignupForm;