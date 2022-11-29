
import React from 'react';
import { View, FlatList, Text, SafeAreaView, Pressable, Button, alart, Image } from 'react-native';
import axios from 'axios';
import { ScrollView, TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import AsyncStorage from '@react-native-community/async-storage';
import prfoile from '../Assets/images/doctorprofile.png'
import Icon from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import { colors, ThemeConsumer } from 'react-native-elements';
import { Alert } from 'react-native';
import { withNavigation } from 'react-navigation';
import { ActivityIndicator } from "react-native";
//import { parse } from '@babel/core';
// import { parse } from '@babel/core';

const Tab = createMaterialBottomTabNavigator();

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: props.phone,
      id: props.id,
      data: [],
      SelectLocations: null,
      lasttime: '',
      selectItem: null,
      SelectslotId: null,
      disable: '',
      currenttime: '22:30 ',
      newtime: '01:31 PM',
      markedDate: moment(new Date()).format("HH:mm:ss"),
      timepassed: false,
      isLocationSelected: '',
      doctorid: null,
      isLoading: false
    };


  }
  async componentDidMount() {



    console.log(this.props.route.name)
    var that = this;

    var date = new Date();

    var hours = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
    var am_pm = date.getHours() >= 12 ? "PM" : "AM";
    hours = hours < 10 ? "0" + hours : hours;
    var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
    var seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();


    that.setState({

      date:
        hours + ':' + minutes + ':' + '00' + ' ' + am_pm,

    });
    const { id } = this.props.route.params;


    await axios
      .get('https://api.schedula.in/v5/practitioner/' + id + '/sessions')
      .then((response) => {
        console.log(this.state.doctorid)
        this.setState({
          isLoading: false,
          data: response.data.data,
          doctorid: this.props.route.params.id,

        });

      })
      .catch((error) => {
        alert(error.toString());
        console.error(error);
      });
  }


  SelectLocation = (item) => {

    this.setState({ SelectLocations: item });
    if (this.state.SelectLocations === item.id) {
      this.setState({ SelectLocation: item })
    }


    if (this.state.selectItem === item.id) {
      this.setState({ selectItem: null })
      this.setState({ SelectLocations: null });
      this.setState({ isLocationSelected: 'no' });

    } else {
      this.setState({ selectItem: item.id });
      this.setState({ SelectLocations: item });


    }




  }
  SelectSlot = (item) => {
    console.log(item)

    this.setState({ SelectslotId: item })
    console.log(this.state.SelectslotId)
    console.log(item)
    if (item === this.state.SelectslotId) {
      this.setState({ SelectslotId: null });
    }


  }
  async booking() {
    if (this.state.SelectslotId === null) {
      alert("please select slot")

    }


    else {




      const phoneNumber = await AsyncStorage.getItem('phoneNumber')

      await axios

        .post(
          'https://api.schedula.in/v5/appointment/create',
          {
            slotId: this.state.SelectslotId,
            phone: phoneNumber
          },
          {
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              slotId: this.state.SelectslotId,

            }),
          },
        )



        .then((response) => {
          console.log(response.data.message);
          alert(response.data.message);
          this.setState({ SelectslotId: null });
          console.log("SelectslotId")
          console.log(this.state.SelectslotId)

        })

        .catch((error) => {
          alert(error.toString());
          this.setState({ SelectslotId: null });
          console.log('err', error);
          if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
            this.setState({ SelectslotId: null });
          }
        });
    }

  }

  _renderLocation = (consultantLocations) => {

    console.log(this.state.isLocationSelected);
    return (


      <View style={{ alignItems: 'center', textAlign: "center", top: 12 }} >

        <Text style={{ fontWeight: 'bold', }}>Please select Any location </Text>
        <FlatList

          horizontal={true}

          data={consultantLocations}
          renderItem={({ item }) => {


            if (this.state.selectItem === item.id) {
              return (

                <View colors={['#f4c4f3', '#fc67fa',]}
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: 20,
                    borderWidth: 1,
                    borderRadius: 15,
                    backgroundColor: '#3EA99F',
                    borderColor: '#FEFCFF',
                    width: 120,
                    height: 70,
                    margin: 9,
                    padding: 2,
                  }}>



                  <Text onPress={this.SelectLocation.bind(this, item)} style={{ fontSize: 12, fontFamily: "Cochin", alignContent: 'center', textAlign: 'center', color: "white", fontWeight: "bold" }}>
                    {item.name}
                  </Text>
                  <Text onPress={this.SelectLocation.bind(this, item)} style={{ fontSize: 11, fontWeight: 'bold', alignContent: 'center', textAlign: 'center', color: "white", fontWeight: "bold" }}>
                    {item.address}
                  </Text>



                </View>

              )

            } else {
              return (
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: 20,
                    borderWidth: 1,
                    borderRadius: 15,
                    borderColor: '#FEFCFF',
                    width: 120,
                    height: 70,
                    margin: 9,
                    padding: 2,

                    backgroundColor: '#48bdd7'
                  }}>



                  <Text onPress={this.SelectLocation.bind(this, item)} style={{ fontSize: 12, fontFamily: "Cochin", alignContent: 'center', textAlign: 'center', color: 'white' }}>
                    {item.name}
                  </Text>
                  <Text onPress={this.SelectLocation.bind(this, item)} style={{ fontSize: 11, fontWeight: 'bold', alignContent: 'center', textAlign: 'center', color: 'white' }}>
                    {item.address}
                  </Text>



                </View>




              );

            }

          }}
        />
      </View>

    );

  };
  renderProfile = (specialization) => {

    console.log(specialization);
    console.log(this.state.data);


    return (
      <View style={{ height: 150, backgroundColor: "#3EA99F", }}>
        <Image style={{
          flexDirection: 'row',
          width: '40%',
          height: '90%',
          //top:15,
        }} source={prfoile} />
        <Text style={{ color: 'white', fontWeight: 'bold', marginLeft: 140, bottom: 75, fontSize: 22 }}>
          {this.state.data.name}

        </Text>
        <Text

        >{specialization ?
          specialization.map((item) => {
            return (
              <View  >
                <View style={{ width: '50%', }} >
                  <Text style={{ color: '#ffe77aff', fontWeight: 'bold', marginLeft: 140, bottom: 78, fontSize: 14, width: 520 }} >({(item.name)}) </Text>
                  {console.log('hi')}
                </View>
              </View>
            )
          }) : null
          }

        </Text>


      </View>

    )

  }
  _bookingtime = (sessions) => {
    return (
      <View>
        {console.log(sessions)}
      </View>
    )


  }
  _rendersessiontype = (sessions) => {

    if (sessions.timing) {


      return (

        <View style={{ top: 30, height: 25, backgroundColor: '#ff', justifyContent: 'center', width: "80%", marginLeft: 10 }}>
          <Text style={{ color: '#000', textAlign: 'left', fontWeight: 'bold', fontSize: 15, alignItems: 'center' }}>
            {sessions.type}({moment(sessions.timing.consulting.from, 'HH:mm').format('hh:mm a')} - {moment(sessions.timing.consulting.to, 'HH:mm ').format('hh:mm a')})

          </Text>
          <Text style={{ textAlign: 'center' }}>
            {sessions.timing.consulting.to < this.state.markedDate ? '' : ''}
          </Text>
        </View>

      )


    }


  }
  _handleDatePicked = (time) => {
    const hours = time.getHours();
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();
    console.log('A time has been picked: ', hours, minutes, seconds);
    this._hideDateTimePicker();
  };
  _renderLeave = (leave) => {
    console.log('hlo00');
    <View style={{ width: '100%', top: 20, alignItems: 'center', alignContent: 'center', backgroundColor: '#fff' }} >

      <Text style={{ color: '#fff' }}>{leave}</Text>
    </View>

  }
  ActivityIndicator = () => {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        {this.state.isLoading && <ActivityIndicator color={"#fff"} />}
      </View>

    )
  }


  _renderList = (slot) => {





    return (

      <View style={{ width: '100%', top: 40, alignItems: 'flex-start', alignContent: 'flex-start' }} >

        <FlatList
          scrollEnabled={true}
          numColumns={2}
          data={slot}
          renderItem={({ item }) => {

            if (this.state.SelectslotId === item.id) {

              return (

                <View>

                  <View colors={['#f4c4f3', '#fc67fa',]}
                    style={this.state.markedDate >= item.from && this.state.markedDate >= item.to ? {
                      alignItems: 'center',
                      justifyContent: 'center',

                      borderWidth: 3,

                      backgroundColor: '#3EA99F',
                      borderRadius: 10,
                      borderColor: '#fff',
                      width: 150,
                      height: 35,
                      top: 5,
                      marginBottom: 25,

                    } : {
                      alignItems: 'center',
                      justifyContent: 'center',

                      borderWidth: 3,

                      backgroundColor: '#3EA99F',
                      borderRadius: 10,
                      borderColor: '#fff',
                      width: 150,
                      height: 35,
                      top: 5,
                      marginBottom: 25,

                    }}>


                    <Pressable disabled={this.state.markedDate >= item.from && this.state.markedDate >= item.to ? true : false} onPress={this.SelectSlot.bind(this, item.id)}>
                      <Text style={{ fontWeight: 'bold', fontSize: 10, textAlign: 'center', justifyContent: 'center', color: 'white' }}>

                        {moment(item.from, 'HH:mm').format('hh:mm a')} -  {moment(item.to, 'HH:mm').format('hh:mm a')}
                      </Text>
                    </Pressable>






                  </View>
                </View>


              );

            } else {
              return (

                <ScrollView>

                  <View
                    style={this.state.markedDate >= item.from && this.state.markedDate >= item.to ? {

                      alignItems: 'center',
                      justifyContent: 'center',

                      borderWidth: 3,

                      borderRadius: 10,
                      borderColor: '#fff',
                      width: 150,
                      height: 35,
                      top: 5,
                      padding: 2,
                      marginBottom: 25,

                      backgroundColor: '#BDEDFF',
                    } : {

                      alignItems: 'center',
                      justifyContent: 'center',
                      top: 5,
                      borderWidth: 3,

                      borderRadius: 10,
                      borderColor: '#fff',
                      width: 150,
                      height: 35,
                      padding: 2,

                      backgroundColor: '#48bdd7',
                      marginBottom: 25,



                    }}>

                    <Pressable disabled={this.state.markedDate >= item.from && this.state.markedDate >= item.to ? true : false} onPress={this.SelectSlot.bind(this, item.id)}>
                      <Text style={{ fontWeight: 'bold', fontSize: 10, textAlign: 'center', justifyContent: 'center', color: 'white' }}>



                        {moment(item.from, 'HH:mm').format('hh:mm a')} -  {moment(item.to, 'HH:mm').format('hh:mm a')}

                      </Text>
                    </Pressable>
                    <View>

                    </View>


                  </View>
                </ScrollView>
              );

            }

          }}
        />

      </View>

    );
  };
  bookingbtn = () => {
    let bokingfrom = this.state.SelectLocations.sessions.map((userdata) => userdata.timing.booking.from)
    let bookinto = this.state.SelectLocations.sessions.map((userdata) => userdata.timing.booking.to)

    let fromsort = bokingfrom.sort()
    let tosort = bookinto.sort()

    let starttimeforbookingfrom = fromsort[0]
    let starttimeforbookingto = tosort[0]

    let closingtimeforbookingfrom = fromsort.slice(-1)[0]
    let closingtimeforbookingto = tosort.slice(-1)[0]


    if (starttimeforbookingfrom > this.state.markedDate) {
      return (
        <View style={{ width: '100%', alignContent: "center", marginTop: '15%', alignItems: 'center', marginBottom: '35%' }} >


          <Pressable

            disabled={closingtimeforbookingfrom > this.state.markedDate ? true : false}
            onPress={() => this.booking(this.state.SelectslotId)}
            style={({ pressed }) => ({
              backgroundColor: pressed ? '#3EA99F' : '#3EA99F',
              width: 320, height: 40
            })}>
            {({ pressed }) => (
              <Text style={{
                fontSize: 18,
                color: '#ffff',
                textAlign: 'center',
                alignContent: 'center',
                alignItems: 'center',
                padding: 5,
                borderWidth: 2,
                borderColor: '#3EA99F',
                borderRadius: 15
              }}>
                Booking opens {(moment(closingtimeforbookingfrom, 'hh:mm A').format('hh:mm:a'))}
              </Text>
            )}
          </Pressable>
        </View>
      )
    }
    else if (closingtimeforbookingto < this.state.markedDate) {
      console.log('clinc')
      console.log(closingtimeforbookingto)
      console.log(this.state.markedDate)

      return (
        <View style={{ width: '100%', alignContent: "center", marginTop: '15%', alignItems: 'center', marginBottom: '35%' }} >


          <Pressable

            disabled={closingtimeforbookingto < this.state.markedDate ? true : false}
            onPress={() => this.booking(this.state.SelectslotId)}
            style={({ pressed }) => ({
              backgroundColor: pressed ? '#3EA99F' : '#3EA99F',
              width: 320, height: 40
            })}>
            {({ pressed }) => (
              <Text style={{
                fontSize: 18,
                color: '#ffff',
                textAlign: 'center',
                alignContent: 'center',
                alignItems: 'center',
                padding: 5,
                borderWidth: 2,
                borderColor: '#3EA99F',
                borderRadius: 15
              }}>
                Booking closed.Try tomorrow
              </Text>
            )}
          </Pressable>
        </View>
      )
    }


    else {
      return (
        <View style={{ width: '100%', alignContent: "center", marginTop: '15%', alignItems: 'center', marginBottom: '35%' }} >


          <Pressable

            onPress={() => this.booking(this.state.SelectslotId)}
            style={({ pressed }) => ({
              backgroundColor: pressed ? '#3EA99F' : '#3EA99F',
              width: 320, height: 40
            })}>
            {({ pressed }) => (
              <Text style={{
                fontSize: 18,
                color: '#ffff',
                textAlign: 'center',
                alignContent: 'center',
                alignItems: 'center',
                padding: 5,
                borderWidth: 2,
                borderColor: '#3EA99F',
                borderRadius: 15
              }}>
                {pressed ? '' : 'Book Appointment'}
              </Text>
            )}
          </Pressable>
        </View>
      )

    }
    console.log('btntine')
    console.log(sessions.timing.booking.from)
    console.log(this.state.markedDate)
    console.log(sessions.timing.booking.from < this.state.markedDate)



  }

  render() {


    return (


      <View style={{ width: '100%', height: '100%', backgroundColor: '#fff' }} colors={['#C9D6FF', '#E2E2E2',]}>
        <SafeAreaView >

          <ScrollView>
            <>
              {this.ActivityIndicator}
            </>
            <>
              {this.renderProfile(
                this.state.data.specialization

              )}
            </>

            <>

              {this._renderLocation(

                this.state.data.consultantLocations
              )}

            </>
            <>

              {this._bookingtime(
                this.state.data.sessions
                  ? this.state.date.sessions[0]
                  : [],
              )}

            </>




            {this.state.SelectLocations &&
              this.state.SelectLocations.sessions && this.state.SelectLocations.sessions != 0 ? (

              <>

                <>

                  {this._rendersessiontype(
                    this.state.SelectLocations.sessions[0]
                      ? this.state.SelectLocations.sessions[0]
                      : [],
                  )}
                </>
                <>

                  {this._renderList(
                    this.state.SelectLocations.sessions[0]
                      ? this.state.SelectLocations.sessions[0].slots
                      : [],
                  )}
                </>

                <>

                  {this._rendersessiontype(
                    this.state.SelectLocations.sessions[1]
                      ? this.state.SelectLocations.sessions[1]
                      : [],
                  )}
                </>

                <>
                  {this._renderList(
                    this.state.SelectLocations.sessions[1]
                      ? this.state.SelectLocations.sessions[1].slots
                      : [],
                  )}
                </>
                <>

                  {this._rendersessiontype(
                    this.state.SelectLocations.sessions[2]
                      ? this.state.SelectLocations.sessions[2]
                      : [],
                  )}
                </>
                <>
                  {this._renderList(
                    this.state.SelectLocations.sessions[2]
                      ? this.state.SelectLocations.sessions[2].slots
                      : [],
                  )}
                </>
                <>

                  {this._rendersessiontype(
                    this.state.SelectLocations.sessions[3]
                      ? this.state.SelectLocations.sessions[3]
                      : [],
                  )}
                </>
                <>
                  {this._renderList(
                    this.state.SelectLocations.sessions[3]
                      ? this.state.SelectLocations.sessions[3].slots
                      : [],
                  )}
                </>

                <>{
                  this.bookingbtn(

                  )
                }


                </>

                <>

                </>
              </>
            ) : (

              <>
                {this.state.SelectLocations ? (
                  <>
                    <Text style={{ marginTop: 65, textAlign: 'center' }}>{this.state.SelectLocations.leave}</Text>
                  </>
                ) : <Text></Text>}
                <Text></Text>
              </>


            )}
          </ScrollView>
        </SafeAreaView>
      </View>
    );
  }
}