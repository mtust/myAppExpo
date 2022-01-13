import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import {SafeAreaView, Text, StyleSheet, Button} from 'react-native';
import React, {useContext, useState} from 'react';
import axios from "axios";
import PhoneContext from "./PhoneContext";


const styles = StyleSheet.create({
    root: {flex: 1, padding: 20},
    title: {textAlign: 'center', fontSize: 30},
    codeFieldRoot: {marginTop: 20},
    cell: {
        width: 40,
        height: 40,
        lineHeight: 38,
        fontSize: 24,
        borderWidth: 2,
        borderColor: '#00000030',
        textAlign: 'center',
    },
    focusCell: {
        borderColor: '#000',
    },
});

const CELL_COUNT = 6;

function VerificationSms({navigation}) {
    let phoneNumberContext = useContext(PhoneContext);
    const [value, setValue] = useState('');
    const [error, setError] = useState('');
    const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    });
    return (
        <SafeAreaView>
            <CodeField
                ref={ref}
                {...props}
                // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
                value={value}
                onChangeText={setValue}
                cellCount={6}
                rootStyle={styles.codeFieldRoot}
                keyboardType="number-pad"
                textContentType="oneTimeCode"
                renderCell={({index, symbol, isFocused}) => (
                    <Text
                        key={index}
                        style={[styles.cell, isFocused && styles.focusCell]}
                        onLayout={getCellOnLayoutHandler(index)}>
                        {symbol || (isFocused ? <Cursor/> : null)}
                    </Text>
                )}
            />
            <Button title={"Submit"}  onPress={() =>
                axios.post('http://localhost:8080/users/verify/code', {
                    code: {value}.value,
                    phoneNumber: phoneNumberContext.phoneNumber
                }).then((response) => {
                    if (response.status === 200) {
                        navigation.navigate("Login")
                    }
                    if (response.status === 406) {
                        setError(response.data.message)
                    }
                })}/>
            <Text>{error}</Text>
        </SafeAreaView>
    )
}

export default VerificationSms;