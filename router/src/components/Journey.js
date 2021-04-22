import { FaTrash } from 'react-icons/fa'

const Journey = ( {journey, onDelete} ) => {
    return (
        // Style this in a similar manner to task but with CSS identifier 'journey'
        <div className="journey">
            <h4 style={{}} > From [{journey.start_point_long}, {journey.start_point_lat}] to [{journey.end_point_long}, {journey.end_point_lat}]
            <FaTrash style={{ color:'red', cursor:'pointer',padding: "10px" }} onClick={ ()=> ( onDelete(journey.id) ) } /></h4>
        </div>
    )
}

export default Journey
