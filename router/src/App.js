import './App.css';
import Maps from './components/Maps';
import Search from './components/Search';
import Journeys from './components/Journeys'

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

  // Delete journey
  const deleteJourney = ( id ) => {
    setJourneys( journeys.filter( (journey) => ( journey.id !== id ) ) );
  }



  return (
    <div className="App">
      <header className="App-header">
        roUter
      </header>
      { journeys.length > 0 ? <Journeys journeys={journeys} onDelete={deleteJourney} /> : <h2> Add a journey </h2>  }
      <Maps />
      <Search />
    </div>
  );
}

export default App;
 