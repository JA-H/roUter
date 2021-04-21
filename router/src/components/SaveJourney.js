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
                <label>Start location</label>
                <input 
                    type='text' 
                    placeholder='Enter Postcode' 
                    value={startLoc}
                    onChange={ (e) => setStartLoc(e.target.value)  }/>
            </div> 
            <div>
                <label>Destination</label>
                <input 
                    type='text' 
                    placeholder='Enter Destination'
                    value={endLoc}
                    onChange={ (e) => setEndLoc(e.target.value)  } />
            </div> 
            <div>
                <input 
                    type='submit' 
                    value='Go'
                    className = 'btn btn-block' />
            </div>

        </form>
    )
}

export default SaveJourney
