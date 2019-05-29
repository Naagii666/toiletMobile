import React, { Component } from 'react'
import { 
    Alert, 
    Text, 
    Image, 
    View,
    AsyncStorage,
    TouchableOpacity,
    StatusBar,
    WebView,
  } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import YouTube from 'react-native-youtube'
class help extends Component {
    
  render () {
    return (
      <View style={{ alignItems:'center',flex:1}}>
        <View>
          <Text style={{ marginVertical:'5%'}}>АШИГЛАХ ЗААВАР</Text>
        </View>
        <View style={{height:200}}>
          <WebView
            style={{width:290}}
            javaScriptEnabled={true}
            automaticallyAdjustContentInsets={false}
            source={{uri: 'https://www.youtube.com/embed/CrDJ7abpAw8'}}
          />
        </View>
      </View>
      
    );
  }
}

export default help