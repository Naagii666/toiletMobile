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
      <View style={{justifyContent: 'center', alignItems:'center',flex:1,marginTop:'10%'}}>
        <View>
          <Text>АШИГЛАХ ЗААВАР</Text>
      </View>
        <View>
          <WebView
<<<<<<< HEAD
            style={{ height:300, width:290 }}
            // style={{ height:300, width:290 }}
=======
            // style={{flex:1}}
            style={{ height:100, width:290 }}
>>>>>>> 5d6eb833c6eec6371936d96b8bd9872469aa7246
            javaScriptEnabled={true}
            // source={{uri: 'https://www.youtube.com/embed/03DskGP1Ct0'}}
            source={{ html: "<html><body><iframe src='https://www.youtube.com/embed/03DskGP1Ct0' frameborder='0' allowfullscreen></iframe></body></html>" }}
            automaticallyAdjustContentInsets={false}
          />
        </View>

      </View>
      
    );
  }
}

export default help