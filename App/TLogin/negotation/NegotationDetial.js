// Загвар дэлгэрэнгүй
import React, { Component } from 'react'
import {
  Text, 
  Image, 
  View, 
  TouchableOpacity, 
  StyleSheet,
  Alert,
  ScrollView
} from 'react-native'
import moment from 'moment'

class NegotationDetial extends Component{

  _alert(){
    Alert.alert("Амжилттай", "Таны хүсэлтийг хүлээн авлаа");
  }

  render() {
    const { navigation } = this.props;
    const client_firstname = navigation.getParam('client_firstname', 'some default value');
    const client_lastname = navigation.getParam('client_lastname', 'some default value');
    const register = navigation.getParam('register', 'some default value');
    const statusName = navigation.getParam('statusName', 'some default value');
    const date = navigation.getParam('date', 'some default value');
    const cityName = navigation.getParam('cityName', 'some default value');
    const districtName = navigation.getParam('cityNadistrictNameme', 'some default value');
    const khorooName = navigation.getParam('khorooName', 'some default value');
    const productPrice = navigation.getParam('productPrice', 'NO-ID');
    const productName = navigation.getParam('productName', 'some default value');
    const productImage = navigation.getParam('productImage', 'some default value');
    const regex = /(<([^>]+)>)/ig;
    return(
       <ScrollView>
        <View style={styles.container}>
          <View>
            <Text> Үүсгэсэн огноо:  { moment(date).format('YYYY-MM-DD hh:mm') }</Text>
          </View>
          <View style={styles.rowText}>
            <Text style={{color:'#f9ac19',fontSize:16}}>Нэр: {client_firstname}</Text>
            <View style={{flex: 1}}>
              <Text style={{textAlign: 'right',color:'#f9ac19',fontSize:16}}>Регистер: {register}</Text>
              <Text style={{textAlign: 'right',color:'#f9ac19',fontSize:16}}>Утас: {register}</Text>
            </View>
          </View>
          <View>
          <Text> Хаяг: { cityName } {districtName} {khorooName} </Text>
            <View>
                <Text style={{color:'#f9ac19',fontSize:16}}>Бүтээгдэхүүний нэр: {productName}</Text>
                <Text style={{color:'#f9ac19',fontSize:16}}>Үнэ: {productPrice}</Text>
             </View>
            <Image 
              style={{width: '100%', height:350, }}
              source={{ uri: 'http://124.158.124.60:8080/toilet/'+productImage+'' }} />
          </View>
          <View style={{alignItems:'center'}}>
            <Text> Төлбөв - {statusName}</Text>
          </View>
          <View>
            <TouchableOpacity onPress={() => navigation.navigate({ routeName: 'EditNegotiation'}) } style={styles.button}>
              <Text> Засварлах </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  }
}

export default NegotationDetial

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
    alignItems:'center',
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