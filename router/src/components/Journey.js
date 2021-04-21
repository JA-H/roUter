import { FaTimes } from 'react-icons/fa'

const Journey = ( {journey, onDelete} ) => {
    return (
        // Style this in a similar manner to task but with CSS identifier 'journey'
        <div className="journey">
            <h3>{journey.date_posted} <FaTimes style={{ color:'red', cursor:'pointer'}} onClick={ ()=> ( onDelete(journey.id) ) } /> </h3>
            <p>
                Start: Long: {journey.start_point_long} Lat: {journey.start_point_lat} //
                End: Long: {journey.end_point_long} Lat: {journey.end_point_lat}
            </p>

        </div>
    )
}

export default Journey
