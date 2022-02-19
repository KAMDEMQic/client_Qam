import React from 'react';
import { TextInput, StyleSheet } from 'react-native'

const Inputt = (props) => {
    return (
        <TextInput
        style={styles.input}
        placeholder={props.placeholder}
        name={props.name}
        id={props.id}
        value={props.value}
        autoCorrect={props.autoCorrect}
        onChangeText={props.onChangeText}
        onFocus={props.onFocus}
        secureTextEntry={props.secureTextEntry}
        keyboardType={props.keyboardType}
        >
        </TextInput>
    );
}

const styles = StyleSheet.create({
    input: {
        width: '40%',
        height: 40,
        backgroundColor: 'white',
        margin: 5,
        marginTop: 10,
        borderRadius: 20,
        padding: 10,
        borderWidth: 2,
        borderColor: 'orange',
        // alignItems: "flex-end"


    },
});

export default Inputt;