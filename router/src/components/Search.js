import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { addOrigin } from '../reducers/originReducer';
import { addDestination } from '../reducers/destinationReducer';



const Search = ({status}) => {

  const dispatch = useDispatch()
  let originState =  useSelector(state => state.origin)
  


  const [address,setAddress] = useState('')

  const handleChange = (e) => {
      
      setAddress(e)

  }

  const handleSelect = (e) => {
      setAddress(e)
      geocodeByAddress(e)
        .then((results) => {
          
            return getLatLng(results[0])
            
          })
        .then((latLng) => {console.log('Success' + latLng )

        if(status === 'origin') {dispatch(addOrigin(latLng)) }
        if(status === 'dest') {dispatch(addDestination(latLng))}
        })
        .catch(error => console.error('Error', error)); 

      
  }
  return (
     /* <form>
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
      </form> */

      <PlacesAutocomplete
      value={address}
      onChange={handleChange}
      onSelect={handleSelect}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <div>
          <input
            {...getInputProps({
              placeholder: 'Search Places ...',
              className: 'location-search-input',
            })}
          />
          <div className="autocomplete-dropdown-container">
            {loading && <div>Loading...</div>}
            {suggestions.map(suggestion => {
              const className = suggestion.active
                ? 'suggestion-item--active'
                : 'suggestion-item';
              // inline style for demonstration purpose
              const style = suggestion.active
                ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                : { backgroundColor: '#ffffff', cursor: 'pointer' };
              return (
                <div
                  {...getSuggestionItemProps(suggestion, {
                    className,
                    style,
                  })}
                >
                  <span>{suggestion.description}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </PlacesAutocomplete>
  )
}

export default Search
