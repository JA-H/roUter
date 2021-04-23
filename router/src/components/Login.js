import React, { useState } from 'react';
import { useDispatch } from 'react-redux'
import loginService from '../services/users'
import {useHistory} from 'react-router-dom'
import {setUser} from '../reducers/loginReducer'



const LoginForm = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const history = useHistory()
    const dispatch = useDispatch()

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
            dispatch(setUser(user))
            setUsername('')
            setPassword('')
            history.push('/')

        }
        catch (exception) {
            console.log('login failed')
        }
  
    
       

    }

    return (
        <div class="formcont">
          <div class="loginheader">
            <h2> Login </h2>
          </div>
          <div className="search"> 
  
            <form onSubmit={loginHandler}>
  
              <div class="input">
                <p> Username </p>
                <input className='location-search-input'type="text" name="username" value={username} onChange={(e) => {setUsername(e.target.value)}} />
              </div>
  
              <div class="input">
                <p> Password </p>
                <input className='location-search-input' type="text" name="email"  value={password} onChange={(e) => {setPassword(e.target.value)}}/>
              </div>
  
              
                
              <button className='location-search-input' type="submit"> Login </button>
            </form>
          </div>

    
      </div>
              
      ) 


}

export default LoginForm