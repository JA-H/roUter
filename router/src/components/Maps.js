import React from 'react';
import GoogleMapReact from 'google-map-react';

import Marker from './MapMarker'

//will be passing in different props later
//for now want to figure out polyline.
function Maps() {

    let defaultProps = {
        markers: [
            {lat: 40.71, lng: -73.96},
            {lat: 40.78, lng: -73.96}],
        center: { lat: 40.71421400000001, lng: -73.9614246 },
        zoom: 11
    };

    const renderPolylines = (map, maps) => {
        /** Example of rendering geodesic polyline */
        let geodesicPolyline = new maps.Polyline({
          path: defaultProps.markers,
          geodesic: true,
          strokeColor: '#00a1e1',
          strokeOpacity: 1.0,
          strokeWeight: 4
        })
        geodesicPolyline.setMap(map)
    
        /** Example of rendering non geodesic polyline (straight line) */
        let nonGeodesicPolyline = new maps.Polyline({
          path: defaultProps.markers,
          geodesic: false,
          strokeColor: '#e4e4e4',
          strokeOpacity: 0.7,
          strokeWeight: 3
        })
        nonGeodesicPolyline.setMap(map)
    
        fitBounds(map, maps)
      }
    
      const fitBounds = (map, maps) => {
        var bounds = new maps.LatLngBounds()
        for (let marker of defaultProps.markers) {
          bounds.extend(
            new maps.LatLng(marker.lat, marker.lng)
          )
        }
        map.fitBounds(bounds)
      }


    return (
        <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyCzSDLwakvV-7nq3GXYc1sAapKFiAL8Fd4"}}
          defaultCenter={defaultProps.center}
          defaultZoom={defaultProps.zoom}
          onGoogleApiLoaded={({map, maps}) => renderPolylines(map, maps)}
        >
            <Marker text={'DUB'} lat={40.71} lng={-73.96} />
            <Marker text={'YYZ'} lat={40.78} lng={-73.96} />
        </GoogleMapReact>
      </div>
    )
}

export default Maps



// import { Loader } from '@googlemaps/js-api-loader';

// const Map = () => {

    // let map;
    // const additionalOptions = {};

    // const loader = new Loader({
    //     apiKey: "AIzaSyCzSDLwakvV-7nq3GXYc1sAapKFiAL8Fd4",
    //     version: "weekly",
    //     ...additionalOptions,
//     });
//     loader.load().then(() => {
//         map = new google.maps.Map(document.getElementById("map"), {
//         center: { lat: -34.397, lng: 150.644 },
//         zoom: 8,
//         }); 
//     });

//     return (
//         <div onload="loader()">
//             <div id="map">
//             </div>
//         </div>
//     )
// }

// export default Map
