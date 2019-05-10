import React, { Component } from 'react'
import { 
  ScrollView, 
  Text, 
  Image, 
  View, 
  Button, 
  StyleSheet,
  TouchableOpacity,
} from 'react-native'
  
//import PushNotification from 'react-native-push-notification';
//import PushNotificationAndroid from 'react-native-push-notification'

import { Images } from '../Themes'

// Styles
import styles from './Styles/LaunchScreenStyles'

export default class LoginScreen extends React.Component {
  render () {
    return (
      <View style={styles.container}>
        <View style={styles.centered}>
          <Image 
            source={Images.launch} 
            style={styles.logo} 
            resizeMode='contain'
          />
        </View>

        <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0, }}>
          <View style={{flexDirection: 'row', padding: 20, }}>
            <TouchableOpacity style={styles.button} onPress={ () => this.props.navigation.navigate('Login') }>
              <Text style={styles.buttonText} adjustFontSizeToFit numberOfLines={1} > Нэвтрэх </Text>
            </TouchableOpacity>
            <View style={{ width: 20, }} />
            <TouchableOpacity onPress={ () => this.props.navigation.navigate('Register') } style={styles.register}>
              <Text style={styles.registerText} adjustFontSizeToFit numberOfLines={1}> Бүртгүүлэх </Text>
            </TouchableOpacity>
          </View>
        </View>
          
      </View>
    )
  }
}