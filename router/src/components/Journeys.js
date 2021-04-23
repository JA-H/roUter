import Journey from './Journey'
import { useSelector, useDispatch } from 'react-redux'

const Journeys = ( { onDelete} ) => {


    const journeys = useSelector(state => state.journey)
    
    return (
        <div className="journeywrapper">
            <h2>Past routes:</h2>
            {journeys.map((journey) => 
                (<Journey key={journey.id} journey={journey} onDelete={onDelete} /> ) 
            )}

        </div>
    )
}

export default Journeys
