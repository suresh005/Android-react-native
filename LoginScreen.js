import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  AsyncStorage,
  Image
} from 'react-native';
import axios from 'axios';
import Phone from 'react-native-phone-input';
import lo from '../Assets/images/loginlogo.png'
//import AsyncStorage from '@react-native-community/async-storage';

class PhoneInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: '',
    };
    this.login = this.login.bind(this);
  }
  componentDidMount() {

    const { navigation } = this.props.navigation;
  }

  async login() {
    await axios
      .post(
        'https://api.schedula.in/v5/user/send-otp',
        {
          phone: this.state.phone,
        },
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            phone: this.state.phone,
          }),
        },
      )
      .then((response) => {
        alert(response.data.message);
        if (response.data.status === true) {
          AsyncStorage.setItem('phoneNumber', this.state.phone);
          console.log(this.state.phone);
          this.props.navigation.navigate('OtpVerificationScreen', {
            phone: this.state.phone,

          });
        } else {
          this.props.navigation.navigate(' LoginScreen');
        }
      })
      .catch((error) => {
        alert(error.toString());
        console.log('err', error);
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.logo} source={lo} />
        <Text style={styles.welcome}>
          Meet With Your Doctor{' '}
        </Text>
        <TextInput
          style={{
            width: '90%',
            backgroundColor: '#000',
            padding: 15,
            marginBottom: 10,
            borderRadius: 35,
            color: '#000'
          }}
          placeholderTextColor="#ADDFFF"
          placeholder="Enter your mobile number"
          onChangeText={(phone) => this.setState({ phone: phone })}
        />
        <View style={styles.btnContiner}>
          <Pressable
            onPress={() => this.login(this.state.phone)}
            style={({ pressed }) => ({
              backgroundColor: pressed ? '#D7A9E3FF' : '#D7A9E3FF',
              borderRadius: 10,
              width: 120,
              height: 40
            })}>
            {({ pressed }) => (
              <Text style={styles.Pressable_text}>
                {pressed ? 'Send OTP!' : 'Send OTP'}
              </Text>
            )}
          </Pressable>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // bottom: 66,
    // top:55,
    backgroundColor: '#89ABE3FF'
  },
  Pressable_text: {
    fontSize: 14,
    color: '#ffff',
    textAlign: 'center',
    padding: 12,

  },
  row2: {
    fontSize: 10,
    fontWeight: 'bold',
    bottom: 5,
    textAlign: 'center',
    //paddingBottom:75,
    //paddingTop:54,

    // padding: 20,
    color: '#46C7C7'
  },

  text: {
    fontSize: 24,
    color: '#000',
    textAlign: 'center',
    padding: 20,
  },
  welcome: {
    fontSize: 30,
    textAlign: 'center',
    margin: 10,
    fontWeight: 'bold',
    color: '#fff',
    bottom: 15
  },
  input: {
    width: '90%',
    backgroundColor: 'white',
    padding: 15,
    marginBottom: 10,
    color: '#fff'
  },
  btnContiner: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '60%',
    top: 5,
    borderRadius: 15
  },
  btn: {
    backgroundColor: 'orange',
    padding: 15,
    width: '45%',
    marginLeft: 10,
  },
  btntext: { fontSize: 16, textAlign: 'center' },
  logo: {
    flexDirection: 'row',
    width: '60%',
    height: '40%',
    bottom: 65
  },
});
export default PhoneInput;
