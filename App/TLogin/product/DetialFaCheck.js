// Загвар дэлгэрэнгүй
import React, { Component } from 'react'
import {
  Text, 
  Image, 
  View, 
  TouchableOpacity, 
  StyleSheet,
  Alert,
  ScrollView,
  StatusBar
} from 'react-native'

class DetialFaCheck extends Component{

  _alert(){
    Alert.alert("Амжилттай", "Таны хүсэлтийг хүлээн авлаа");
  }

  render() {
    const { navigation } = this.props;
    const itemId = navigation.getParam('name', 'some default value');
    const otherParam = navigation.getParam('price', 'NO-ID');
    const definition = navigation.getParam('definition', 'some default value');
    const products_image = navigation.getParam('url', 'some default value');
    const regex = /(<([^>]+)>)/ig;
    return(
      <ScrollView>
        <View style={styles.container}>
          <StatusBar
            backgroundColor="#f9ac19"
            barStyle="light-content"
          />
          <View>
            <Text style={{textAlign: 'center',fontSize:30,marginBottom:10,}}>Танилцуулга</Text>
          </View>
          <View style={styles.rowText}>
            <Text style={{color:'#f9ac19',fontSize:16}}>Нэр: {itemId}</Text>
          </View>
          <View style={{flex: 1}}>
            <Text style={{textAlign: 'left',color:'#f9ac19',fontSize:16}}>Үнэ: {JSON.stringify(otherParam)}</Text>
          </View>
          
          <View>
            <Image 
              style={{width: '100%', height:350, }}
              source={{ uri: 'http://124.158.124.60:8080/toilet/'+products_image+'' }} />
          </View>
          <View style={{alignItems:'center'}}>
            <Text style={styles.definition}>{definition.replace(regex,'')}</Text>
          </View>
        </View>
        </ScrollView>
    );
  }
}

export default DetialFaCheck

const styles = StyleSheet.create({
  container:{
    flex: 1,
    margin:20,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  rowText:{
    flexDirection: 'row',
    // padding:10,
    fontSize:15,
    color:'#ff9900',
    justifyContent: 'space-between',
  },
  definition: {
    fontSize:15,
    color:'black',
    textAlign:'justify'
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#f9ac19',
    padding: 10,
    margin: 10,
    // flex:1/3,
    borderRadius:10,
    alignContent: 'flex-end',
  },
});