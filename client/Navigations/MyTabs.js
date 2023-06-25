import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from "../Screens/HomeScreen";
import SettingsScreen from "../Screens/SettingsScreen";
import ProfileScreen from "../Screens/ProfileScreen";
import About from "../Components/About";
import ContactUs from "../Components/ContactUs";
import Banks from "../Components/Banks";
import Cinema from "../Components/Cinema";
import DashBoard from "../Components/DashBoard";
import Education from "../Components/Education";
import Fashion from "../Components/Fashion";
import Footer from "../Components/Footer";
import Health from "../Components/Health";
import HomeServices from "../Components/HomeServices";
import Hospitals from "../Components/Hospitals";
import Maintenance from "../Components/Maintenance";
import MaintenancePayment from "../Components/MaintenancePayment";
import Markets from "../Components/Markets";
import Restaurants from "../Components/Restaurants";

import SignIn from "../Components/SignIn";
import SignUp from "../Components/SignUp";
import Sports from "../Components/Sports";
import Stores from "../Components/Stores";
import Transportation from "../Components/Transportation";
import Shopping from "../Components/Shopping";

export const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function MyTabs() {

  return (
    <Tab.Navigator>

      {/* Home Tab  */}
      <Tab.Screen name="home" options={{
        headerShown: false,
        // tabBarStyle: {backgroundColor: '#112D4E'},
        tabBarIcon: ({ color, size }) => <Ionicons name="home-outline" size={size} color="#112D4E" />
      }} >
        {() => (
          <Stack.Navigator screenOptions={{
            headerTintColor: 'white',
            headerStyle: {
              backgroundColor: '#112D4E',
            }
          }}>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Banks" component={Banks} />
            <Stack.Screen name="Cinema" component={Cinema} />
            <Stack.Screen name="Education" component={Education} />
            <Stack.Screen name="Fashion" component={Fashion} />
            <Stack.Screen name="Health" component={Health} />
            <Stack.Screen name="Home Services" component={HomeServices} />
            <Stack.Screen name="Hospitals" component={Hospitals} />
            <Stack.Screen name="Maintenance" component={Maintenance} />
            <Stack.Screen name="Markets" component={Markets} />
            <Stack.Screen name="Restaurants" component={Restaurants} />
            <Stack.Screen name="Shopping" component={Shopping} />
            <Stack.Screen name="Sports" component={Sports} />
            <Stack.Screen name="Stores" component={Stores} />
            <Stack.Screen name="Transportation" component={Transportation} />
            <Stack.Screen name="Maintenance Payment" component={MaintenancePayment} />
          </Stack.Navigator>
        )}
      </Tab.Screen>

      <Tab.Screen name="about us" options={{
        headerShown: false,
        // tabBarStyle: {backgroundColor: '#112D4E'},
        tabBarIcon: ({ color, size }) => <Ionicons name="code-slash-outline" size={size} color="#112D4E" />
      }}>
        {() => (
          <Stack.Navigator screenOptions={{
            headerTintColor: 'white',
            headerStyle: {
              backgroundColor: '#112D4E',
            }
          }}>
            <Stack.Screen name="About" component={About} />
          </Stack.Navigator>
        )}
      </Tab.Screen>

      {/* Settings Tab  */}
      <Tab.Screen name="settings" options={{
        headerShown: false,
        // tabBarStyle: {backgroundColor: '#112D4E'},
        tabBarIcon: ({ color, size }) => <Ionicons name="settings-outline" size={size} color="#112D4E" />
      }}>
        {() => (
          <Stack.Navigator screenOptions={{
            headerTintColor: 'white',
            headerStyle: {
              backgroundColor: '#112D4E',
            }
          }}>
            <Stack.Screen name="Settings" component={SettingsScreen} />
            <Stack.Screen name="Contact us" component={ContactUs} />
            <Stack.Screen name="Maintenance Payment" component={MaintenancePayment} />
          </Stack.Navigator>
        )}
      </Tab.Screen>

      {/* Profile Tab  */}
      <Tab.Screen name="profile" options={{
        headerShown: false,
        // tabBarStyle: {backgroundColor: '#112D4E'},
        tabBarIcon: ({ color, size }) => <Ionicons name="person-outline" size={size} color="black" />
      }}>
        {() => (
          <Stack.Navigator screenOptions={{
            headerTintColor: 'white',
            headerStyle: {
              backgroundColor: '#112D4E'
            }
          }}>
            <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen name="Dashboard" component={DashBoard} />
            <Stack.Screen name="Sign up" component={SignUp} />
            <Stack.Screen name="Sign in" component={SignIn} />
          </Stack.Navigator>
        )}
      </Tab.Screen>

    </Tab.Navigator>
  );
}