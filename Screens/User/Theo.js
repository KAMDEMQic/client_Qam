import React, { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, Button, Dimensions, Keyboard } from "react-native";
import FormContainer from "../../Shared/Form/FormContainer";
import Input from "../../Shared/Form/Input";
import Error from "../../Shared/Error";
import Toast from "react-native-toast-message";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import EasyButton from "../../Shared/StyledComponents/EasyButton";
import Icon from "react-native-vector-icons/FontAwesome"

// import { useHistory } from "react-router-dom";

const inputs = Array(6).fill('');//on declare un input de type  tableau pour les inputs otp chaque chiffre aura son carreau
let newInputIndex = 0;

import axios from "axios";
import baseURL from "../../assets/common/baseUrl";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
// import { handleInputChange } from "react-select/dist/declarations/src/utils";
const isObjValid = (obj) => {
 return Object.values(obj).every(val => val.trim())
}


const Otp = (props) => {
  const input = useRef();
  // const index = useRef();

  const [OTP, setOTP] = useState({1: '', 2: '', 3: '', 4:'', 5: '', 6:''});
  const [nextInputIndex, setNextInputIndex] = useState(0);


  const handleChangeText = (text,index) =>{ 
    const newOTP = {...OTP };
    newOTP[index] = text;
    setOTP(newOTP);
    
    const lastInputIndex = inputs.length -  1;
    if(!text) newInputIndex = index ===  0 ? 0 : index - 1;
    else newInputIndex = index === lastInputIndex ? lastInputIndex
    : index + 1;
    setNextInputIndex(newInputIndex);
  };
  // console.log(OTP);


  const [error, setError] = useState(""); 

useEffect(() =>{
  input.current.focus();
},[nextInputIndex])

   const submitOTP = () => {
     Keyboard.dismiss();
     if(isObjValid(OTP)){
       let val = '';
       Object.values(OTP).forEach(v => {
         val += v
       } )
     }
   };
  return (
    <KeyboardAwareScrollView
      viewIsInsideTabBar={true}
      extraHeight={200}
      enableOnAndroid={true}
    >
              {/* <FormContainer title={"Enter Code"}> */}

        
       
      <Text style={styles.heading}>
        Please Verify your phone, code een sent to your phone number.
      </Text>
      <View  style={styles.otpContainer}>
        {inputs.map((inp, index) => {
          return <TextInput
          placeholder="0"
          value={OTP[index]}
          onChangeText={(text) => handleChangeText(text,index)}
          style={styles.inputContainer}
           key={index.toString()}
          keyboardType={"numeric"} 
          maxLength={1}
          ref={nextInputIndex === index ? input: null}

           />

        })}
        </View>
        <View style={styles.buttonGroup}>
          <Text>
          {error ? <Error message={error} /> : null}
          </Text>
        </View>
          <TouchableOpacity  style={styles.IconSUB} onPress={submitOTP}>
          {/* <EasyButton large primary onPress={() => register()}> */}
          <Icon style={{color: "white"}} size={24} name="check" />
       
     
          </TouchableOpacity>
        <View>
          <EasyButton
            large
            secondary
            onPress={() => props.navigation.navigate("Login")}
          >
            <Text style={{ color: "white" }}>Back to Login</Text>
          </EasyButton>
        </View>
        {/* </FormContainer> */}
    </KeyboardAwareScrollView>
  );
};
const {width}=Dimensions.get('window')
const inputWidth = Math.round(width / 8)

const styles = StyleSheet.create({
  Container:{
    flex: 1,
    justifyContent: 'center',
  },
  heading:{
     color:'#808080',
     textAlign: 'center',
     marginBottom:15,
  },
  buttonGroup: {
    width: "80%",
    margin: 10,
    alignItems: "center",
  },
  message: {
    fontSize: 16,
    paddingHorizontal: 30,
    textAlign: 'center',
  },
  inputContainer:{
      width : inputWidth,
      height: inputWidth,
      borderWidth: 2,
      borderColor: '#808080',
      textAlign: 'center',
     justifyContent: 'center',
    alignItems: 'center',
    // justifyContent: 'space-between',

  },
  inputOtp:{
    fontSize: 25,
    backgroundColor:'#5cb85c', 

  },
  otpContainer:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: inputWidth / 2,
    marginTop: 8,
  },
  spaceotp:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: inputWidth / 2,
  },
  IconSUB:{
    alignSelf: 'center',
    padding:15,
    backgroundColor:'#5cb85c', 
    color: "white",
    borderRadius:50,
    marginTop:15,
  }
});

export default Otp;
