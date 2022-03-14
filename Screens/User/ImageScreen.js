import DropDownPicker from 'react-native-dropdown-picker';
import React, { useState } from "react";

import { View, Text, StyleSheet, Button,ProgressBarAndroid,ActivityIndicator } from "react-native";

 class ImageScreen extends React.Component {  
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Source Listing",
      headerStyle: {backgroundColor: "#000"},
      headerTitleStyle: {textAlign: "center",flex: 1}
     };
    };
    constructor(props) {
     super(props);
     this.state = {
       loading: true,
       dataSource:[]
      };
    }
   
  async componentDidMount() {
 
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      const responseJson = await response.json();
      // console.log(responseJson);
      this.setState({
        Loading: false,
        data: responseJson,
      }, () => {
        // In this block you can do something with new state.
        this.arrayholder = responseJson;
      });
    } catch (error) {
      console.error(error);
    }
  }
 
  GetFlatListItem(name) {
    Alert.alert(name);
  }
 
  searchData(text) {
    const newData = this.arrayholder.filter(item => {
      const itemData = item.name.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1
    });
 
    this.setState({
      data: newData,
      text: text
      })
    }
 
    itemSeparator = () => {
      return (
        <View
          style={{
            height: .5,
            width: "100%",
            backgroundColor: "#000",
          }}
        />
      );
    }
 
    render() {
      if (this.state.loading) {
        return (
          <View style={{flex: 1, paddingTop: 20}}>
            <ActivityIndicator />
          </View>
        );
      }
   
      return (
   
        <View style={styles.MainContainer}>
   
        <TextInput 
         style={styles.textInput}
         onChangeText={(text) => this.searchData(text)}
         value={this.state.text}
         underlineColorAndroid='transparent'
         placeholder="Search Here" />
 
        <FlatList
          data={this.state.data}
          keyExtractor={ (item, index) => index.toString() }
          ItemSeparatorComponent={this.itemSeparator}
          renderItem={({ item }) => <Text style={styles.row}
          onPress={this.GetFlatListItem.bind(this, item.name)} >{item.name}</Text>}
          style={{ marginTop: 10 }} />
 
      </View>
    );
  }
}
 
const styles = StyleSheet.create({
 
  MainContainer: {
    justifyContent: 'center',
    flex: 1,
    margin: 5,
 
  },
 
  row: {
    fontSize: 18,
    padding: 12
  },
 
  textInput: {
 
    textAlign: 'center',
    height: 42,
    borderWidth: 1,
    borderColor: '#009688',
    borderRadius: 8,
    backgroundColor: "#FFFF"
 
  }
});
export default ImageScreen;