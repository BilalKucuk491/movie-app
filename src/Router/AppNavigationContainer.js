import React from 'react'
import { NavigationContainer, StackActions } from '@react-navigation/native';
import {createStackNavigator} from "@react-navigation/stack";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";

import Index from "../Screens/Index.js";
import View from '../Screens/View.js';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStack = ()=> {
  return(
    <Stack.Navigator initialRouteName='index'>
      <Stack.Screen options={{headerShown:false}} name='index' component={Index}/>
      <Stack.Screen options={{headerShown:false}} name='view' component={View}/>
    </Stack.Navigator>
  )
}

const AppTabs = ()=> {
  return (
      <Tab.Navigator>
      <Tab.Screen name='Home' component={HomeStack} options={{
        headerShown:false,
        tabBarIcon:({color,size})=>(
          <Icon name='home' color={color} size={size} />
        )
      }} />
    </Tab.Navigator>
  )
}


const AppNavigationContainer = () => {
  return <AppTabs/>
}



export default AppNavigationContainer;