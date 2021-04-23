import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { addOrigin } from '../reducers/originReducer';
import { addDestination } from '../reducers/destinationReducer';

import GoogleMapReact from 'google-map-react';

const searchOptions = {
  location: new window.google.maps.LatLng(40.76778893891831,-73.97898449879337),
  radius: 2000,
  types: ['address']
}


const Search = ({status, message}) => {

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
      <PlacesAutocomplete
      value={address}
      onChange={handleChange}
      onSelect={handleSelect}
      searchOptions={searchOptions}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <div className="innersearchwrapper">
          <input
            {...getInputProps({
              placeholder: message,
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
