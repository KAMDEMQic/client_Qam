import React from "react"
import { createStackNavigator } from '@react-navigation/stack'

import Login from '../Screens/User/Login'
import Register from '../Screens/User/Register'
import UserProfile from '../Screens/User/UserProfile'
import forgetPassword from "../Screens/User/forgetPassword"
import changePassword from "../Screens/User/changePassword"
import ProductForm from "../Screens/User/ProductForm"
import serviceForm from "../Screens/User/serviceForm"





const Stack = createStackNavigator();

function MyStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name="Login"
                component={Login}
                options={{
                    headerShown: false
                }}
            />
             <Stack.Screen 
                name="Register"
                component={Register}
                options={{
                    headerShown: false
                }}
            />
             <Stack.Screen 
                name="User Profile"
                component={UserProfile}
                options={{
                    headerShown: false
                }}
            />


        <Stack.Screen 
                name="Forget password"
                component={forgetPassword}
                options={{
                    headerShown: false
                }}
            />

              <Stack.Screen 
                name="changePassword"
                component={changePassword}
                options={{
                    headerShown: false
                }}
            />


          <Stack.Screen 
                name="ProductForm"
                component={ProductForm}
                options={{
                    headerShown: false
                }}
            />  
            
          <Stack.Screen 
                name="serviceForm"
                component={serviceForm}
                options={{
                    headerShown: false
                }}
            />  


         
             
             

        </Stack.Navigator>
     

    )
}

export default function UserNavigator() {
    return <MyStack />
}