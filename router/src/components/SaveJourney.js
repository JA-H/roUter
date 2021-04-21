import { useState } from 'react';

const SaveJourney = ({ onAdd, origin, dest }) => {
    const [startLoc, setStartLoc] = useState(origin)
    const [endLoc, setEndLoc] = useState(dest)

    const onSubmit = (e) => {
        e.preventDefault()
        if(!startLoc || !endLoc){
            alert('Please add start and end locations')
            return
        }

        onAdd( {startLoc, endLoc} )

        setStartLoc('')
        setEndLoc('')

    }


    return (
        <form onSubmit={onSubmit}> 
            <div>
                <input 
                    type='submit' 
                    value='Save route'
                    className = 'btn btn-block' />
            </div>

        </form>
    )
}

export default SaveJourney
