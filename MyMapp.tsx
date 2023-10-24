import {GoogleMap, Marker, withGoogleMap, withScriptjs} from "react-google-maps";
import React, {Fragment, useState} from "react";
import axios from "axios";
import Autocomplete from "react-google-autocomplete";
import {View} from "react-native";

const YOUR_GOOGLE_MAPS_API_KEY = "AIzaSyCqDDNHBHNG96GVEIFwgAuIFD9k4O-h96o";

let locationFrom = {
    address: 'test from updated 2 ',
    lat: 37.42216,
    lng: -122.08427,
}

let locationTo = {
    address: 'test To updated 2 ',
    lat: 37.42216,
    lng: -122.08427,
}

const defaultUrl = {
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key" + YOUR_GOOGLE_MAPS_API_KEY + "&v=3.exp&libraries=geometry,drawing,places",
}

const CMap = withScriptjs(withGoogleMap(props =>
    <GoogleMap
        defaultZoom={8}
        defaultCenter={{lat: -34.397, lng: 150.644}}>
        {props.children}
    </GoogleMap>
));


function MyMapp() {
    const [data, setData] = useState();
    return (
        <View>
            <Fragment>
                <CMap
                    googleMapURL={defaultUrl.googleMapURL}
                    loadingElement={<div style={{height: `100%`}}/>}
                    containerElement={<div style={{height: `700px`}}/>}
                    mapElement={<div style={{height: `100%`}}/>}
                >
                    <Marker
                        position={{lat: -34.397, lng: 150.644}}
                    />
                </CMap>

                <Autocomplete
                    apiKey={YOUR_GOOGLE_MAPS_API_KEY}
                    onPlaceSelected={(place) => console.log(place)}
                />
                <button onClick={() => axios.post('https://taxirun-56yus5neyq-uc.a.run.app/rides', {
                    placeFrom: {
                        point: {
                            x: locationFrom.lat,
                            y: locationFrom.lng
                        },
                        name: locationFrom.address
                    },
                    placeTo: {
                        point: {
                            x: locationTo.lat,
                            y: locationTo.lng
                        },
                        name: locationTo.address
                    }
                }).then()}>Create ride
                </button>
            </Fragment>
        </View>
    );
}

export default MyMapp;