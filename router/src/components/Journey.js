import { FaTimes } from 'react-icons/fa'

const Journey = ( {journey, onDelete} ) => {
    return (
        // Style this in a similar manner to task but with CSS identifier 'journey'
        <div className="journey">
            <h4> From [{journey.start_point_long}, {journey.start_point_lat}] to [{journey.end_point_long}, {journey.end_point_lat}]
            <FaTimes style={{ color:'red', cursor:'pointer'}} onClick={ ()=> ( onDelete(journey.id) ) } /></h4>
        </div>
    )
}

export default Journey
