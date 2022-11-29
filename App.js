import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SplashScreen, LoginScreen, SignupScreen, HomeScreen, OtpVerificationScreen, profileScreen, MyAppointment, MyApt } from './App/Screens';
import {
  createBottomTabNavigator
} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
function getHeaderTitle(route) {
  const routeName = route.state
    ? route.state.routes[route.state.index].name
    : route.params?.screen || 'Home'

  switch (routeName) {
    case 'Home':
      return 'Home'
    case 'Profile':
      return 'Profile'
  }
}
function MainTTabNavigator() {


  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: '#fff',
        style: {
          backgroundColor: '#841584',
          fontWeight: 'bold',
          borderColor: "#fff",
          borderWidth: 2,

        }
      }}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName
          if (route.name == 'HomeScreen') {
            iconName = 'ios-home'
          } else if (route.name == 'MyApt') {
            iconName = 'ios-person'
          }
          else if (route.name == 'MyAppointment') {
            iconName = 'ios-home'
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        }
      })}>
      <Tab.Screen name='HomeScreen' component={HomeScreen} />
      <Tab.Screen name='MyApt' component={MyApt} />
      {/* <Tab.Screen name='MyAppointment' component={MyAppointment} /> */}
    </Tab.Navigator>
  )
}

function MainTabNavigator() {


  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: '#fff',
        style: {
          backgroundColor: '#841584',
          fontWeight: 'bold',
          borderColor: "#fff",
          borderWidth: 2,

        }
      }}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName
          if (route.name == 'HomeScreen') {
            iconName = 'ios-home'
          } else if (route.name == 'MyApt') {
            iconName = 'ios-person'
          }
          else if (route.name == 'MyAppointment') {
            iconName = 'ios-home'
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        }
      })}>
      <Tab.Screen name='HomeScreen' component={HomeScreen} />
      <Tab.Screen name='MyApt' component={MyApt} />
      {/* <Tab.Screen name='MyAppointment' component={MyAppointment} /> */}
    </Tab.Navigator>
  )
}

function MainStackNavigator() {





  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          gestureEnabled: false,
          headerShown: false,
          headerStyle: {
            backgroundColor: '#101010'
          },
          headerTitleStyle: {
            fontWeight: 'bold'
          },
          headerTintColor: '#ffd700',
          headerBackTitleVisible: false

        }}

        initialRouteName="SplashScreen">
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="SignupScreen" component={SignupScreen} />
        <Stack.Screen name="HomeScreen" component={MainTabNavigator}
          options={({ route }) => ({
            headerTitle: getHeaderTitle(route)
          })} />
        <Stack.Screen name="OtpVerificationScreen" component={OtpVerificationScreen} />
        <Stack.Screen name="profileScreen" component={profileScreen} />
        <Stack.Screen name="MyAppointment" component={MyAppointment} options={({ route }) => ({
          headerTitle: getHeaderTitle(route)
        })} />
        <Stack.Screen name="MyApt" component={MyApt} />
      </Stack.Navigator>
    </NavigationContainer>
  );

}


export default MainStackNavigator

