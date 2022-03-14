import React, { useState } from "react";
import { View, Text, StyleSheet, Button,ProgressBarAndroid } from "react-native";
import { Progress } from 'native-base';
import FormContainer from "../../Shared/Form/FormContainer";
import Input from "../../Shared/Form/Input";
import Error from "../../Shared/Error";
import Toast from "react-native-toast-message";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import EasyButton from "../../Shared/StyledComponents/EasyButton";
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from "axios";
import baseURL from "../../assets/common/baseUrl";
import Textarea from 'react-native-textarea';

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


const AddOption = (props) => {
  // state = {
  // userValues:[],
  // selectedValue:''
  // }
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState();
  const [categories, setCategories] = useState([]);

  const [error, setError] = useState("");




  useEffect(() => {


    AsyncStorage.getItem("jwt")
        .then((res) => {
            setToken(res)
        })
        .catch((error) => console.log(error))

    // Categories
    axios
        .get(`${baseURL}options/AllOptions`)
        .then((res) => setCategories(res.data))
        .catch((error) => alert("Error to load categories"));
        // console.log(categories);


      (async () => {
        if (Platform.OS !== "web") {
            const {
                status,
            } = await ImagePicker.requestCameraPermissionsAsync();
            if (status !== "granted") {
                alert("Sorry, we need camera roll permissions to make this work!")
            }
        }
    })();

    return () => {
        setCategories([]);
        
         console.log(categories.length);

    }
}, [])



  const register = () => {
    if (description === "" || price === "" ) {
      setError("Please fill in the form correctly");
    }

    let user = {
      description: description,
      price: price,
    

    };
    axios
      .post(`${baseURL}options/InsertOPtions`, user)
      .then((res) => {
        if (res.status == 200) {
          Toast.show({
            topOffset: 60,
            type: "success",
            text1: "Registration Succeeded",
            text2: "Please Login into your account",
          });
          setTimeout(() => {
            props.navigation.navigate("AddOption");
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
      <FormContainer title={"ADD Options"}>

      <View style={styles.example}>
        <Text>  1/2</Text>
        <ProgressBarAndroid   size="sm"  mb={4}
          styleAttr="Horizontal"
          indeterminate={false}
          progress={0.5}
        />

        
      </View>

      <View style={styles.pic}>

<Item picker>
   <Picker
       mode="dropdown"
       iosIcon={<Icon color={"#007aff"} name="arrow-down" />}
       style={{ width: undefined }}
       placeholder="Select your Category"
       selectedValue={category}
       placeholderStyle={{ color: "#007aff"}}
       placeholderIconColor="#007aff"
       // onValueChange={(e) => [setPickerValue(e), setCategory(e)]}
       onValueChange={(e) => setCategory(e)}

   >
       {categories.map((c) => {
return <Picker.Item key={c.id} label={c.name} value={c.name} />;
})}
   </Picker>
</Item> 
</View>

      

    
        <Input
          placeholder={"price"}
          name={"price"}
          id={"price"}
          keyboardType={"numeric"}
          onChangeText={(text) => setPrice(text)}
        />
<View style={styles.container}>
  <Textarea
    containerStyle={styles.textareaContainer}
    style={styles.textarea}
    name={"description"}
    id={"description"}
    onChangeText={(text) => setDescription(text)}
    maxLength={120}
    placeholder={'Enter the Description of options'}
    placeholderTextColor={'#c7c7c7'}
    underlineColorAndroid={'transparent'}
  />
</View>



    




        <View style={styles.buttonGroup}>
          {error ? <Error message={error} /> : null}
        </View>
         
     <View style={styles.options}>
         
    

          <EasyButton
            large
            secondary
            onPress={() => props.navigation.navigate("serviceForm")}
          >
            <Text style={{ color: "white" }}>Vos services</Text>
          </EasyButton>



          <EasyButton large primary onPress={() => register()}>
            <Text style={{ color: "white" }}>Register</Text>
          </EasyButton>
        </View>
      </FormContainer>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 30,
      justifyContent: 'center',
      alignItems: 'center',
    },
    textareaContainer: {
      height: 180,
      padding: 5,
      backgroundColor: '#F5FCFF',
    },
    textarea: {
      textAlignVertical: 'top',  // hack android
      height: 170,
      fontSize: 14,
      color: '#333',
    },

          
    pic:{

        width: '80%',
        height: 50,
              borderRadius: 20,
              backgroundColor: 'white',
              margin: 10,
              borderRadius: 20,
              padding: 10,
              borderWidth: 2,
              borderColor: 'orange',
              justifyContent: 'center'},
  });

export default AddOption;