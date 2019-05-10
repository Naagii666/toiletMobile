// Загвар дэлгэрэнгүй
import React, { Component } from 'react'
import {
  Text, 
  Image, 
  View, 
  TouchableOpacity, 
  StyleSheet,
} from 'react-native'

class DetialFaCheck extends Component{
  render() {
    const { navigation } = this.props;
    const itemId = navigation.getParam('name', 'some default value');
    const otherParam = navigation.getParam('price', 'NO-ID');
    const definition = navigation.getParam('definition', 'some default value');
    const products_image = navigation.getParam('url', 'some default value');
    return(
      <View style={styles.container}>
        <View>
          <Text style={{fontSize:25}}>Танилцуулга</Text>
        </View>
        <Text style={styles.rowText}>
          <Text>Нэр: {itemId}</Text>
          <Text>Үнэ: {JSON.stringify(otherParam)}</Text>
        </Text>
        <View>
          <Image 
            style={{width: '100%', height:'60%'}}
            source={{ uri: 'http://124.158.124.60:8080/toilet/'+products_image+'' }} />
          {/* <Image style={{flex: 1}} resizeMode='cover' source={{uri: 'https://png.icons8.com/message/ultraviolet/50/3498db'}} />
          {/* <Image style={styles.inputIcon} source={{uri: 'https://thumbs.dreamstime.com/z/wooden-toilet-shed-old-wooden-toilet-shed-out-order-sign-door-109618025.jpg'}}/> */}
        </View>
        <View>
          <Text>{definition}</Text>
        </View>
        <TouchableOpacity onPress={ () => this.props.navigation.navigate('Register') } style={styles.button}>
          <Text> Худалдан авах хүсэлт илгээх </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default DetialFaCheck

const styles = StyleSheet.create({
  container:{
    flex: 1,
    margin:30
  },
  rowText:{
    flexDirection: 'row',
    padding:15,
    fontSize:18,
    color:'#ff9900'
  },
  inputIcon:{
    // flex: 1,
    width:'100%',
    height:'60%',
    // marginLeft:15,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#841584',
    padding: 10,
    margin: 10,
    flex:1/3,
    borderRadius:10
  },
});