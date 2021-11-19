import React from 'react';
import Map from "./Map";


const api_key = process.env.MAP_API;
const LocationMapWithMarker = () => {
    return (
        <Map
            googleMapURL={`https://maps.googleapis.com/maps/api/js?key=AIzaSyAMeYALPFuQ_klstxu-M8WDNUmR4hoEJZM`}
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `90vh`, margin: `auto`, border: '2px solid black' }} />}
            mapElement={<div style={{ height: `100%` }} />}
        />
    );
};

export default LocationMapWithMarker;
