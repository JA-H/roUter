
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'
import getPolyLine from './services/stroll.js'
import fetchJourneys from './services/fetchJourneys'

import './App.css';
import Header from './components/Header';
import Maps from './components/Maps';
import Search from './components/Search';
import Journeys from './components/Journeys';
import SaveJourney from './components/SaveJourney';






function App() {

  let origin = useSelector(state=> state.origin)
  let dest = useSelector(state=> state.destination)

  const [polyline, setPolyline] = useState('y~nwFzqlbMg@W[[gAmAwA}Aa@c@MXsAbC}@bB_EtHwFiGc@g@b@f@lBtBx@uAxBcE`G_LxDgHd@ZHJFHE^XLV{AP_AQ~@yBvMWtA]hAbDlDf@V')

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
    console.log('data resposne is' + response.polyline)
    setPolyline(response.polyline)

    }

    hello()
    
    
    
  }, [dest,origin])
  

  // Getting the journey data
  const [journeys, setJourneys] = useState([])

  useEffect( ()=> {
    const getJourneys = async ()=> {
      const journeysFromServer = await fetchJourneys()
      setJourneys(journeysFromServer)
    }
    getJourneys()
  }, [])


  // Journey methods
  const currentUrl = 'http://127.0.0.1:5000/users/2/journeys'

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
      Origin <Search status='origin' />
      Destination <Search status='dest'/>
      <SaveJourney onAdd={addJourney} />
      { journeys.length > 0 ? <Journeys journeys={journeys} onDelete={deleteJourney} /> : '' }
      <Maps polyline={polyline} />

    </div>
  );
}

export default App;
 