import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Head from "./Routes/Head";
// import Mensajes from "./Routes/Mensajes";
// import Reportes from "./Routes/Reportes";
import { Provider } from 'mobx-react';
import Login from "./Routes/Login";
import userStore from "../store";
import React from "react";
import Mensajes from "./Routes/Mensajes";

const Stack = createNativeStackNavigator();

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'; 

const Tab = createBottomTabNavigator();
export default function App() {  
return (
  <Provider store={userStore}>
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
      headerShown: false}}>
      <Stack.Screen
        options={{ headerShown: false}} 
        name="Login"
        component={Login}/>
      <Stack.Screen
        options={{ headerShown: false}} 
        name="Head"
        component={Head}/>
      <Stack.Screen
        options={{ headerShown: false}} 
        name="Mensajes"
        component={Mensajes}/>
    </Stack.Navigator>
  </Provider>

);
}