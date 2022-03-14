import React, { useState, useEffect } from "react";
import { 
    View, 
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    Platform,ProgressBarAndroid
} from "react-native"
// import { Item, Picker } from "react-native";
// import { Picker } from "@react-native-picker/picker";

import FormContainer from "../../Shared/Form/FormContainer"
import Inputt from "../../Shared/Form/Inputt"
import Input from "../../Shared/Form/Input"

import EasyButton from "../../Shared/StyledComponents/EasyButton"
import Error from "../../Shared/Error"
import Icon from "react-native-vector-icons/FontAwesome"
import Toast from "react-native-toast-message"
import AsyncStorage from '@react-native-async-storage/async-storage';
import baseURL from "../../assets/common/baseUrl"
import axios from "axios"
import * as ImagePicker from "expo-image-picker"
import mime from "mime";
// import React, { useState, useEffect } from "react";
import { Picker } from "@react-native-picker/picker";

// Functional Component
export default function PlayerRegistration() {


    
  // Picker.item List
  const [categories, setcategories] = useState([]);
  // Selected Item variable
  const [selectedValue, setSelectedValue] = useState("");
    //   const [categories, setcategories] = useState([]);



  // Fetch Function
  const getListOfPlayersList = async () => {

        // Categories
        axios
            .get(`${baseURL}categories`)
            .then((res) => setcategories(res.data))
            .catch((_error) => alert("Error to load categories"));
    // Incase if you need static json could use this
    // return [
    //   { idsport: 1, sportname: "Badminton" },
    //   { idsport: 2, sportname: "Golf" }
    // ];
  };

  // ComponentDidmount or ComponentDidUpdate Equivalent
  useEffect(() => {
    getListOfPlayersList();
  }, []);


  const renderSportsList = () => {
    return categories.map((c) => {
      return <Picker.item 
      key={key} 

      label={c.name}
      value={c.name} />;
    });
  };

  // JSX
  return (
    <View style={styles.container}>
      <Picker
        selectedValue={selectedValue}
        style={{height: 40, width: 150}}
        onValueChange={(itemValue, itemIndex) => {
          setSelectedValue(itemValue);
        }}
      >
       {renderSportsList()}
     </Picker>
     </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 40,
      alignItems: 'center',
    },
  });
//   export default PlayerRegistration;
