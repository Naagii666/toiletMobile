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
import { getMyComments, onSetSelectedNegotiation } from './NegotationActions'

class NegotationDetial extends Component{

  _alert(){
    Alert.alert("Амжилттай", "Таны хүсэлтийг хүлээн авлаа");
  }


  render() {
    const { navigation } = this.props;
    const first_name = navigation.getParam('first_name', 'some default value');
    const last_name = navigation.getParam('last_name', 'some default value');
    const registry_number = navigation.getParam('registry_number', 'some default value');
    const status = navigation.getParam('status', 'some default value');
    const phone = navigation.getParam('phone', 'some default value');
    const date = navigation.getParam('date', 'some default value');
    const name = navigation.getParam('name', 'some default value');
    const city_name = navigation.getParam('city_name', 'some default value');
    const district_name = navigation.getParam('district_name', 'some default value');
    const khoroo_name = navigation.getParam('khoroo_name', 'some default value');
    const total_price = navigation.getParam('total_price', 'NO-ID');
    const products_name = navigation.getParam('products_name', 'some default value');
    const products_image = navigation.getParam('products_image', 'some default value');
    const regex = /(<([^>]+)>)/ig;


    // CommentItem ({ item }){
    //   let { 
    //     first_name, last_name, registry_number, status, date, phone, name,
    //     city_name, district_name, khoroo_name, products_name, products_image, total_price
    //   } = item
    let item={first_name, last_name, registry_number}
      const { navigate } = this.props.navigation
    // sendData = () => {
    //   this.props.onSetSelectedNegotiation(item)
    //   navigate('EditNegotiation',{
    //     first_name: first_name,
    //     last_name: last_name,
    //     registry_number: registry_number,
    //   })
    // }
    
    
    return(
      
       <ScrollView>
        <View style={styles.container}>
          <View>
            <Text> Үүсгэсэн огноо:  { moment(date).format('YYYY-MM-DD hh:mm') }</Text>
          </View>
          <View style={styles.rowText}>
            <Text style={{color:'#f9ac19',fontSize:16}}>Нэр: {first_name}</Text>
            <View style={{flex: 1}}>
              <Text style={{textAlign: 'right',color:'#f9ac19',fontSize:16}}>Регистер: {registry_number}</Text>
              <Text style={{textAlign: 'right',color:'#f9ac19',fontSize:16}}>Утас: {phone}</Text>
            </View>
          </View>
          <View>
          <Text> Хаяг: {city_name}, {district_name}, {khoroo_name} </Text>
            <View>
                <Text style={{color:'#f9ac19',fontSize:16}}>Бүтээгдэхүүний нэр: {products_name}</Text>
                <Text style={{color:'#f9ac19',fontSize:16}}>Үнэ: {total_price}</Text>
             </View>
            <Image 
              style={{width: '100%', height:350, }}
              source={{ uri: 'http://124.158.124.60:8080/toilet/'+products_image+'' }} />
          </View>
          <View style={{alignItems:'center'}}>
            <Text> Төлөв - {status}</Text>
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

dispatch => {
  return {
    onSetSelectedNegotiation: bindActionCreators(onSetSelectedNegotiation, dispatch),
    getMyComments: bindActionCreators(getMyComments, dispatch),
    // navigate: this.props.navigation
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