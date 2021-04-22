import React, { useState, useEffect } from 'react';
import signupService from '../services/users'

const SignupForm = () => {

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
        <div class="blogformheading">
          <h2> Register </h2>
        </div>
        <div class="blogform"> 

          <form onSubmit={signupHandler}>

            <div class="input">
              <p> username </p>
              <input type="text" name="username" value={username} onChange={(e) => {setUsername(e.target.value)}} />
            </div>
            
            <div class="input">
              <p> email </p>
              <input type="text" name="email"  value={email} onChange={(e) => {setEmail(e.target.value)}}/>
            </div>

            <div class="input">
              <p> password </p>
              <input type="text" name="email"  value={password} onChange={(e) => {setPassword(e.target.value)}}/>
            </div>

            <div class="input">
              <p> pace </p>
              <input type="number" name="email"  value={pace} onChange={(e) => {setPace(e.target.value)}}/>
            </div>
              
            <div class="input">
                <p> Water</p>
              <input type="radio" id="watertrue" name="water" value={water} onClick={(e)=> {setWater(true)}} />
              <label for ="watertrue"> True </label>
              <input type="radio" id="waterfalse" name="water" value={water} onClick={(e)=> {setWater(false)}}/>
              <label for ="waterfalse"> False</label>
            </div>

            <div class="input">
                <p> Green Spaces</p>
              <input type="radio" id="greentrue" name="green_spaces" value={green_spaces} onClick={(e)=> {setGreenSpaces(true)}} />
              <label for ="greentrue"> True</label>
              <input type="radio" id="greenfalse" name="green_spaces" value={green_spaces} onClick={(e)=> {setGreenSpaces(false)}}/>
              <label for ="greenfalse">False</label>
            </div>

            <div class="input">
                <p> Buildings </p>
              <input type="radio" id="buildtrue" name="buildings" value={buildings} onClick={(e)=> {setBuildings(true)}}/>
              <label for ="buildtrue"> True </label>
              <input type="radio" id="buildfalse" name="buildings" value={buildings} onClick={(e)=> {setBuildings(false)}}/>
              <label for ="buildfalse"> False </label>
            </div>
              
            <button type="submit"> sign Up </button>
          </form>
        </div>
    </div>
            
    ) 
    

}

export default SignupForm