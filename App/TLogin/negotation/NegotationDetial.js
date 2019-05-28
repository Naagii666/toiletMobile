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
  Linking
} from 'react-native'
import moment from 'moment'
import { getMyComments, onSetSelectedNegotiation } from './NegotationActions'
import { Table, Row, Rows } from 'react-native-table-component';

class NegotationDetial extends Component{

  _alert(){
    Alert.alert("Амжилттай", "Таны хүсэлтийг хүлээн авлаа");
  }

  Status(status){
    switch(status){
      case 1:
        return 'Шинэ';
      case 2:
        return 'Хүлээгдэж байгаа';  
      case 3:
        return 'Үргэлжилж буй';
      case 4:
          return 'Дууссан';
      default:
        return 'Цуцлагдсан';  
    }
  }


  render() {
    const { navigation } = this.props;
    let item = navigation.getParam('item')
    const { first_name, last_name, registry_number, phone, is_company } = item.customer
    const { status, created_at, city, district, khoroo, total_price, products, sheets, slug, customer_approve, loan_month, pre_payment_percentage, description } = item

    const products_name = navigation.getParam('products_name', 'some default value');
    const products_image = navigation.getParam('products_image', 'some default value');
    const regex = /(<([^>]+)>)/ig;

    let tableHead = ['Огноо', 'Төлөх дүн']
    let tableData = sheets.map((sheet) => [sheet.payment_day, sheet.amount_sheet])

    let productTableHead = ['Нэр', 'Тоо', 'Нэгжийн үнэ']
    let productTableData = products.map((product) => [product.product.products_name, product.quantity, product.product_price])    
    const contract_url = is_company == 1 ? 'contract_individual_form' : 'contract_entity_form'

    ///contract_entity_form/?:slug
///contract_individual_form/?:slug

    return(
       <View style={{ flex: 1, }}>
         <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
          <View style={styles.container}>
            <View style={{ paddingVertical: 2, }}>
                <Text>Иргэн/Байгууллага: <Text style={{ fontWeight: 'bold'}}>{is_company == 1 ? 'Иргэн' : 'Байгууллага'}</Text></Text>
            </View>
            <View>
              <Text>Үүсгэсэн огноо: <Text style={{ fontWeight: 'bold'}}>{ moment(created_at).format('YYYY-MM-DD hh:mm') }</Text></Text>
            </View>
            <View>
              <View style={{ paddingVertical: 2, }}>
                <Text>Нэр: <Text style={{ fontWeight: 'bold'}}>{first_name} {last_name}</Text></Text>
              </View>
              <Text>Регистер: <Text style={{ fontWeight: 'bold'}}>{registry_number}</Text></Text>
              <View style={{ paddingVertical: 2, }}>
                <Text>Утас: <Text style={{ fontWeight: 'bold'}}>{phone}</Text></Text>
              </View>
              <Text>Хаяг: {city ? city.name : ''}, {district ? district.name : ''}, {khoroo ? khoroo.name : ''} </Text>
              <View style={{ paddingVertical: 2, }}>
                <Text>Төлөв: <Text style={{ fontWeight: 'bold'}}>{this.Status(status)}</Text></Text>
              </View>
            </View>
            <View style={{ backgroundColor: '#b5b5b5', height: 1, marginTop: 10, marginBottom: 10, }}/>
            <View style={{ paddingVertical: 5, }}>
              <Text>Бүтээгдэхүүний жагсаалт</Text>
            </View>
            <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
              <Row data={productTableHead} flexArr={[2, 1, 2]} style={styles.head} textStyle={styles.text}/>
              <Rows data={productTableData} flexArr={[2, 1, 2]} textStyle={styles.text}/>
            </Table>
            <View style={{ alignItems: 'flex-end', paddingTop: 5, }}>
                <Text>Нийт үнэ: <Text style={{ fontWeight: 'bold', fontSize: 17, }}>{total_price}</Text></Text>
            </View>

            <View style={{ backgroundColor: '#b5b5b5', height: 1, marginTop: 10, marginBottom: 10, }}/>

            <View style={{ paddingVertical: 10, alignItems: 'flex-end' }}>
                <View style={{ paddingVertical: 2 }}>
                  <Text>Урьчилгаа хувь: <Text style={{ fontWeight: 'bold'}}>{pre_payment_percentage}%</Text></Text>
                </View>
                <Text>Зээлийн сар: <Text style={{ fontWeight: 'bold'}}>{loan_month}</Text></Text>
            </View>

            <View style={{ paddingVertical: 5, }}>
              <Text>Төлбөрийн график</Text>
            </View>
            <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
              <Row data={tableHead} style={styles.head} textStyle={styles.text}/>
              <Rows data={tableData} textStyle={styles.text}/>
            </Table>

            <View style={{ paddingVertical: 20, }}>
              <Text>Хэлцэл зөвшөөрсөн эсэх: <Text style={{ fontWeight: 'bold'}}>{customer_approve == 1 ? 'Тийм' : 'Үгүй'}</Text></Text>
            </View>

            <View>
              <Text>
                Тайлбар: {description}
              </Text>
            </View>
          </View>
        </ScrollView>
        <View style={{ paddingBottom: 10, paddingHorizontal: 10, flexDirection: 'row' }}>
          <TouchableOpacity onPress={() => {
            Linking.openURL(`http://124.158.124.60:8080/toilet/${contract_url}/${slug}`).catch((err) => console.error('An error occurred', err));
          }} style={[styles.button, { flex: 1, }]}>
            <Text>Нөхцөл харах</Text>
          </TouchableOpacity>
          <TouchableOpacity disabled={customer_approve == 1} onPress={() => navigation.navigate({ routeName: 'EditNegotiation'}) } style={[styles.button, { flex: 1, }, customer_approve == 1 ? { backgroundColor: '#b5b5b5'} : {}]}>
            <Text>Засварлах</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
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
    padding: 20,
    paddingBottom: 10,
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
  head: { height: 40, backgroundColor: '#f1f8ff' },
  text: { margin: 6 }
});