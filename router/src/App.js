import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'
import getPolyLine from './services/stroll.js'
import fetchJourneysTest from './services/fetchJourneysTest'

import './App.css';
import Header from './components/Header';
import Maps from './components/Maps';
import Search from './components/Search';
import Journeys from './components/Journeys';
import SaveJourney from './components/SaveJourney';
import SignupForm from './components/Signup'
import LoginForm from './components/Login'





function App() {

  let origin = useSelector(state=> state.origin)
  let dest = useSelector(state=> state.destination)

  const [polyline, setPolyline] = useState("y~nwFzqlbMg@W[[gAmAwA}Aa@c@MXsAbC}@bB_EtHwFiGc@g@b@f@lBtBx@uAxBcE`G_LxDgHd@ZHJFHE^XLV{AP_AQ~@yBvMWtA]hAbDlDf@V");
  const [attractionList, setAttractionList] = useState([])

  useEffect(() => {  
    const hello = async () => {
      let newObject = {
        journey_type: "Simple",
        origin: `[${origin.lat}, ${origin.lng}]`,
        destination: `[${dest.lat}, ${dest.lng}]` ,
        waypoints: "[]",
        visit_nearby_attractions: "True"
    }

    console.log(origin + dest)

    const response = await getPolyLine(newObject)
    console.log('data response is ' + response.polyline)
    setPolyline(response.polyline)
    console.log('data response for attractions ' + response.attractions)
    setAttractionList(response.attractions)

    }

    hello()
    
    
    
  }, [dest,origin])
  

  // Getting the journey data
  const currentUrl = 'http://127.0.0.1:5000/users/2/journeys'
  const [journeys, setJourneys] = useState([])

  useEffect( ()=> {
    const getJourneys = async ()=> {
      const journeysFromServer = await fetchJourneysTest( currentUrl)
      setJourneys(journeysFromServer.data)
    }
    getJourneys()

  }, [])




  // Journey methods

  const addJourney = (journey) => {
    
    const id = Math.floor( Math.random()*1000 ) + 1
    const newJourney = {id, ...journey}
    setJourneys([...journeys, newJourney])
  }

  const deleteJourney = async ( id ) => {
    setJourneys( journeys.filter( (journey) => ( journey.id !== id ) ) );
  }


  return (
    <div className="App">
      <Header />
      <Search status='origin' message="Start location..." />
      <Search status='dest' message="Destination..."/>
      <SaveJourney onAdd={addJourney} />
      { journeys.length > 0 ? <Journeys journeys={journeys.slice(0, Math.min( journeys.length, 3 ))} onDelete={deleteJourney} /> : '' }
      <LoginForm/>
      <Maps polyline={polyline} />
    </div>
  );
}

export default App;
 