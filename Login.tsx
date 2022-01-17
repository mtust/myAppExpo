import {useContext, useEffect, useState} from "react"
import {Button, Text, View, StyleSheet, SafeAreaView} from "react-native"
import {isValidPhoneNumber} from 'react-phone-number-input'
import axios from "axios";
import PhoneInput from 'react-phone-number-input/react-native-input'
import PhoneContext from "./PhoneContext";
import Ride from "./Ride";

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: 'black',
    },
    input: {
        margin: 15,
        height: 40,
        borderColor: '#7a42f4',
        borderWidth: 1
    },
});

function Login({navigation}) {
    let phoneNumberContext = useContext(PhoneContext);
    const [phoneNumber, setPhoneNumber] = useState<string>()
    const [isValidPhone, setIsValidPhone] = useState<boolean>(false);

    useEffect(() => {
        isValidNumber();
    }, [phoneNumber]);

    function isValidNumber() {
        if (phoneNumber != undefined) {
            setIsValidPhone(isValidPhoneNumber(phoneNumber));
        }
    }

    return (
        <SafeAreaView>
            <PhoneInput
                placeholder="Enter phone number"
                value={phoneNumber}
                onChange={setPhoneNumber}
            />
            <Text>
                number: {phoneNumber}
                is valid phone number: {!isValidPhone ? "false" : "true"}
            </Text>
            <Button style={styles.button} disabled={!isValidPhone} title={"submit"}
                    onPress={() => axios.post('http://localhost:8080/users/verify/phone', {
                        phoneNumber: {phoneNumber}.phoneNumber
                    }).then((response) => {
                        if (response.status === 200) {
                            phoneNumberContext.setPhoneNumber?.(phoneNumber)
                            navigation.navigate("VerificationSms")
                        }
                    })
                    }/>
            <Ride/>
        </SafeAreaView>
    );
}

export default Login;