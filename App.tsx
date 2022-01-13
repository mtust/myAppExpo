import {StyleSheet, View} from 'react-native';
import Login from "./Login";
import VerificationSms from "./VerificationSms";
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from '@react-navigation/stack';
import PhoneContext, {defaultContext} from "./PhoneContext";
import {useState} from "react";


export default function App() {
    const Stack = createStackNavigator();
    const [phoneNumber, setPhoneNumber] = useState();
    return (
        <PhoneContext.Provider value={{phoneNumber, setPhoneNumber} as unknown as defaultContext}>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Home">
                    <Stack.Screen name="Login" component={Login}/>
                    <Stack.Screen name="VerificationSms" component={VerificationSms}/>
                </Stack.Navigator>
            </NavigationContainer>
        </PhoneContext.Provider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
