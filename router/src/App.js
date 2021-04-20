import './App.css';
import Header from './components/Header';
import Maps from './components/Maps';
import Search from './components/Search';
import Journeys from './components/Journeys';

import { useState } from 'react'


function App() {

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
    {
        "id": 2,
        "date_posted": "2021-04-08 20:38:08.256556",
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
      <Search onAdd={addJourney} />
      { journeys.length > 0 ? <Journeys journeys={journeys} onDelete={deleteJourney} /> : <h2> Start a journey </h2>  }
      <Maps />
    </div>
  );
}

export default App;
 