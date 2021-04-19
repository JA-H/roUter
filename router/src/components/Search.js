const Search = () => {
    return (
        <form>
            <div>
                <label>Start</label>
                <input type='text' placeholder='Enter 
                Postcode' />
            </div> 
            <div>
                <label>Destination</label>
                <input type='text' placeholder='Enter 
                Destination' />
            </div> 

            <button type='submit' value='Go' /> 
        </form>
    )
}

export default Search
