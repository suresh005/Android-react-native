import React from 'react';
import { Image, StyleSheet, Text, View, Button, Dimensions, } from 'react-native';
// import {images} from '../Constant';
import logo from '../Assets/images/logo.png';
import AsyncStorage from '@react-native-community/async-storage';


class SplashScreen extends React.Component {


  async componentDidMount() {

    const tocken = await AsyncStorage.getItem('tocken')


    setTimeout(() => {

      if (tocken) {
        this.props.navigation.navigate('HomeScreen');
      }
      else {
        this.props.navigation.navigate('LoginScreen');
      }

    }, 2500);
  }

  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.logo} source={logo} />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    alignItems: 'center',


  },

  logo: {

    width: '60%',
    height: '9%',
  },
});

export default SplashScreen;
