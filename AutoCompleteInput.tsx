import {View, StyleSheet, Text, Dimensions, ScrollView} from 'react-native';
import {GooglePlaceData, GooglePlaceDetail, GooglePlacesAutocomplete} from "react-native-google-places-autocomplete";
import Constants from 'expo-constants';
import {useEffect, useState} from "react";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        paddingTop: Constants.statusBarHeight + 10,
        backgroundColor: '#ecf0f1',
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
});

const GOOGLE_PLACES_API_KEY = "AIzaSyCqDDNHBHNG96GVEIFwgAuIFD9k4O-h96o";
navigator.geolocation = require('@react-native-community/geolocation');
navigator.geolocation = require('react-native-geolocation-service');

function AutoCompleteInput(props : { name : string , currentLocation : boolean}) {
    useEffect(() => {
        // navigator.geolocation.getCurrentPosition(() => {});
        // navigator.geolocation = require('@react-native-community/geolocation');
        // navigator.geolocation = require('react-native-geolocation-service');
    });
    const [data, setData] = useState<GooglePlaceData>()
    const [details, setDetails] = useState<GooglePlaceDetail | undefined | null>()
    useEffect(() => {
        debugger;
    }, [data]);

    return (
        <View>
            <ScrollView>
                {/*<MapView style={styles.map}/>*/}
                <GooglePlacesAutocomplete
                    placeholder={props.name}
                    currentLocation={props.currentLocation}
                    currentLocationLabel={props.currentLocation ? 'Current location' : ""}
                    listViewDisplayed={false} // true/false/undefined
                    fetchDetails={true}
                    keyboardShouldPersistTaps="handled"
                    enablePoweredByContainer={true}
                    GooglePlacesDetailsQuery={{ fields: "geometry" }}
                    nearbyPlacesAPI={'GoogleReverseGeocoding'}
                    query={{
                        key: GOOGLE_PLACES_API_KEY,
                        language: 'en', // language of the results
                    }}
                    onPress={(data, details = null) => {
                        setData(data); setDetails(details)}
                    }
                    onFail={(error) => setData(error)}
                />

            </ScrollView>
            <Text>data: {JSON.stringify(data)}</Text>
            <Text>details: {JSON.stringify(details)}</Text>

        </View>
    );
}

export default AutoCompleteInput;