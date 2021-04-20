import Journey from './Journey'

const Journeys = ( {journeys, onDelete} ) => {
    
    return (
        <div>
            <h2>Past journeys:</h2>
            {journeys.map((journey) => 
                (<Journey key={journey.id} journey={journey} onDelete={onDelete} /> ) 
            )}

        </div>
    )
}

export default Journeys
