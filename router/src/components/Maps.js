import React from 'react';
import GoogleMapReact from 'google-map-react';

import Marker from './MapMarker'

//will be passing in different props later
//polyline can technically be made into a component; may be worth considering later on ordering of loading but v. low priority.

//props to take: polyline, ?attractions (to mark on map)
function Maps() {

  const decodedPathLongLat = window.google.maps.geometry.encoding.decodePath('umywFt_pbMf@JrAv@DBRq@Rg@fBuFtAqEXu@DMPJTNr@f@jAr@dBjAf@Tt@f@\R]Su@g@Wr@cAbDwGvSqAdECJq@?g@[k@@_@Wu@g@IN_@XQFW@SAa@MQQQYQ?s@?mC?cFDgCB[CcCB_@h@NJSr@@H@@d@ZKZICEAKDGHCN@PDJ@BB@ITGTi@[KGa@rAQf@UOTNPg@`@sAJFh@ZFUHUCCAACECM?ODMHGLAD?BBDMDMMKYOAIRu@OKZa@He@?SAc@hAmDdAeDh@eBTq@mBmAm@a@_Ao@oCiBOI?GMCgD{B_Ak@J[T_@R_@SKk@_@u@o@YKUG[EQ?P?ZDTFXJ`BnARJDQPs@D[HHHNPDRENAvBx@DUJD`@J`AXVLl@\XPh@f@Z^Zd@r@vAf@v@r@bAt@|@dAfAhA~@fAh@\NJt@DPPZVb@L`@Vd@Xd@J@RC@BPIRE\BP@^MKXRP@TBZD@LG\Aj@FH@Qr@e@Ed@D]fAABVN`@XPp@h@ZBf@hAr@iAs@Cg@i@[k@@YSe@YUQCFCDGK]m@Uc@@C?A@G?ECKCAx@kC_@LQASC?C@w@DkARiA`@iAFg@AWGqA]i@[P'); 
  const decodedPath = decodedPathLongLat.map(x => x.toJSON());

  const findCenter = (decodedPath) => {
    let center={
      lat: (Math.min.apply(Math, decodedPath.map(function(o) { return o.lat; }))+Math.max.apply(Math, decodedPath.map(function(o) { return o.lat; })))/2,
      lng:(Math.min.apply(Math, decodedPath.map(function(o) { return o.lng; }))+Math.max.apply(Math, decodedPath.map(function(o) { return o.lng; })))/2
    }
    return(center)
  }
  
  //Will need to turn to hooks later
  //may handle center and zoom as a function of polyline, so initially shows whole line.
  
  /* Zoom is a vague measure, may improve on but it's okay for now. Might force map to only focus on NY City*/
  let defaultProps = {
      markers: decodedPath,
      center: findCenter(decodedPath),
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
          <Marker text={'START'} lat={defaultProps.markers[0].lat} lng={defaultProps.markers[0].lng} />
          <Marker text={'END'} lat={defaultProps.markers[defaultProps.markers.length-1].lat} lng={defaultProps.markers[defaultProps.markers.length-1].lng} />
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
