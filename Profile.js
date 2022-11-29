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
import profie from '../Assets/images/name.png';
import loginlogo from '../Assets/images/loginlogo.png'

class LoginScreen extends Component {
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
      this.setState({ emailErrors: 'Name field can not be empty' });
    } else {
      console.log('2');
      validation = true;
      this.setState({ emailErrors: '' });
    }

    if (validation) {
      this.props.navigation.navigate('HomeScreen');
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
        <Image style={styles.logo} source={profie} />
        <Text style={styles.Text1}>Enter Your Name </Text>

        {/* <Icon name="user"  size={25} /> */}
        <TextInput
          style={{
            height: 40,
            width: '85%',
            borderColor: 'black',
            borderBottomWidth: 1,
            margin: 15,
            //borderRadius:10,
            borderColor: '#000',
            borderWidth: 2,

            marginBottom: 40,
          }}
          placeholder="Enter Your Name"
          keyboardType="number-pad"
          underlineColorAndroid="transparent"
          onChangeText={(email) => this.setState({ email })}
        />

        <Text style={{ color: 'red', marginLeft: 20 }}>
          {this.state.emailErrors}
        </Text>




        <TouchableHighlight
          style={[styles.buttonContainer, styles.loginButton]}
          onPress={() => this.login()}>
          <Text style={styles.loginText}>Go -></Text>
        </TouchableHighlight>




      </View>
    );
  }
}
export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#6D7B8D',
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
    width: 50,
    height: 50,
    marginRight: 160,
  },
  Text1: {
    color: '#000',
    marginTop: 20,
    fontSize: 20,
    marginRight: 80,
  },
  Text2: {
    color: '#000',
    fontSize: 40,
    fontWeight: 'bold',
    marginRight: 270,
  },

  inputs1: {
    height: 40,
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
    backgroundColor: '#1569C7',
  },
  loginText: {
    color: 'white',
  },
});
