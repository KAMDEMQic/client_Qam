import React, { useState, useRef } from "react";
import { View, Text, StyleSheet, Button , Pressable} from "react-native";
import FormContainer from "../../Shared/Form/FormContainer";
import Input from "../../Shared/Form/Input";
import Error from "../../Shared/Error";
import Toast from "react-native-toast-message";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import EasyButton from "../../Shared/StyledComponents/EasyButton";
import PhoneInput from 'react-native-phone-number-input';

import axios from "axios";
import baseURL from "../../assets/common/baseUrl";
import { useNavigation } from "@react-navigation/native";

const VerifyNumber = (props) => {
  const [number, setNumber] = useState("");

  const [error, setError] = useState("");
  const [otp, setOtp] = useState("");


  const [phoneNumber, setphoneNumber] = useState('');//le numero qui sera renseigner pour verification
  const phoneInput = useRef(null);

  const navigation = useNavigation();


  const Verify = () => {

  
 // pour la validation et la getion d'erreur pour eviter les champs vide  lors de la sousmission 

    if (phoneNumber === "") {
      setError("Please fill in the form correctly");
    }

    // let number = {
    //  number:number
   
    // };
    axios
      .post(`${baseURL}verifyNumber/mobile`, { phoneNumber })
      .then((res) => {
        if (res.status == 200) {
          Toast.show({
            topOffset: 60,
            type: "success",
            text1: "Registration Succeeded",
            text2: "Please Login into your account",
          });
          //permet le passage en parametre d'une data entre 2 ecrans pour reutilisation
          navigation.navigate('Otp',{
            phoneNumber: phoneNumber
          });
          //permet le passage en parametre d'une data entre 2 ecrans pour reutilisation
          setTimeout(() => {
            props.navigation.navigate("Otp");
          }, 500);
        }
      })
      .catch((error) => {
        Toast.show({
          topOffset: 60,
          type: "error",
          text1: "Something went wrong",
          text2: "Please try again",
        });
      });
    
  };

  return (
    <KeyboardAwareScrollView
      viewIsInsideTabBar={true}
      extraHeight={200}
      enableOnAndroid={true}
    >
      <FormContainer title={"Verify your Number"}>
        {/* <Input
          placeholder={"Email"}
          name={"number"}
          id={"number"}
          onChangeText={(text) => setNumber(text)}
        /> */}



<View style={styles.container}>
      <PhoneInput
       placeholder={"Phone Number"}
       name={"phoneNumber"}
       id={"phoneNumber"}
       keyboardType={"numeric"}
       onChangeText={(text) => setphoneNumber(text)}
       ref={phoneInput}
       defaultValue={phoneNumber}
       defaultCode="IN"
       layout="first"
       withShadow
       autoFocus
       containerStyle={styles.phoneContainer}
       textContainerStyle={styles.textInput}
       onChangeFormattedText={text => {
         setphoneNumber(text);
        }}
      /></View>
      
       
       
        <View style={styles.buttonGroup}>
          {error ? <Error message={error} /> : null}
        </View>
        <View>
          <EasyButton large primary onPress={() => Verify()}>
            <Text style={{ color: "white" }}>Send </Text>
          </EasyButton>
        </View>
     
        <View>
        
        </View>
      </FormContainer>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  buttonGroup: {
    width: "80%",
    margin: 10,
    alignItems: "center",
  },

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  phoneContainer: {
    width: '80%',
    height: 50,
          borderRadius: 20,
          backgroundColor: 'white',
          margin: 10,
          borderRadius: 20,
          padding: 10,
          borderWidth: 2,
          borderColor: 'orange',
          justifyContent: 'center'
  },
  button: {
    marginTop: 30,
    width: '75%',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'green',
  },
  textInput: {
    paddingVertical: 0,
  }
});

export default VerifyNumber;
