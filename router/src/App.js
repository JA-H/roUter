import './App.css';
import Maps from './components/Maps';
import Search from './components/Search';
import Journeys from './components/Journeys'

import { useState } from 'react'


function App() {

  const [journeys, setJourneys] = useState([
    { id: 1,},
    { id: 2,}
  ]
  )



  return (
    <div className="App">
      <header className="App-header">
        roUter
      </header>
      <Journeys journeys={journeys} />
      <Maps />
      <Search />
    </div>
  );
}

export default App;
