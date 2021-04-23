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
          <div class="blogformheading">
            
          </div>
          <div className="search"> 
  
            <form onSubmit={loginHandler}>
  
              <div class="input ">
                <input className="location-search-input" type="text" name="username" value={username} onChange={(e) => {setUsername(e.target.value)}} placeholder="Username..." />
              </div>
  
              <div class="input">
                <input className="location-search-input" type="text" name="email"  value={password} onChange={(e) => {setPassword(e.target.value)}} placeholder="Password..."/>
              </div>
  
              
                
              <button className="btn btn-block" type="submit"> Login </button>
            </form>
          </div>

    
      </div>
              
      ) 


}

export default LoginForm