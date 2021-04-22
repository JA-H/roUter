import React from 'react';
import GoogleMapReact from 'google-map-react';
import {useState} from 'react';

import Marker from './MapMarker'

var geodesicPolyline;
var nonGeodesicPolyline;

//props to take: ?attractions (to mark on map)
function Maps({polyline}) {

  const [mapVals, setMapVals] = useState({})

  const onMapLoaded = (map, maps) => {
    
    fitBounds(map, maps)

    setMapVals({
      mapsLoaded: true,
      map: map,
      maps: maps
    })
  }

  const decodedPathLongLat = window.google.maps.geometry.encoding.decodePath(polyline); 
  const decodedPath = decodedPathLongLat.map(x => x.toJSON());

  const findCenter = (decodedPath) => {
    let center={
      lat: (Math.min.apply(Math, decodedPath.map(function(o) { return o.lat; }))+Math.max.apply(Math, decodedPath.map(function(o) { return o.lat; })))/2,
      lng: (Math.min.apply(Math, decodedPath.map(function(o) { return o.lng; }))+Math.max.apply(Math, decodedPath.map(function(o) { return o.lng; })))/2
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
    const zoomlvl = Math.floor(Math.log2(20-(maxSpan/1000)/1128.5))
    console.log("zoom lvl is ", zoomlvl);
    
    if (zoomlvl>21){
      return(21)
    } else if (zoomlvl<0){
      return(0)
    } else {
      return(zoomlvl)
    }
      
  }

  const fitBounds = (map, maps) => {
    var bounds = new maps.LatLngBounds()
    for (let marker of decodedPath) {
      bounds.extend(
        new maps.LatLng(marker.lat, marker.lng)
      )
    }

    map.fitBounds(bounds)
  }

  function renderPolylines (markers, map, maps) {   

    /** Example of rendering geodesic polyline */
    if (typeof geodesicPolyline !== 'undefined') {
      geodesicPolyline.setMap(null);
    }
    geodesicPolyline = new maps.Polyline({
    path: markers,
    geodesic: true,
    strokeColor: '#00a1e1',
    strokeOpacity: 1.0,
    strokeWeight: 4
    })
    geodesicPolyline.setMap(map)
    

    /** Example of rendering non geodesic polyline (straight line) */
    if (typeof nonGeodesicPolyline !== 'undefined') {
      nonGeodesicPolyline.setMap(null);
    }
    nonGeodesicPolyline = new maps.Polyline({
    path: markers,
    geodesic: false,
    strokeColor: '#e4e4e4',
    strokeOpacity: 0.7,
    strokeWeight: 3
    })
    nonGeodesicPolyline.setMap(map)
    }




  return (
      <div style={{ height: '90vh', width: '100%'}}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyCzSDLwakvV-7nq3GXYc1sAapKFiAL8Fd4"}}
        center={findCenter(decodedPath)}
        zoom={17/*autoZoom(decodedPath)*/}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({map, maps}) => onMapLoaded(map, maps)}
      >
          <Marker text={'START'} lat={decodedPath[0].lat} lng={decodedPath[0].lng} />
          <Marker text={'END'} lat={decodedPath[decodedPath.length-1].lat} lng={decodedPath[decodedPath.length-1].lng} />
          {mapVals.mapsLoaded ? renderPolylines(decodedPath, mapVals.map, mapVals.maps) : ''}
      </GoogleMapReact>
    </div>
  )
  
}

export default Maps
