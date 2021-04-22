import React, { useState } from 'react';
import loginService from '../services/users'



const LoginForm = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const loginHandler = async (event) => {
        event.preventDefault()

        const credentials = {
            username,   
            password,
        }
  
        try {
            const user = await loginService.loginUser(credentials)
            console.log(user)
  
  
            window.localStorage.setItem(
                'loggedUser', JSON.stringify(user)
            )
            setUsername('')
            setPassword('')
        }
        catch (exception) {
            console.log('login failed')
        }
  
    
       

    }

    return (
        <div class="formcont">
          <div class="blogformheading">
            <h2>Login </h2>
          </div>
          <div class="loginform"> 
  
            <form onSubmit={loginHandler}>
  
              <div class="input">
                <p> username </p>
                <input type="text" name="username" value={username} onChange={(e) => {setUsername(e.target.value)}} />
              </div>
  
              <div class="input">
                <p> password </p>
                <input type="text" name="email"  value={password} onChange={(e) => {setPassword(e.target.value)}}/>
              </div>
  
              
                
              <button type="submit"> sign Up </button>
            </form>
          </div>
      </div>
              
      ) 


}

export default LoginForm