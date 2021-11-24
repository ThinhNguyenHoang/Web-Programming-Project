import React from 'react'
import {withGoogleMap, withScriptjs, GoogleMap} from "react-google-maps"
import Marker from "react-google-maps/lib/components/Marker";
import InfoBox from "react-google-maps/lib/components/addons/InfoBox";
import Polyline from "react-google-maps/lib/components/Polyline";
// 10.773372974823703, 106.66061594539501  :CS 1
// 10.880717352789283, 106.80513775411487 : CS 2

const optionsPolyline = {
    strokeColor: 'red',
    strokeOpacity: 0.8,
    strokeWeight: 3,
    fillColor: '#085daa',
    fillOpacity: 0.35,
    clickable: false,
    draggable: false,
    editable: false,
    visible: true,
    radius: 30000,
    zIndex: 1
};

const positions = [{
    lat: 10.773372974823703, lng: 106.66061594539501 , label: "Của hàng 1 - Ông chủ: Thịnh 😀   "
}, {
    lat: 10.880717352789283, lng: 106.80513775411487, label: "Cửa hàng 2 - Ông Boss: Thịnh Nguyễn 👨🏻‍🎓    "
}]

const options = {closeBoxURL: '', enableEventPropagation: true};
const Map = () => {
    return (
        <div>
            <GoogleMap
                defaultZoom={8}
                defaultCenter={{lat: 10.773372974823703, lng: 106.66061594539501}}
            >
                {
                    positions && positions.map((position, index) =>
                        <Marker
                            position={new window.google.maps.LatLng(position)}
                        >

                            <InfoBox
                                options={options}
                            >
                                <>
                                    <div style={{ backgroundColor: 'green', color: 'white', borderRadius:'1em', padding: '0.2em' }}>
                                        {position.label}
                                    </div>
                                </>
                            </InfoBox>

                        </Marker>
                    )
                }
                <Polyline
                    path={positions}
                    options={optionsPolyline}
                />

            </GoogleMap>
        </div>
    );
}

export default withScriptjs(withGoogleMap(Map));
