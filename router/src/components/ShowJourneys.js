const ShowJourneys = ({ onAdd, showPast }) => {
    return (
    <input
        type='submit' 
        value={!showPast ? 'Show previous routes' : 'Hide previous routes' }
        className = 'btn btn-block'
        onClick={onAdd} />
    )
}

export default ShowJourneys
