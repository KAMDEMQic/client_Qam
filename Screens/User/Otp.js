import React, { useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import FormContainer from "../../Shared/Form/FormContainer";
import Input from "../../Shared/Form/Input";
import Error from "../../Shared/Error";
import Toast from "react-native-toast-message";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import EasyButton from "../../Shared/StyledComponents/EasyButton";
// import { useHistory } from "react-router-dom";
 import { useNavigation, useRoute } from "@react-navigation/native";



import axios from "axios";
import baseURL from "../../assets/common/baseUrl";

const Otp = (props) => {
  const route = useRoute();
  // const classes = useStyles();
  const [otp, setOtp] = useState("");
  // const history = useHistory();;
  // const [phoneNumber, setphoneNumber] = useState("");
  //  const { phoneNumber } = useState("");
  const { phoneNumber } = route.params;
  // const navigation = useNavigation();
  // const phoneNumber = navigation.setParams('phoneNumber');
  const userphoneNumber = phoneNumber;

    

  const [error, setError] = useState("");

  const register = () => {
    if (otp === "") {
      setError("Please fill in the form correctly");
    }

    // let user = {
    //   email: email
   
    // };
    
    

    axios.post(`${baseURL}VerifyNumber/otp`,{ otp , userphoneNumber}).then((res) => {

        if (res.data.resp.valid) {
          Toast.show({
            topOffset: 60,
            type: "success",
            text1: "Registration Succeeded",
            text2: "Please Login into your account",
          });
          setTimeout(() => {
            props.navigation.navigate("serviceForm");
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

  // const handleChange = (event) => {
  //   setOtp(event.target.value);
  // };
console.log(userphoneNumber);
console.log(phoneNumber);

  return (
    <KeyboardAwareScrollView
      viewIsInsideTabBar={true}
      extraHeight={200}
      enableOnAndroid={true}
    >
      <FormContainer title={"Enter the code"}>

      <Text>
        {/* {phoneNumber} */}
        {/* Your phone is {JSON.stringify(phoneNumber)} you have received a code insert it  */}
       {` (${phoneNumber}) you have received a code insert it s.`}
     </Text>
     <View>
        <Input
          placeholder={"enter the code you received"}
          name={"otp"}
          id={"otp"}
          keyboardType={"numeric"}
          onChangeText={(text) => setOtp(text)}
        />
      
      </View>
       
        <View style={styles.buttonGroup}>
          {error ? <Error message={error} /> : null}
        </View>
        <View>
          <EasyButton large primary onPress={() => register()}>
            <Text style={{ color: "white" }}>Verify</Text>
          </EasyButton>
        </View>
        <View>
          <EasyButton
            large
            secondary
            onPress={() => props.navigation.navigate("Login")}
          >
            <Text style={{ color: "white" }}>Back to Login</Text>
          </EasyButton>
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
  message: {
    fontSize: 16,
    paddingHorizontal: 30,
  },
});

export default Otp;
