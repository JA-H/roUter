import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import signupService from '../services/users';
import {useHistory} from 'react-router-dom'
import {setUser} from '../reducers/loginReducer'

const SignupForm = () => {

    const history = useHistory()
    const dispatch = useDispatch()

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [water, setWater] = useState('')
    const [green_spaces, setGreenSpaces] = useState('')
    const [buildings, setBuildings] = useState('')
    const [pace, setPace] = useState('')





  const signupHandler = async (event) => {
      event.preventDefault()

      const credentials = {
          username,
          email,
          password,
          water,
          green_spaces,
          buildings,
          pace

      }

      try {
          const user = await signupService.createUser(credentials)
          console.log(user)


          window.localStorage.setItem(
              'loggedUser', JSON.stringify(user)
            
          )
          dispatch(setUser(user))
            history.push('/')
          setUsername('')
          setEmail('')
          setPassword('')
          setWater('')
          setGreenSpaces('')
          setBuildings('')
          setPace('')
      }
      catch (exception) {
          console.log('login failed')
      }

  }
     










    
    return (
      <div class="formcont">
        <div class="loginheader">
          <h2> Register </h2>
        </div>
        <div className="search"> 

          <form onSubmit={signupHandler}>

            <div class="input">
              <input className='location-search-input' type="text" name="username" value={username} onChange={(e) => {setUsername(e.target.value)}} placeholder="Username..."/>
            </div>
            
            <div class="input">
              <input className='location-search-input' type="text" name="email"  value={email} onChange={(e) => {setEmail(e.target.value)}} placeholder="Email..."/>
            </div>

            <div class="input">
              <input className='location-search-input' type="text" name="email"  value={password} onChange={(e) => {setPassword(e.target.value)}} placeholder="Password..."/>
            </div>

            <div class="input">
              <input className='location-search-input' type="number" name="email"  value={pace} onChange={(e) => {setPace(e.target.value)}} placeholder="Pace"/>
            </div>
              
            <div class="input">
                <p> Water?</p>
              <input  type="radio" id="watertrue" name="water" value={water} onClick={(e)=> {setWater(true)}} />
              <label for ="watertrue"> True </label>
              <input type="radio" id="waterfalse" name="water" value={water} onClick={(e)=> {setWater(false)}}/>
              <label for ="waterfalse"> False</label>
            </div>

            <div class="input">
                <p> Green Spaces? </p>
              <input type="radio" id="greentrue" name="green_spaces" value={green_spaces} onClick={(e)=> {setGreenSpaces(true)}} />
              <label for ="greentrue"> True</label>
              <input type="radio" id="greenfalse" name="green_spaces" value={green_spaces} onClick={(e)=> {setGreenSpaces(false)}}/>
              <label for ="greenfalse">False</label>
            </div>

            <div class="input">
                <p> Buildings? </p>
              <input type="radio" id="buildtrue" name="buildings" value={buildings} onClick={(e)=> {setBuildings(true)}}/>
              <label for ="buildtrue"> True </label>
              <input type="radio" id="buildfalse" name="buildings" value={buildings} onClick={(e)=> {setBuildings(false)}}/>
              <label for ="buildfalse"> False </label>
            </div>
              
            <button className='location-search-input'type="submit"> Sign Up </button>
          </form>
        </div>
    </div>
            
    ) 
    

}

export default SignupForm