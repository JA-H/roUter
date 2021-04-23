import React, { useState, useEffect } from 'react';
import { Switch, useHistory, Route, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import getPolyLine from './services/stroll.js'
import fetchJourneys from './services/fetchJourneys'
import axios from 'axios'
import './App.css';
import Header from './components/Header';
import Maps from './components/Maps';
import Search from './components/Search';
import Journeys from './components/Journeys';

import SignupForm from './components/Signup'
import LoginForm from './components/Login'
import { setUser } from './reducers/loginReducer.js';
import { setJourneys} from './reducers/journeyReducer'
import ShowJourneys from './components/ShowJourneys.js';
import { FaCloudShowersHeavy } from 'react-icons/fa';





function App() {

  let origin = useSelector(state=> state.origin)
  let dest = useSelector(state=> state.destination)
  const user = useSelector(state=> state.user)
  const journeys = useSelector(state => state.journey)
  const dispatch = useDispatch()

  const [polyline, setPolyline] = useState("y~nwFzqlbMg@W[[gAmAwA}Aa@c@MXsAbC}@bB_EtHwFiGc@g@b@f@lBtBx@uAxBcE`G_LxDgHd@ZHJFHE^XLV{AP_AQ~@yBvMWtA]hAbDlDf@V");
  const [attractionList, setAttractionList] = useState([])

  useEffect(() => {  
    const routeRequest = async () => {
      let newObject = {
        journey_type: "Simple",
        origin: `[${origin.lat}, ${origin.lng}]`,
        destination: `[${dest.lat}, ${dest.lng}]` ,
        waypoints: "[]",
        visit_nearby_attractions: "True"
    }

    console.log(origin + dest)
    if (user) {
      const response = await getPolyLine(newObject, user.id)
      console.log('data resposne is ' + response.polyline)
      setPolyline(response.polyline)
      console.log('data response for attractions ' + response.attractions)
      setAttractionList(response.attractions)
    }
    }
    routeRequest()
    }, [dest,origin])


  //Checck if user is logged in
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if(loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
    }
  }, [dispatch])

  // Getting the journey data
 
  useEffect( ()=> {
    const getJourneys = async ()=> {
      if(user) {
        const journeysFromServer = await fetchJourneys(user.id)
        console.log(journeysFromServer.data)
        await journeysFromServer.data.reduce(async (promise, x) => {
          await promise
          const formattedStart = await axios.post(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${x.start_point_lat},${x.start_point_long}&key=AIzaSyCCAF6rcHPyq2AdkgzFKn2ISTk9GsgIKgY`)
          const formattedEnd = await axios.post(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${x.end_point_lat},${x.end_point_long}&key=AIzaSyCCAF6rcHPyq2AdkgzFKn2ISTk9GsgIKgY`)

          x.start = formattedStart.data.results[0].formatted_address 
          x.end = formattedEnd.data.results[0].formatted_address
        }, Promise.resolve())
        
        console.log(journeysFromServer.data)
        dispatch(setJourneys(journeysFromServer.data))
     }
    }
    
    getJourneys()
    console.log(journeys)

  }, [dest])

  const deleteJourney = async ( id ) => {
    console.log("delete")

    // Still getting a 405 error when I try to delete an entry
    // Also wrong url currently used inthis code 
    // await fetch(`${currentUrl}/${id}`, {
    //   method: 'DELETE',
    // })

    setJourneys( journeys.filter( (journey) => ( journey.id !== id ) ) );
  }

  const [ShowPastJourneys, setShowPastJourneys] = useState(false)
  
  return (
    <div>
      <div className="App">
        <Header />
      </div>


      <Switch>
        <Route path="/pastjourneys">
          <div>
          
            { journeys.length > 0 ? <Journeys journeys={journeys.slice(0, Math.min( journeys.length, 3 ))}  /> : '' }
          </div>  
        </Route>
      
        <Route path="/login">
          <div>  
            <LoginForm/>
          </div>  
        </Route>

        <Route path="/register">
          <div>  
          <SignupForm/>
          </div>  
        </Route>

        <Route path="/"> 
          <div>
            {user === null ?
              <LoginForm/> :
          <div className="search">
            <Search status='origin' message ="Origin" />
            <Search status='dest' message="Destination" />
          </div>
            }
          </div>
          <div className="mapwrapper">
            <div className="mapinnerwrapper">
            <Maps polyline={polyline} />
            </div>
            <div>
              {attractionList.length > 0? attractionList.map(x => <li> {x[2]}</li>):
              
              ""}

            </div>
          </div>
        
        </Route>
      </Switch>
    </div>
  );
}

export default App;
 