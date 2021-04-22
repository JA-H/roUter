
import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import Maps from './components/Maps';
import Search from './components/Search';
import { useSelector } from 'react-redux'
import getPolyLine from './services/stroll.js'


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
    
// import Journeys from './components/Journeys';

// import { useState } from 'react'




//   // Journey methods
//   const addJourney = (journey) => {
//     //Currently the add journey just takes input and output text for start location and destination
//     //Obviously the following needs to change when we start dealing with the backend
//     const id = Math.floor( Math.random()*1000 ) + 1
//     const newJourney = {id, ...journey}
//     setJourneys([...journeys, newJourney])
//   }

//   const deleteJourney = ( id ) => {
//     setJourneys( journeys.filter( (journey) => ( journey.id !== id ) ) );
//   }



  return (
    <div className="App">
      <Header />
      Origin <Search status='origin' />
      Destination <Search status='dest'/>
      {/* <Search onAdd={addJourney} /> */}
      {/* journeys.length > 0 ? <Journeys journeys={journeys} onDelete={deleteJourney} /> : <h2> Start a journey </h2> */  }
      <Maps polyline={polyline} />

    </div>
  );
}

export default App;
 