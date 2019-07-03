// Загвар дэлгэрэнгүй
import {connect} from 'react-redux'
import React, { Component } from 'react'
import moment from 'moment'
import { colors } from '../../utils'
import {bindActionCreators} from 'redux'
import { getMyComments, onSetSelectedNegotiation,onSendInvoice,onRenew,onCancel } from './NegotationActions'
import { Table, Row, Rows,Cell,TableWrapper } from 'react-native-table-component';
import ProductList from './ProductList'
import { ActivityIndicator, Dimensions, View, Text,Image, FlatList, RefreshControl,TouchableHighlight,StyleSheet,Alert, TextInput,ScrollView,StatusBar, TouchableOpacity ,Linking,Clipboard } from 'react-native'
import CardView from 'react-native-cardview';
import Modal from 'react-native-modalbox'
import {  H2, H3, H4, Wrapper, Separator } from '../../Components'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
import { request, _getToken } from '../../utils/api'
import { getAuthenticationToken } from '../../Services/storage'
import axios from 'axios'
class InvoiceViewer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      copyText: ' ',
      item:this.props.item
    }
  }
  
  set_Text_Into_Clipboard = async (data) => {
    await Clipboard.setString(data);
    Alert.alert("", "Линк хуулагдлаа");
  }
  send_invoice = (invoice_id) =>{
    Alert.alert(
      '',
      'Нэхэмжлэх илгээх үү ?',
      [
        {
          text: 'Үгүй',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'Тийм', onPress: () => {
          console.log('send Pressed')
          this.props.onSendInvoice(invoice_id)
        
        }
      },
      ],
      { cancelable: false },
    );
  }
  _renderFooter = () => {
    return (
      
      <View style={{ paddingVertical: 10, paddingHorizontal: 30, }}>
        <TouchableOpacity 
                activeOpacity={0.6}
                onPress={this.props.onBack}
                >
                <View style={[styles.inputContainer, { marginTop:10,marginBottom: 0, backgroundColor: colors.dark_gray }]}>
                    <View style={styles.inputs1}>
                        <Text>Буцах</Text>
                    </View>
                </View>
              </TouchableOpacity>
      </View>
    )
  }
  setCopyText(copyValue){
    // alert(copyValue)
    // this.setState({ copyText:'http://124.158.124.60:8080/toilet/inv/'+this.state.item.slug+'/'+copyValue+'' })
    this.set_Text_Into_Clipboard('http://124.158.124.60:8080/toilet/inv/'+this.state.item.slug+'/'+copyValue+'')
  }
  Buttons = (copyValue,index) =>{
    const contract_url = this.state.item.is_company == 1 ? 'contract_individual_form' : 'contract_entity_form'
    return(
      <View style={{flexDirection:'row',}}>
        <View style={{margin:5}}>
          <TouchableOpacity onPress={() => {
            Linking.openURL(`http://124.158.124.60:8080/toilet/inv/${this.state.item.slug}/${copyValue}`).catch((err) => console.error('An error occurred', err));
          }}
            activeOpacity={0.6} >
            <FontAwesomeIcon name='eye' size={20} color='#f9ac19' />
          </TouchableOpacity>
        </View>
        <View style={{margin:5}}>
          <TouchableOpacity onPress={()=>{this.send_invoice(this.state.item.invoice[index].id)}} 
            activeOpacity={0.6} >
            <FontAwesomeIcon name='send' size={20} color='#f9ac19' />
          </TouchableOpacity>
        </View>
        <View style={{margin:5}}>
            
            <TouchableOpacity onPress={ ()=>{this.setCopyText(copyValue)}} 
              activeOpacity={0.6} >
              <FontAwesomeIcon  name='copy' size={20} color='#f9ac19' />
          </TouchableOpacity>
        </View>
        
        
    </View>   
    )
  }
  render() {
    const { invoice, slug } = this.state.item
    let invoiceTableData = invoice.map((inv) => [inv.invoice_date, inv.amount, inv.paid,inv.invoice_number])
    let invoiceTableHead = ['Огноо','Төлөх дүн', 'Төлсөн дүн','Үйлдэл']
    return (
        <View style={{ flex: 1, backgroundColor: '#fff',paddingVertical: 30, paddingHorizontal: 10,}}>
         <ScrollView>
          <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
              <Row data={invoiceTableHead} style={styles.head} textStyle={styles.text}/>
              {
                invoiceTableData.map((rowData,index)=>(
                <TableWrapper key={index} style={{flexDirection:'row'}}>
                {
                  rowData.map((cellData,cellIndex)=>
                  <Cell key={cellIndex} data = {cellIndex === 3 ?this.Buttons(cellData,index):cellData}/>
                  )
                }
                </TableWrapper>
                ))
              }
            </Table>
            <View style={{flexDirection:'row',marginVertical:5}}>
            
          </View>
          { this._renderFooter() }
          </ScrollView>
        </View>
    )
  }
}

class NegotationDetial extends Component{
  constructor(props) {
    super(props);
    this.state = {
      invoice_viewer: false,
    }
  }
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
  buttons(status,customer_approve,navigation,contract_url,slug,id){
    if(status==4){
      return
    }
    if(status==3){
      return(
        <View style={{ paddingBottom: 10, paddingHorizontal: 10, flexDirection: 'row' }}>
          <TouchableOpacity onPress={() => {
            Linking.openURL(`http://124.158.124.60:8080/toilet/${contract_url}/${slug}`).catch((err) => console.error('An error occurred', err));
          }} style={[styles.button, { flex: 1, }]}>
            <Text>Нөхцөл харах</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {this.props.onCancel(id)}} style={[styles.button, { flex: 1, }, { backgroundColor: '#f9ac19'} : {}]}>
            <Text>Цуцлах</Text>
          </TouchableOpacity>
        </View>
      )
    }
    if(status<3){
      return(
        <View style={{ paddingBottom: 10, paddingHorizontal: 10, flexDirection: 'row' }}>
          <TouchableOpacity onPress={() => {
            Linking.openURL(`http://124.158.124.60:8080/toilet/${contract_url}/${slug}`).catch((err) => console.error('An error occurred', err));
          }} style={[styles.button2, { flex: 1, }]}>
            <Text>Нөхцөл харах</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={ () => navigation.navigate({ routeName: 'EditNegotiation'}) } style={[styles.button2, { flex: 1, }, { backgroundColor: '#f9ac19'} ]}>
            <Text>Засварлах</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {this.props.onCancel(id)}} style={[styles.button2, { flex: 1, }, { backgroundColor: '#f9ac19'} : {}]}>
            <Text>Цуцлах</Text>
          </TouchableOpacity>
        </View>
      )
    }else{
      return(
      <View style={{ paddingBottom: 10, paddingHorizontal: 10, flexDirection: 'row' }}>
          <TouchableOpacity onPress={() => {
            Linking.openURL(`http://124.158.124.60:8080/toilet/${contract_url}/${slug}`).catch((err) => console.error('An error occurred', err));
          }} style={[styles.button, { flex: 1, }]}>
            <Text>Нөхцөл харах</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {this.props.onRenew(id)}} style={[styles.button, { flex: 1, }, {backgroundColor: '#b5b5b5'}]}>
            <Text>Шинэчилэх</Text>
          </TouchableOpacity>
        </View>
      )
    }
  }

render() {
    const { comments, loading } = this.props
    
    const { navigation } = this.props;
    let item = navigation.getParam('item')
    const { first_name, last_name, registry_number, phone, is_company,email } = item.customer
    const { status, created_at, city, district, khoroo, total_price, products, sheets, slug, customer_approve, loan_month, pre_payment_percentage, description,negotiation_photo,invoice,id,number } = item

    const products_name = navigation.getParam('products_name', 'some default value');
    const products_image = navigation.getParam('products_image', 'some default value');
    const regex = /(<([^>]+)>)/ig;

    let tableHead = ['Огноо', 'Төлөх дүн']
    let tableData = sheets.map((sheet) => [sheet.payment_day, sheet.amount_sheet])

    let productTableHead = ['Нэр', 'Тоо', 'Нэгжийн үнэ']
    let productTableData = products.map((product) => [product.product.products_name, product.quantity, product.product_price])    
    const contract_url = is_company == 1 ? 'contract_individual_form' : 'contract_entity_form'
    const photos = negotiation_photo.map((photo) => (<Image 
    style={{width: 100, height:100,marginVertical:10,marginHorizontal:5 }}
    source={{ uri: 'http://124.158.124.60:8080/toilet/'+[photo.photo]+'' }} />))
    ///contract_entity_form/?:slug
///contract_individual_form/?:slug

    return(
       <View style={{ flex: 1, }}>
         <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
          <View style={styles.container}>
          <View style={{ paddingVertical: 2, }}>
                <Text style={{ fontWeight: 'bold'}}>Хэлцэлийн дугаар: <Text style={{ fontWeight: 'bold'}}>{number}</Text></Text>
            </View>
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
              <View style={{ paddingVertical: 2, }}>
                <Text>Mail: <Text style={{ fontWeight: 'bold'}}>{email}</Text></Text>
              </View>
              <Text>Хаяг: {city ? city.name : ''}, {district ? district.name : ''}, {khoroo ? khoroo.name : ''} </Text>
              <View style={{ paddingVertical: 2, }}>
                <Text>Төлөв: <Text style={{ fontWeight: 'bold'}}>{this.Status(status)}</Text></Text>
              </View>
              <View style={{ paddingVertical: 2, }}>
                <Text>Нэхэмжлэх:{invoice.id}</Text>
                <TouchableOpacity 
                  activeOpacity={0.6}
                  onPress={() => this.setState({ invoice_viewer: true })}>
                <View style={[styles.inputContainer, { marginTop:10,marginBottom: 0, backgroundColor: '#f9ac19' }]}>
                    <View style={styles.inputs2}>
                        <Text>Нэхэмжлэх харах</Text>
                    </View>
                </View>
              </TouchableOpacity>
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

            <View style={{ paddingVertical: 20, }}>
              <Text>
                Тайлбар: {description}
              </Text>
            </View>

            <View style={{ paddingVertical: 20, }}>
              <Text>
                Баталгаажуулалт: 
              </Text>
              <View style={{ flex: 1,flexDirection: 'row',}}>
                {photos}
              </View>
            </View>

          </View>
        </ScrollView>

        {this.buttons(status,customer_approve,navigation,contract_url,slug,id)}

        <Modal 
        isOpen={this.state.invoice_viewer}
        onClosed={() => this.setState({ invoice_viewer: false })}
      >
        <InvoiceViewer 
          item={item}
          onSendInvoice={this.props.onSendInvoice}
          // products={comments}
          // selected_products={this.state.selected_products}
          // onSelectedProducts={(selected_products) => {

          //   console.log(selected_products)
          //   this.setState({ selected_products: selected_products.map((product) => Object.assign(product, {
          //     quantity: 1,
          //   })),invoice_viewer: false })
          // }}

          onBack={() => this.setState({ invoice_viewer: false })}
        />
      </Modal>
      </View>
    )
  }
}
export default connect(
  state => ({
      loading: state.negotation.getIn(['comment_list', 'loading']),
      comments: state.products.getIn(['comment_list', 'data']).toJS(),
  }),
dispatch => {
  return {
    onSetSelectedNegotiation: bindActionCreators(onSetSelectedNegotiation, dispatch),
    getMyComments: bindActionCreators(getMyComments, dispatch),
    onSendInvoice: bindActionCreators(onSendInvoice, dispatch),
    onRenew: bindActionCreators(onRenew, dispatch),
    onCancel: bindActionCreators(onCancel, dispatch),
    // navigate: this.props.navigation
  }
}
)(NegotationDetial) 

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
  inputContainer: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#fff',
    borderRadius:30,
    borderBottomWidth: 1,
    borderColor:'lightgrey',
    borderWidth:1,
    //width:250,
    //paddingHorizontal: 20,
    height:45,
    fontSize:15,
    marginBottom:20,
    flexDirection: 'row',
    alignItems:'center'
  },
  inputs2:{
    
    marginLeft:16,
    borderBottomColor: '#DCDCDC',
    fontSize:15,
    flex:1,
  },
  inputs1:{
    alignItems:'center',
    borderBottomColor: '#DCDCDC',
    fontSize:15,
    flex:1,
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
    justifyContent:'center',
    // flex:1/3,
    borderRadius:10,
    alignContent: 'flex-end',
  },
  button2: {
    alignItems: 'center',
    backgroundColor: '#f9ac19',
    paddingVertical: 10,
    marginVertical: 10,
    marginHorizontal:1,
    justifyContent:'center',
    // flex:1/3,
    borderRadius:10,
    // alignContent: 'flex-end',
  },
  head: { height: 40, backgroundColor: '#f1f8ff' },
  text: { margin: 6 }
});