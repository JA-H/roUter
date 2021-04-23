import { FaTimes, FaTrash } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import {useHistory} from 'react-router-dom'
import { addOrigin } from '../reducers/originReducer';
import { addDestination } from '../reducers/destinationReducer';

const Journey = ( {journey, onDelete} ) => {

    const dispatch = useDispatch()
    const history = useHistory()
    const onClickHandler = () => {
        const origin = {
            lat: journey.start_point_lat,
            lng: journey.start_point_long
        }

        dispatch(addOrigin(origin))



        const dest = {
            lat: journey.end_point_lat,
            lng: journey.end_point_long

        }

        dispatch(addDestination(dest))
        history.push('/')

    }
    return (
        // Style this in a similar manner to task but with CSS identifier 'journey'
        <div className="journey" onClick={onClickHandler}>
            <h4> From {journey.start} to {journey.end}
            <FaTimes style={{ color:'red', cursor:'pointer'}} onClick={ ()=> ( onDelete(journey.id) ) } /></h4>
        </div>
    )
}

export default Journey
