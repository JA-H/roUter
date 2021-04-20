import './App.css';
import Maps from './components/Maps';
import Search from './components/Search';
import { useSelector } from 'react-redux'
import getPolyLine from './services/stroll.js'
import { useEffect } from 'react'

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
    


  return (
    <div className="App">
     
      <Maps />
     Origin <Search status='origin' />
      Destination <Search status='dest'/>
    </div>
  );
}

export default App;
