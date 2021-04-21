import './App.css';
import Header from './components/Header';
import Maps from './components/Maps';
import Search from './components/Search';
import { useSelector } from 'react-redux'
import getPolyLine from './services/stroll.js'
import { useEffect } from 'react'

import Journeys from './components/Journeys';

import { useState } from 'react'
import SaveJourney from './components/SaveJourney';

function App() {

  let origin = useSelector(state=> state.origin)
  let dest = useSelector(state=> state.destination)

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
    console.log('data resposne is' + response.destination)

    }

    hello()
    
    
    
  }, [dest,origin])
   
  
  //Placeholder data, to be replaced with data from database
  const [journeys, setJourneys] = useState([
    {
        "id": 1,
        "date_posted": "2021-04-08 20:37:10.525489",
        "user_id": 2,
        "start_point_long": 4.0,
        "start_point_lat": 4.0,
        "end_point_long": 4.0,
        "end_point_lat": 4.0,
        "waypoints": "[]",
        "polyline": "something"
    },
    ]
  )

  // Journey methods
  const addJourney = (journey) => {
    //Currently the add journey just takes input and output text for start location and destination
    //Obviously the following needs to change when we start dealing with the backend
    const id = Math.floor( Math.random()*1000 ) + 1
    const newJourney = {id, ...journey}
    setJourneys([...journeys, newJourney])
  }

  const deleteJourney = ( id ) => {
    setJourneys( journeys.filter( (journey) => ( journey.id !== id ) ) );
  }



  return (
    <div className="App">
      <Header />
      Origin <Search status='origin' />
      Destination <Search status='dest'/>
      <SaveJourney onAdd={addJourney} origin={origin} dest={dest} />
      { journeys.length > 0 ? <Journeys journeys={journeys} onDelete={deleteJourney} /> : <h2> Start a journey </h2> }
      <Maps />

    </div>
  );
}

export default App;
 