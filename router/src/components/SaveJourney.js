import { useState } from 'react';

const SaveJourney = ({ onAdd }) => {
    const [startLoc, setStartLoc] = useState('')
    const [endLoc, setEndLoc] = useState('')

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
