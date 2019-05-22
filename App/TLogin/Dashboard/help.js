import React, { Component } from 'react'
import { 
    Alert,
    ScrollView, 
    Text, 
    Image, 
    View,
    AsyncStorage,
    TouchableOpacity,
    TouchableHighlight,
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
            // style={{flex:1}}
            style={{ height:100, width:290 }}
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