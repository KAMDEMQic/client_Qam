import React, { useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import FormContainer from "../../Shared/Form/FormContainer";
import Input from "../../Shared/Form/Input";
import Error from "../../Shared/Error";
import Toast from "react-native-toast-message";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import EasyButton from "../../Shared/StyledComponents/EasyButton";

import axios from "axios";
import baseURL from "../../assets/common/baseUrl";

const changePassword = (props) => {

  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  // const { id } = useParams();

  const changePassword = () => {
    if ( password === "") {
      setError("Please fill in the form correctly");
    }

    let user = {
      password: password
    };
    axios
      .put(`${baseURL}users/resetP/${id}`, user)
      .then((res) => {
        if (res.status == 200) {
          Toast.show({
            topOffset: 60,
            type: "success",
            text1: "Registration Succeeded",
            text2: "Please Login into your account",
          });
          // setTimeout(() => {
          //   props.navigation.navigate("Login");
          // }, 500);
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
     


      // axios
      // .get(`${baseURL}users/resetP/${id}`)
      // .then((res) => {
      //     setPassword(res.data);
      //     // setProductFilter(res.data);
      //     // setLoading(false);
      // })

  };

  return (
    <KeyboardAwareScrollView
      viewIsInsideTabBar={true}
      extraHeight={200}
      enableOnAndroid={true}
    >
      <FormContainer title={"change password"}>
    
        <Input
          placeholder={"Password"}
          name={"password"}
          id={"password"}
          secureTextEntry={true}
          onChangeText={(text) => setPassword(text)}
        />
        <View style={styles.buttonGroup}>
          {error ? <Error message={error} /> : null}
        </View>
        <View>
          <EasyButton large primary onPress={() => changePassword()}>
            
            <Text style={{ color: "white" }}>Enregistrer</Text>
          </EasyButton>
        </View>
        <View>
          <EasyButton
            large
            secondary
            onPress={() => props.navigation.navigate("User Profile")}
          >
            <Text style={{ color: "white" }}>Mon Profil</Text>
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
});

export default changePassword;
