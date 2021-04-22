import React from 'react';
import GoogleMapReact from 'google-map-react';

import Marker from './MapMarker'

//will be passing in different props later
//polyline can technically be made into a component; may be worth considering later on ordering of loading but v. low priority.

//props to take: polyline, ?attractions (to mark on map)
function Maps({polyline}) {

  const decodedPathLongLat = window.google.maps.geometry.encoding.decodePath(polyline); 
  const decodedPath = decodedPathLongLat.map(x => x.toJSON());

  const findCenter = (decodedPath) => {
    let center={
      lat: (Math.min.apply(Math, decodedPath.map(function(o) { return o.lat; }))+Math.max.apply(Math, decodedPath.map(function(o) { return o.lat; })))/2,
      lng:(Math.min.apply(Math, decodedPath.map(function(o) { return o.lng; }))+Math.max.apply(Math, decodedPath.map(function(o) { return o.lng; })))/2
    }
    return(center)
  }

  //want to find max between horizontal and vertical span
  const distance = (lat1, lat2, lon1, lon2) => {
    let k = 111194.9;    // 2piR/360 (R is radius of earth)
    
    return(
      k*Math.max(Math.abs(lat1-lat2),Math.abs(lon1-lon2))
    )
  }

  //Slightly jazzy maths, basically each zoom level is 2x the scale of the previous.
  const autoZoom = (decodedPath) => {
    let maxSpan = distance(
                            Math.min.apply(Math, decodedPath.map(function(o) { return o.lat; })), 
                            Math.max.apply(Math, decodedPath.map(function(o) { return o.lat; })),
                            Math.min.apply(Math, decodedPath.map(function(o) { return o.lng; })),
                            Math.max.apply(Math, decodedPath.map(function(o) { return o.lng; }))
                          )
    const zoomlvl = Math.floor(20-Math.log2(maxSpan/1128.5))
    
    if (zoomlvl>21){
      return(21)
    } else if (zoomlvl<0){
      return(0)
    } else {
      return(zoomlvl)
    }
      
  }
  
  //Will need to turn to hooks later
  //may handle center and zoom as a function of polyline, so initially shows whole line.
  
  /* Zoom is a vague measure, may improve on but it's okay for now. Might force map to only focus on NY City*/
  let defaultProps = {
      markers: decodedPath,
      center: findCenter(decodedPath),
      zoom: autoZoom(decodedPath)
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
        center={defaultProps.center}
        zoom={defaultProps.zoom}
        
        onGoogleApiLoaded={({map, maps}) => renderPolylines(map, maps)}
      >
          <Marker text={'START'} lat={defaultProps.markers[0].lat} lng={defaultProps.markers[0].lng} />
          <Marker text={'END'} lat={defaultProps.markers[defaultProps.markers.length-1].lat} lng={defaultProps.markers[defaultProps.markers.length-1].lng} />
      </GoogleMapReact>
    </div>
  )
}

export default Maps
