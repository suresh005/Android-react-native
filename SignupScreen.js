import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  Image,
  Alert,
} from 'react-native';
// import axios from 'axios';
// import {Form, TextValidator} from 'react-native-form-validator';
// import Icon from 'react-native-vector-icons/FontAwesome';
import logo from '../Assets/images/logo.png';

class SignupScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      emailErrors: '',
      password: '',
      paasworErrors: '',
    };
    this.login = this.login.bind(this);
  }

  async login() {
    let validation = false;
    if (this.state.email == '') {
      console.log('1');
      this.setState({ emailErrors: 'email field can not be empty' });
    } else {
      console.log('2');
      validation = true;
      this.setState({ emailErrors: '' });
    }
    if (this.state.password == '') {
      console.log('3');
      validation = false;
      this.setState({ paasworErrors: 'password field can not be empty' });
    } else {
      validation = true;
      console.log('4');
      this.setState({ paasworErrors: '' });
    }
    if (validation) {
      this.props.navigation.navigate('HomePage');
    }

    // this.props.navigation.navigate("HomePage");

    // if (!this.state.email || !this.state.password) return;

    // console.log('-called');
    // await axios.post('https://admin.dev.fds.plts.in/api/login',{
    //   email: this.state.email,
    //   password: this.state.password
    // },{
    //   headers:{
    //     Authorization: 'Bearer  19e81b7d71530dac6bfe44452d5d802e1d41ca546681cc6805b7e367079c1e64',
    //     "Content-Type": "application/x-www-form-urlencoded",
    //     Accept: "application/json"
    //   }
    // })
    // .then((response) => {
    //         // response.data is the users
    //         console.log('rew',response);
    //    if(response.status ===200){
    //       this.props.navigation.navigate("HomePage");
    //    }

    // })
    // .catch((error) => {
    //   console.log('err',error);
    //   if (error.response) {
    //     console.log(error.response.data);
    //     console.log(error.response.status);
    //     console.log(error.response.headers);
    //   }
    //error.message is the error message
    //  dispatch(fetchUsersFailure(error.message))
    // }
    //)
  }

  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.logo} source={logo} />
        <Text style={styles.Text1}>Proceed With Your </Text>
        <Text style={styles.Text2}>Login </Text>
        {/* <Icon name="user"  size={25} /> */}
        <TextInput
          style={{
            height: 40,
            width: '85%',
            borderColor: 'black',
            borderBottomWidth: 1,
            marginBottom: 20,
          }}
          placeholder="Email"
          keyboardType="email-address"
          underlineColorAndroid="transparent"
          onChangeText={(email) => this.setState({ email })}
        />

        <Text style={{ color: 'red', marginLeft: 20 }}>
          {this.state.emailErrors}
        </Text>

        <TextInput
          style={{
            height: 40,
            width: '85%',
            borderColor: 'black',
            borderBottomWidth: 1,
            marginBottom: 20,
          }}
          placeholder="Password"
          secureTextEntry={true}
          underlineColorAndroid="transparent"
          onChangeText={(password) => this.setState({ password })}
        />

        <Text style={{ color: 'red', marginLeft: 20 }}>
          {this.state.paasworErrors}
        </Text>

        <TouchableHighlight
          style={[styles.buttonContainer, styles.loginButton]}
          onPress={() => this.login()}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableHighlight>

        <TouchableHighlight
          style={styles.buttonContainer}
          onPress={() => this.onClickListener('restore_password')}>
          <Text>Forgot your password?</Text>
        </TouchableHighlight>

        <TouchableHighlight
          style={styles.buttonContainer}
          onPress={() => this.onClickListener('register')}>
          <Text>Register</Text>
        </TouchableHighlight>
      </View>
    );
  }
}
export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  inputContainer: {
    borderColor: '#000',
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    borderBottomWidth: 1,
    width: 250,
    height: 45,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    position: 'absolute',
    left: 20,
  },
  logo: {
    width: 200,
    height: 200,
    marginRight: 160,
  },
  Text1: {
    color: '#000',
    fontSize: 30,
    marginRight: 120,
  },
  Text2: {
    color: '#000',
    fontSize: 40,
    fontWeight: 'bold',
    marginRight: 270,
  },

  inputs1: {
    height: 50,
    marginRight: 300,
    fontWeight: 'bold',
    flex: 1,
    borderColor: '#000',
  },
  inputs: {
    height: 45,
    marginRight: 270,
    fontWeight: 'bold',
    flex: 1,
    borderColor: '#000',
  },
  inputIcon: {
    width: 30,
    height: 30,
    marginLeft: 15,
    justifyContent: 'center',
  },
  buttonContainer: {
    height: 45,

    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    width: 250,
  },
  loginButton: {
    backgroundColor: '#C70039',
  },
  loginText: {
    color: 'white',
  },
});
