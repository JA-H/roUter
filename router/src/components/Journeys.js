import Journey from './Journey'

const Journeys = ( {journeys} ) => {
    
    return (
        <div>
            <h2>Past journeys:</h2>
            {journeys.map((journey) => 
                (<Journey key={journey.id} journey={journey} /> ) 
            )}

        </div>
    )
}

export default Journeys
