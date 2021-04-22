import Journey from './Journey'

const Journeys = ( {journeys, onDelete} ) => {
    
    return (
        <div>
            {journeys.length > 0 ? <h2>Most recent routes:</h2> : <h2>No routes to show</h2>}
            {journeys.map((journey) => 
                (<Journey key={journey.id} journey={journey} onDelete={onDelete} /> ) 
            )}

        </div>
    )
}

export default Journeys
