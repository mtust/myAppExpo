import AutoCompleteInput from "./AutoCompleteInput";
import {Button, StyleSheet, View} from "react-native";
import axios from "axios";
import {useEffect} from "react";
import Geolocation from '@react-native-community/geolocation';

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: 'black',
    }
});


function Ride() {
    useEffect(() => {
       navigator.geolocation = require('@react-native-community/geolocation');
       navigator.geolocation = require('react-native-geolocation-service');
       // navigator.geolocation.getCurrentPosition(() => {});
        // navigator.geolocation = require('@react-native-community/geolocation');
        // navigator.geolocation = require('react-native-geolocation-service');
    });

    return (
        <View>
            <AutoCompleteInput name={"Place from"} currentLocation={true}/>
            <AutoCompleteInput name={"Place to"} currentLocation={false}/>
            <Button title={"Create ride"}
                    style={styles.button} d title={"submit"}
                    onPress={() => axios.post('http://localhost:8080/users/verify/phone', {
                    }).then((response) => {

                    })
                    }/>
        </View>
    );
}
export default Ride;