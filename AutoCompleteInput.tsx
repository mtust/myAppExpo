import {View, StyleSheet, Text, Dimensions, ScrollView} from 'react-native';
import {GooglePlaceData, GooglePlacesAutocomplete} from "react-native-google-places-autocomplete";
import Constants from 'expo-constants';
import {useEffect, useState} from "react";
// import MyMapp from "./MyMapp";
// import MapView from 'react-native-maps';

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

function AutoCompleteInput() {
    const [data, setData] = useState<GooglePlaceData>()
    useEffect(() => {
    }, [data]);

    return (
            <ScrollView>
            {/*<MapView style={styles.map}/>*/}
            <GooglePlacesAutocomplete
                placeholder="Search"
                listViewDisplayed={false} // true/false/undefined
                fetchDetails={true}
                keyboardShouldPersistTaps="handled"
                enablePoweredByContainer={true}
                query={{
                    key: GOOGLE_PLACES_API_KEY,
                    language: 'ua', // language of the results
                }}
                onPress={(data, details = null) => setData(data)}
                onFail={(error) => setData(error)}
            />

            <Text>{data?.place_id}</Text>
            </ScrollView>
    );
}

export default AutoCompleteInput;