import AutoCompleteInput from "./AutoCompleteInput";
import {Button, StyleSheet, View} from "react-native";
import axios from "axios";
import {useEffect, useState} from "react";
// import Geolocation from '@react-native-community/geolocation';
// import Geolocation from 'react-native-geolocation-service';
import * as Location from 'expo-location';

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
   const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    useEffect(() => {
      (async () => {

        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          return;
        }

        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
      })();
    }, []);

    return (
        <View>
            <AutoCompleteInput name={"Place from"} currentLocation={true}/>
            <AutoCompleteInput name={"Place to"} currentLocation={false}/>
            <Button title={"Create ride"}
                    style={styles.button} d title={"submit"}
                    onPress={() => axios.post('https://taxirun-56yus5neyq-uc.a.run.app/rides', {
                    }).then((response) => {

                    })
                    }/>
        </View>
    );
}
export default Ride;
