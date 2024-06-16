import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Image, StyleSheet, TouchableHighlight } from 'react-native';
import SignUp from './components/SignUp';
import LogIn from './components/Login';
import { mainColor } from '../../constants/theme';

const Tab = createMaterialTopTabNavigator();

const Auth = () => {
  return (
    <>
            <TouchableHighlight style={styles.imageContainer}  underlayColor='none'>
      <Image 
              source={require('../../assets/logo.png')}
      style={styles.image} resizeMode='contain'/>

        </TouchableHighlight>
      <Tab.Navigator
      
        screenOptions={{
          headerStyle: { backgroundColor: 'transparent' }, // Set header background color to transparent
          headerTitle: '', // Remove header title
          tabBarStyle: {
            backgroundColor: 'white', // Background color of the tab bar
            paddingVertical:5,
            borderTopWidth: 0, // Remove the top border to eliminate the shadow
          elevation: 0, // Remove shadow on Android
          shadowOpacity: 0, // Remove shadow on iOS
          },
          tabBarActiveTintColor: '#5E3D1E',// Color of the active tab
          tabBarInactiveTintColor: 'gray', // Color of inactive tabs
          tabBarIndicatorStyle: {
            backgroundColor: '#5E3D1E', // Color of the underline indicator
            height:3,
            borderRadius:10
          },
        }}
        >
        <Tab.Screen name="LogIn" component={LogIn} />
        <Tab.Screen name="SignUp" component={SignUp} />
      </Tab.Navigator>
    </>
  );
};

export default Auth;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems:'center',
      width: '100%',
      backgroundColor:"white",
      justifyContent: 'center',
    },
    input: {
      backgroundColor :'#ddd',
      width: '100%',
      margin: 10,
      borderRadius: 5,
      height : 50,
      paddingHorizontal: 20,
      fontSize : 16,
  
  
    },
    error: {
      color: 'red',
      marginTop: 8,
      marginBottom: 15,
      fontSize:12,
  
    },
    scrollview: {
      alignItems: 'center',
      justifyContent:'center',
      marginTop: 100,
      width:"100%",
      paddingHorizontal:30
    
    },
    imageContainer : {
        width:"100%",
        backgroundColor:mainColor,
        alignItems:"center",
        paddingVertical:50,
      },
    image : {
      width: 180,
      height:180,
      alignItems:"center",
      justifyContent:"center"
    },
    bigText :{
      fontSize : 20,
      fontWeight:'bold'
    },
    footerContainer : {
      flexDirection:'row',
      marginBottom: 20,
      marginTop:117
    },
    secondoryText : {
      color:'#777',
      fontSize:12,
    },
    goSignInButton:  {
      marginLeft:10
    },
    buttonText :{ 
      color:'#494554',
      fontWeight: 'bold'
    },
    mainButton : {
      backgroundColor: '#484bf2',
      width:'100%',
      paddingHorizontal : 20,
      paddingVertical:15,
      borderRadius:5,
      color:'white',
      alignItems:'center'
    },
    textStart : {
      textAlign:'left',
      width:400,
      paddingHorizontal:35,
      marginBottom:10
    }
  });


