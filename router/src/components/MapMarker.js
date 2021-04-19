import React from 'react'

function MapMarker(props) {
    return (
        <div>
            <div style={{width: '1.5rem', background: '#00a1e1', color: '#ffffff', padding: '0.3rem'}}>
                {props.text}
            </div>
        </div>
    )
}

export default MapMarker
