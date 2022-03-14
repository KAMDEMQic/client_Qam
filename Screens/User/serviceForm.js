import React, { useState, useEffect } from "react"
import { 
    View, 
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    Platform
} from "react-native"
import { Item, Picker } from "native-base"
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
import DropDownPicker from 'react-native-dropdown-picker';

const serviceForm = (props) => {
    
    const [pickerValue, setPickerValue] = useState();
    const [storeName, setstoreName] = useState();
    const [name, setName] = useState();
    const [price, setPrice] = useState();
    const [description, setDescription] = useState();
    const [image, setImage] = useState();
    const [mainImage, setMainImage] = useState();
    const [category, setCategory] = useState();
    const [categories, setCategories] = useState([]);
    const [token, setToken] = useState();
    const [err, setError] = useState();
    const [countInStock, setCountInStock] = useState();
    const [adress, setAdress] = useState(0);
    const [isFeatured, setIsFeature] = useState(false);
    const [richDescription, setRichDescription] = useState();
    const [numReviews, setNumReviews] = useState(0);
    const [item, setItem] = useState(null);

    useEffect(() => {


        AsyncStorage.getItem("jwt")
            .then((res) => {
                setToken(res)
            })
            .catch((error) => console.log(error))

        // Categories
        axios
            .get(`${baseURL}categories`)
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



    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1
        });

        if (!result.cancelled) {
            setMainImage(result.uri);
            setImage(result.uri);
        }
    };

    const addProduct = () => {
        if (
            name == "" ||
            storeName == "" ||
            price == "" ||
            description == "" ||
            category == "" ||
            countInStock == "" ||
            adress == ""
        ) {
            setError("Please fill in the form correctly")
        }

        let formData = new FormData();
        const newImageUri = "file:///" + image.split("file:/").join("");

        formData.append("image", {
            uri: newImageUri,
            type: mime.getType(newImageUri),
            name: newImageUri.split("/").pop()
        });
        formData.append("name", name);
        formData.append("storeName", storeName);
        formData.append("price", price);
        formData.append("description", description);
        formData.append("category", category);
        formData.append("countInStock", countInStock);
        formData.append("richDescription", richDescription);
        formData.append("adress", adress);
        formData.append("numReviews", numReviews);
        formData.append("isFeatured", isFeatured);

        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`
            }
        }

        // if(item !== null) {
        //     axios
        //     .put(`${baseURL}products/${item.id}`, formData, config)
        //     .then((res) => {
        //         if(res.status == 200 || res.status == 201) {
        //             Toast.show({
        //                 topOffset: 60,
        //                 type: "success",
        //                 text1: "Product successfuly updated",
        //                 text2: ""
        //             });
        //             setTimeout(() => {
        //                 props.navigation.navigate("Products");
        //             }, 500)
        //         }
        //     })
        //     .catch((error) => {
        //         Toast.show({
        //             topOffset: 60,
        //                 type: "error",
        //                 text1: "Something went wrong",
        //                 text2: "Please try again"
        //         })
        //     })
        // } else {
            axios
            .post(`${baseURL}products`, formData, config)
            .then((res) => {
                if(res.status == 200 || res.status == 201) {
                    Toast.show({
                        topOffset: 60,
                        type: "success",
                        text1: "New Product added",
                        text2: "",
                    });
                    // setTimeout(() => {
                    //     console.log(res.data);
                    //     props.navigation.navigate("Products");
                    // }, 500);
                    console.log(res.data);
                }
            })
            .catch((error) => {
                Toast.show({
                    topOffset: 60,
                        type: "error",
                        text1: "Something went wrong",
                        text2: "Please try again"
                });
            });
        // } 
    }

    return (
       <FormContainer title="Service">
           <View style={styles.imageContainer}>
               <Image style={styles.image} source={{uri: mainImage}}/>
               <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
                   <Icon style={{ color: "white"}} name="camera"/>
               </TouchableOpacity>
           </View>
           {/* <View style={styles.label}>
               <Text style={{ textDecorationLine: "underline"}}>Marques</Text>
           </View> */}

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
            placeholder="storeName"
            name="storeName"
            id="storeName"
            value={storeName}
            onChangeText={(text) => setstoreName(text)}
           />
           {/* <View style={styles.label}>
               <Text style={{ textDecorationLine: "underline"}}>Nom</Text>
           </View> */}
           <Input 
            placeholder="Name"
            name="name"
            id="name"
            value={name}
            onChangeText={(text) => setName(text)}
           />
            {/* <View style={styles.label}>
               <Text style={{ textDecorationLine: "underline"}}>Prix</Text>
           </View> */}

           <View style={styles.options}>
           <Inputt 
            placeholder="Price"
            name="price"
            id="price"
            value={price}
            keyboardType={"numeric"}
            onChangeText={(text) => setPrice(text)}
           />
           
{/* 
           <View style={styles.label}>
               <Text style={{ textDecorationLine: "underline"}}>Quantite en Stock</Text>
           </View> */}
           
           <Inputt  
            placeholder="Stock"
            name="stock"
            id="stock"
            value={countInStock}
            keyboardType={"numeric"}
            onChangeText={(text) => setCountInStock(text)}
           />
               </View>
           
           
           
      
{/*        
            <View style={styles.label}>
               <Text style={{ textDecorationLine: "underline"}}>Description</Text>
           </View> */}
     
     <View style={styles.options}>

           <Inputt 
            placeholder="Description"
            name="description"
            id="description"
            value={description}
            onChangeText={(text) => setDescription(text)}

           />



          <Inputt 
            placeholder="Description"
            name="description"
            id="description"
            value={description}
            onChangeText={(text) => setDescription(text)}

           />  
        </View>
    




{/* <DropDownPicker
        style={{ marginVertical: 10 }}
        // selectedValue={{ selectedLanguage }}
        placeholder="Select your Category"
        selectedValue={category}
        placeholderStyle={{ color: "#007aff"}}
        // placeholderIconColor="#007aff"
        // onValueChange={(e) => [setPickerValue(e), setCategory(e)]}
        onValueChange={(e) => setCategory(e)}
      >
        {categories.map((c) => (
          <Picker.Item  key={c.id} label={c.name} value={c.name} />
        ))}
    </DropDownPicker> */}




<EasyButton
            large
            secondary
            onPress={() => props.navigation.navigate("AddOption")}
          >
            <Text style={{ color: "white" }}>AddOption</Text>
          </EasyButton>

             
           {err ? <Error message={err} /> : null}
           <View style={styles.buttonContainer}>
               <EasyButton
                large
                primary
                onPress={() => addProduct()}               
               >
                   <Text style={styles.buttonText}>Confirm</Text>
               </EasyButton>
           </View>
           </FormContainer>     

    
    )
}

const styles = StyleSheet.create({
    label: {
        width: "80%",
        marginTop: 10
    },
    buttonContainer: {
        width: "80%",
        marginBottom: 80,
        marginTop: 20,
        alignItems: "center"
    },
    buttonText: {
        color: "white"
    },
    imageContainer: {
        width: 200,
        height: 200,
        borderStyle: "solid",
        borderWidth: 8,
        padding: 0,
        justifyContent: "center",
        borderRadius: 100,
        borderColor: "#E0E0E0",
        elevation: 10
    },
    image: {
        width: "100%",
        height: "100%",
        borderRadius: 100
    },
    imagePicker: {
        position: "absolute",
        right: 5,
        bottom: 5,
        backgroundColor: "grey",
        padding: 8,
        borderRadius: 100,
        elevation: 20
    },

    options:{
        flexDirection: 'row',
        // alignContent: 'space-around',
        justifyContent: 'space-between',
                // "space-around",   "space-between",




    },
    inputgauche:{
        marginRight: 8,
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
})

export default serviceForm;