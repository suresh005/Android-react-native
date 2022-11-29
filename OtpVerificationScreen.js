import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  TextInput,
  AsyncStorage,
  Pressable,
  Image
} from "react-native";
import img from "../Assets/images/try.png";

import axios from 'axios';
class OTPVerfication extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: props.phone,
      code: '',
    };
  }

  async verify() {

    const { phone } = this.props.route.params;
    console.log(phone);
    await axios.post("https://api.schedula.in/v5/user/verify-otp", {
      phone,
      otp: this.state.code
    }, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
    })
      .then((response) => {
        alert(response.data.message);
        console.log(response.data);
        if (response.data.status === true) {
          AsyncStorage.setItem('tocken', response.data.accessToken);
          this.props.navigation.navigate("HomeScreen", {
            phone: this.state.phone,
          });
        }
        else {
          this.props.navigation.navigate('OtpVerificationScreen');
        }

      })

      .catch((error) => {
        alert(error.toString())
        console.log('err', error);
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);

        }
      })
  }

  render() {

    return (
      <View style={styles.container}>
        <Image style={styles.logo} source={img} />
        <Text style={styles.welcome}>Verification</Text>
        <Text style={styles.welcome1}>We will send a  One Time Password</Text>
        <Text style={styles.welcome2}>on Your Phone Number</Text>
        <TextInput
          style={{
            width: '90%',
            backgroundColor: '#fff',
            padding: 15,
            marginBottom: 10,
            bottom: 45,
            borderRadius: 35,
            color: '#000'
          }}
          placeholderTextColor="#ADDFFF"
          placeholder="_ _ _ _ _"
          keyboardType={"numeric"}
          onChangeText={code => this.setState({ code: code })}
        />
        <View style={styles.btnContiner}>
          <Pressable
            onPress={() => this.verify(this.state.phone)}

            style={({ pressed }) => ({
              backgroundColor: pressed ? '#D7A9E3FF' : '#D7A9E3FF',
              borderRadius: 10,
              width: 120,
              height: 40
            })}>

            {({ pressed }) => (
              <Text style={styles.Pressable_text}>
                {pressed ? 'Verify OTP!' : 'Verify OTP'}
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
    justifyContent: "center",
    alignItems: "center",
    //bottom: 66,
    backgroundColor: '#89ABE3FF'
  },
  Pressable_text: {
    fontSize: 14,
    color: '#ffff',
    textAlign: 'center',
    padding: 12,

  },
  logo: {
    flexDirection: 'row',
    width: '30%',
    height: '15%',
    bottom: 65
  },

  text: {
    fontSize: 24,
    color: '#000',
    textAlign: 'center',
    padding: 20
  },
  welcome: {
    fontSize: 40,
    textAlign: "center",
    margin: 15,
    bottom: 55,
    fontWeight: 'bold',
    color: '#fff',
  },
  welcome1: {
    fontSize: 15,
    textAlign: "center",
    margin: 15,
    bottom: 55,
    fontWeight: 'bold',
    color: '#fff',
  },
  welcome2: {
    fontSize: 15,
    textAlign: "center",
    margin: 15,
    bottom: 75,
    fontWeight: 'bold',
    color: '#fff',
  },
  input: {
    width: "90%",
    backgroundColor: "skyblue",
    padding: 15,
    marginBottom: 10,
    bottom: 45
  },
  btnContiner: {
    flexDirection: "row",
    justifyContent: "center",
    width: "80%"
  },
  btn: {
    backgroundColor: "orange",
    padding: 15,
    width: "45%",
    marginLeft: 10
  },
  btntext: { fontSize: 16, textAlign: "center" },

});
export default OTPVerfication;