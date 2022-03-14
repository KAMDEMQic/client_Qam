import React, { useState,useRef  } from "react";
import { View, Text, StyleSheet, Button,ProgressBarAndroid } from "react-native";
import { Progress } from 'native-base';
import FormContainer from "../../Shared/Form/FormContainer";
import Input from "../../Shared/Form/Input";
import Error from "../../Shared/Error";
import Toast from "react-native-toast-message";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import EasyButton from "../../Shared/StyledComponents/EasyButton";
import PhoneInput from 'react-native-phone-number-input';

import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from "axios";
import baseURL from "../../assets/common/baseUrl";

import { Item, Picker} from 'native-base'
import Icon from 'react-native-vector-icons/FontAwesome'

const countries = require("../../assets/countries.json");

const city = require("../../assets/city.json");


import { isValidEmail, isValidObjField, updateError } from '../../assets/methods';

const validationSchema = Yup.object({
  name: Yup.string()
    .trim()
    .min(3, 'Invalid name!')
    .required('Name is required!'),
  email: Yup.string().email('Invalid email!').required('Email is required!'),
  password: Yup.string()
    .trim()
    .min(8, 'Password is too short!')
    .required('Password is required!'),
  confirmPassword: Yup.string().equals(
    [Yup.ref('password'), null],
    'Password does not match!'
  ),
});


const Register = (props) => {
  const [phoneNumber, setphoneNumber] = useState('');
  const phoneInput = useRef(null);

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");

  const [jobUser, setJobUser] = useState("");
  const [adress, setAdress] = useState("");

  const [error, setError] = useState("");
  // const [city, setCity] = useState("");



//   const searchCity = (text) => {
//     if (text == "") {
//         setProductFilter(city)
//     }
//     setProductFilter(
//         productList.filter((i) => 
//             i.name.toLowerCase().includes(text.toLowerCase())
//         )
//     )
// }

  const register = () => {
    if (email === "" || name === "" || phone === "" || password === ""  || jobUser === "" || adress === "") {
      setError("Please fill in the form correctly");
    }

    let user = {
      name: name,
      email: email,
      password: password,
      ConfirmPassword :ConfirmPassword,
      phone: phone,
      jobUser:  jobUser,
      adress: adress,
      isAdmin: false,

    };
    axios
      .post(`${baseURL}users/register`, user)
      .then((res) => {
        if (res.status == 200) {
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
  

  return (
    <KeyboardAwareScrollView
      viewIsInsideTabBar={true}
      extraHeight={200}
      enableOnAndroid={true}
    >
      <FormContainer title={"Register"}>

      <View style={styles.example}>
        <Text>  1/2</Text>
        <ProgressBarAndroid   size="sm"  mb={4}
          styleAttr="Horizontal"
          indeterminate={false}
          progress={0.5}
        />

        
      </View>
      <View style={styles.pic}>
      <Item picker  style={{
            borderColor: 'transparent', 
            justifyContent:"center", 
            alignSelf:"center",
            width: "80%",
            marginTop: 6
            }}>
                    <Picker
                        mode="dropdown"
                        iosIcon={<Icon name="arrow-down" color={"#007aff"} />}
                        style={{ width: undefined }}
                        selectedValue={jobUser}
                        placeholder="Select your job"
                        placeholderStyle={{ color: '#007aff' }}
                        placeholderIconColor="#007aff"
                        onValueChange={(e) => setJobUser(e)}
                    >
                        {countries.map((c) => {
                            return <Picker.Item 
                                    key={c.code} 
                                    label={c.name}
                                    value={c.name}
                                    />
                        })}
                    </Picker>
                </Item>
                </View>
        <Input
          placeholder={"Email"}
          name={"email"}
          id={"email"}
          onChangeText={(text) => setEmail(text.toLowerCase())}
        />
        <Input
          placeholder={"Name"}
          name={"name"}
          id={"name"}
          onChangeText={(text) => setName(text)}
        />
{/* 
        <Input
          placeholder={"district,city,country"}
          name={"adress"}
          id={"adress"}
          onChangeText={(text) => setAdress(text)}
        /> */}




{/* 
<PhoneInput
        placeholder={"Phone Number"}
        name={"phone"}
        id={"phone"}
        keyboardType={"numeric"}
        onChangeText={(text) => setPhone(text)}
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
      /> */}
      
      <PhoneInput
             placeholder={"Phone Number"}
             name={"phone"}
             id={"phone"}
             keyboardType={"numeric"}
             onChangeText={(text) => setPhone(text)}
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
      />

<View style={styles.pic}>
 



 <Item picker>
       <Picker
         mode="dropdown"
         iosIcon={<Icon name="arrow-down" color={"#007aff"} />}
         style={{  height: 50, width: 150 }}
         selectedValue={adress}
         placeholder="Select your country"
         placeholderStyle={{ color: "#007aff" }}
         placeholderIconColor="#007aff"
         onValueChange={(e) => setAdress(e)}
       >
         {city.map((c) => {
     return <Picker.Item key={c.code} label={c.name} value={c.name} />;
   })}
       </Picker>
     </Item>
 </View>
        <Input
          placeholder={"Password"}
          name={"password"}
          id={"password"}
          secureTextEntry={true}
          onChangeText={(text) => setPassword(text)}
        />
      


       
      <Input
          placeholder={"ConfirmPassword"}
          name={"ConfirmPassword"}
          id={"ConfirmPassword"}
          secureTextEntry={true}
          onChangeText={(text) => setConfirmPassword(text)}
        />
    



{/* 
              <View style={{
            borderColor: 'transparent', 
            justifyContent:"center", 
            alignSelf:"center",
            width: "80%",
            marginTop: 6
            }}>
          <Picker
            mode="dropdown"
            iosIcon={<Icon color={"#007aff"} name="arrow-down" />}
            style={{ justifyContent: "center",
                    alignSelf: "center",
                    paddingTop: 7,
                    paddingBottom: 7,
                    paddingLeft: 20,
                    borderRadius: 40,
                    width: "80%",
                    marginBottom: 15,
                    backgroundColor: "rgba(102,102,102,0.6)" }}
            placeholder="Select your Category"
            selectedValue={pickerValue}
            placeholderStyle={{ color: "#007aff" }}
            placeholderIconColor= "#007aff"
            onValueChange={itemValue => 
                [setPickerValue(itemValue), setCategory(itemValue)]}
          >
            {/* {categories.map((c) => {
                console.log("pickerValue = " + pickerValue);
              return <Picker.Item key={c._id} label={c.name} value={c._id} />;
            })} */}

           {/* {categories.map((c) => {
            return <Picker key={c.id} label={c.name} value={c.name} />;
           })}
          </Picker>
        </View> */} 


        <View style={styles.buttonGroup}>
          {error ? <Error message={error} /> : null}
        </View>
         
     <View style={styles.options}>
         
    
          <EasyButton
            large
            secondary
            onPress={() => props.navigation.navigate("Login")}
          >
            <Text style={{ color: "white" }}>Back to Login</Text>
          </EasyButton>

          <EasyButton
            large
            secondary
            onPress={() => props.navigation.navigate("serviceForm")}
          >
            <Text style={{ color: "white" }}>Vos services</Text>
          </EasyButton>

{/* 
          <EasyButton
            large
            secondary
            onPress={() => props.navigation.navigate("ImageScreen")}
          >
            <Text style={{ color: "white" }}>DropDownPicker</Text>
          </EasyButton> */}


          <EasyButton large primary onPress={() => register()}>
            <Text style={{ color: "white" }}>Register</Text>
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
  options:{

    //pour aligner les buttons sur la meme ligne
    flexDirection: 'row',
    // alignContent: 'space-around',
    justifyContent: 'space-between',
            // "space-around",   "space-between",
},
inputgauche:{
    marginRight: 8,
},
pic:{
  // flex: 1,
  // paddingTop: 40,
  // alignItems: "center",
  width: '80%',
  height: 50,
  // backgroundColor: "#f5f5dc",
        borderRadius: 20,
        backgroundColor: 'white',
        margin: 10,
        borderRadius: 20,
        padding: 10,
        borderWidth: 2,
        borderColor: 'orange',
        justifyContent: 'center'},
example: {
  marginVertical: 24,
  padding: 10,
  margin: 10,
  fontSize:50,

},
pro:{
  margin: 10,
  width: '80%',
  height: 50,

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

export default Register;