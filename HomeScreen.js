import axios from 'axios';
import React, { Component } from 'react';
import { Searchbar } from 'react-native-paper';
import prof from "../Assets/images/prof.png";

//import AsyncStorage from '@react-native-community/async-storage';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Text,
  StyleSheet,
  View,
  TextInput,
  Image,
  button,
  Pressable,
  AsyncStorage,
  BackHandler
} from 'react-native';
import { Button, Linking } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { ConfirmDialog } from 'react-native-simple-dialogs';




export default class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      phone: props.phone,
      isLoading: true,
      text: '',
      data: [],
    };
    this.arrayholder = [];
  }
  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.backPressed);
  }
  backPressed = () => {
    let routeName = this.props.route.name;
    console.log("route is :  " + routeName);
    console.log(this.props.navigation)
    if (this.props.navigation.isFocused()) {
      console.log("ROUTE :  " + routeName);
      Alert.alert(
        "Exit App",
        "Do you want to exit?",
        [
          {
            text: "No",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          { text: "Yes", onPress: () => BackHandler.exitApp() }
        ],
        { cancelable: false }
      );
      return true;
    } else {
      return false;
    }
  };

  async componentDidMount() {


    BackHandler.addEventListener("hardwareBackPress", this.backPressed);
    await axios
      .get('https://api.schedula.in/v5/practitioners')
      .then((response) => {

        this.setState(
          {
            isLoading: false,
            data: response.data.data,
          },
          () => {
            this.arrayholder = response.data.data;
          },
        );
      })
      .catch((error) => {
        alert(error.toString());
        console.error(error);
      });
    this.forceUpdate()
  }
  async forceUpdate() {
    await axios
      .get('https://api.schedula.in/v5/api-version')
      .then((response) => {
        this.setState(
          {
            isLoading: false,
            version: response.data.data
          }
        )
      })
    let updateversion = this.state.version.map((updateversion) => updateversion.value)
    if (updateversion[0] == 3.3) {
      return (
        console.log(updateversion)
      )

    } else {
      Alert.alert(
        "Update Your App",
        "your app has been expiry",
        [

          { text: "Update", onPress: () => { Linking.openURL('https://play.google.com/store/apps/details?id=com.schedula') } }
        ],
        { cancelable: false }
      );
      return true;
      console.log(updateversion)
      console.log('versopn has been exirey')

    }


  }
  updateversion() {
    console.log('hlo')

  }

  GetFlatListItem(id) {



    this.props.navigation.navigate('MyAppointment', {

      id: id,
      phone: this.state.phone,
    });
  }

  searchData(text) {
    const newData = this.arrayholder.filter((item) => {
      const itemData = item.name.toLowerCase();
      const textData = text.toLowerCase();
      return itemData.indexOf(textData) > -1;
    });

    this.setState({
      data: newData,
      text: text,
    });
  }

  itemSeparator = () => {
    return (
      <View
        style={{
          height: 2.5,
          width: '100%',


        }}
      />
    );
  };
  renderFooter = () => {
    return this.state.isLoading ? (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#00ff00" />
      </View>
    ) : null;
  };
  renderHeader = () => {
    return ((
      <Searchbar
        style={styles.textInput}
        onChangeText={(text) => this.searchData(text)}
        value={this.state.text}
        underlineColorAndroid="transparent"
        placeholder="Find Your Doctor Here"
        placeholderTextColor="#fff"
      />
    ): null);
  };

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, paddingTop: 20 }}>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <View style={styles.MainContainer}>
        <FlatList
          numColumns={2}
          data={this.state.data}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={this.itemSeparator}
          renderItem={({ item }) => (
            <View style={{
              alignItems: 'center',
              justifyContent: 'center',

              borderWidth: 1,
              borderRadius: 25,
              backgroundColor: '#F0F0F0',
              borderColor: '#F0F0F0',
              width: 150,
              height: 150,
              margin: 12,
              top: 22,

            }}>
              <Image style={styles.logo} source={prof} />
              <Text
                style={styles.row}
              >
                {item.name}
              </Text>
              <Text
                style={styles.row1}
              >
                ({item.specialisation})
              </Text>
              <Text
                style={styles.row2}
              >{item.consultingLocations.length > 0 ?
                item.consultingLocations.map((item) => {
                  return (
                    <View  >
                      <View >
                        <Text style={styles.row2}>{item.address}, </Text>

                      </View>
                    </View>
                  )
                }) : null
                }

              </Text>

              <Pressable
                onPress={this.GetFlatListItem.bind(this, item.id)}
                style={({ pressed }) => ({
                  backgroundColor: pressed ? '#841584' : '#841584',
                  borderRadius: 5,
                  width: 120,
                  height: 30,
                  textAlign: 'center',
                  justifyContent: 'center',
                })}>
                {({ pressed }) => (
                  <Text style={styles.Pressable_text}>
                    {pressed ? 'Book Appointment' : 'Book Appointment'}
                  </Text>
                )}
              </Pressable>


            </View>

          )}
          ListHeaderComponent={this.renderHeader}
          ListFooterComponent={this.renderFooter}
          style={{ marginTop: 10 }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    alignItems: 'center', textAlign: "center",
    justifyContent: 'center',
    flex: 1,

    backgroundColor: '#F5F5F5'
  },
  loader: {
    marginTop: 10,
    alignItems: 'center',
  },


  row: {
    fontSize: 13,
    fontWeight: 'bold',

    bottom: 30,
    color: '#7D0552',
    textAlign: 'center'
  },
  row1: {
    fontSize: 9,
    fontWeight: 'bold',
    bottom: 25,

    color: '#7D0552'
  },
  row2: {
    fontSize: 10,
    fontWeight: 'bold',
    bottom: 5,
    textAlign: 'center',

    color: '#46C7C7'
  },
  Pressable_text: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    padding: 2,

  },

  logo: {
    flexDirection: 'row',
    width: '28%',
    height: '28%',
    bottom: 35,

  },
  textInput: {
    textAlign: 'center',
    top: 5,
    width: '100%',

    borderColor: '#009688',
    borderRadius: 8,
    backgroundColor: '#46C7C7',
  },
});
