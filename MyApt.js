import React from 'react';
import { Image, StyleSheet, Text, View, Button, Dimensions, ActivityIndicator, FlatList, Pressable } from 'react-native';
// import {images} from '../Constant';
import logo from '../Assets/images/logo.png';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import back from '../Assets/images/back3.png'
import { ImageBackground } from 'react-native';
// import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

class MyApt extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

      isLoading: true,
      text: '',
      data: [],
    };
    this.arrayholder = [];
  }

  async componentDidMount() {
    const tocken = await AsyncStorage.getItem('tocken')
    console.log(tocken);
    await axios
      .get(
        'https:/api.schedula.in/v5/user/appointments',

        {
          headers: {
            Authorization: ' Bearer ' + tocken,
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({

          }),
        },
      )
      .then((response) => {

        this.setState({
          isLoading: false,
          data: response.data.data

        },

        )

      })
      .catch((error) => {
        alert(error.toString());
        console.error(error);
      });

  }
  itemSeparator = () => {
    return (
      <View
        style={{
          height: 1.5,
          marginBottom: 12,
          width: '100%',

        }}
      />
    );
  };

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, paddingTop: 20 }}>
          <ActivityIndicator />
        </View>
      )
    }
    return (



      <View style={styles.MainContainer}>
        <View style={{ backgroundColor: '#ADDFFF', width: "100%", Top: 40, borderBottomRightRadius: 800, height: 129 }}>
          <Text style={{ color: '#fff', fontSize: 30, fontWeight: 'bold', top: 20 }}> your previous Appointment</Text>
        </View>

        <FlatList
          data={this.state.data}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={this.itemSeparator}
          renderItem={({ item }) => {
            return (
              <View style={{
                backgroundColor: '#82CAFF', width: 300,
                height: 150, borderWidth: 1,
                borderRadius: 15, marginBottom: 20,
              }}>
                <Text style={{ alignItems: 'center', textAlign: 'center', fontWeight: 'bold', color: 'white', }}>MyAppointment</Text>
                <Text
                  style={styles.row}

                > clinicName
                  :    {item.clinicName}

                </Text>
                <Text style={styles.row}>
                  Doctor name
                  :
                  {item.practitionerName}
                </Text>
                <Text style={styles.row}>
                  consultationType
                  :
                  {item.consultationType}
                </Text>
                <Text style={styles.row}>
                  reportingTime
                  :
                  {item.reportingTime}
                </Text>
                <Text style={styles.row}>
                  Appointment status
                  :
                  {item.status}
                </Text>

              </View>


            )
          }

          }

          style={{ marginTop: 10 }}
        />
      </View>

    );
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    justifyContent: 'center',
    flex: 1,
    //margin: 3,
    borderWidth: 2,
    backgroundColor: '#fff',
    alignContent: 'center',
    alignItems: 'center',


  },
  container: {
    flex: 1,

    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    alignItems: 'center',


  },
  loader: {
    marginTop: 10,
    alignItems: 'center',
  },

  row: {
    fontSize: 10,
    padding: 5,
    fontWeight: "bold",
    color: 'white'

  },

  textInput: {
    textAlign: 'center',
    height: 42,
    borderWidth: 5,
    borderColor: '#009688',
    borderRadius: 8,
    backgroundColor: '#FFFF',
  },

  logo: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 400,
    height: 90,
  },
});

export default MyApt;
