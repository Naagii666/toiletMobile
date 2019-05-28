import React, { Component } from 'react'
import { 
    ScrollView, 
    Text, 
    Image, 
    View, 
    Button, 
    StyleSheet,
    TouchableOpacity,
    AsyncStorage
  } from 'react-native'
  
//import PushNotification from 'react-native-push-notification';
import Storage from 'react-native-storage';

import { Images } from '../Themes'
// Styles
import styles from './Styles/LaunchScreenStyles'
import { getAuthenticationToken } from '../Services/storage'

export default class LaunchScreen extends React.Component {
  componentDidMount() {
    getAuthenticationToken()
    .then(token => {
        if(token) {
          return this.props.navigation.navigate('Dashboard')
        }

        this.props.navigation.navigate('MainScreen')
    })    
  }

  render () {
    return (
      <View />
    )
  }
}