import { FaTrash } from 'react-icons/fa'

const Journey = ( {journey, onDelete} ) => {
    return (
        // Style this in a similar manner to task but with CSS identifier 'journey'
        <div className="journey" >
            <h4> From [{journey.start_point_long}, {journey.start_point_lat}] to [{journey.end_point_long}, {journey.end_point_lat}]
            </h4>
            <FaTrash style={{ color:'red', cursor:'pointer',padding: "10px" }} onClick={ ()=> ( onDelete(journey.id) ) } />
            
        </div>
    )
}

export default Journey
