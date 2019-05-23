import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import React from 'react'
import _ from 'lodash'
import { ActivityIndicator, Dimensions, View, Text,Image, FlatList, RefreshControl,TouchableHighlight,StyleSheet,Alert, TextInput,ScrollView,StatusBar, TouchableOpacity  } from 'react-native'
import CardView from 'react-native-cardview';
import Modal from 'react-native-modalbox'
import { getMyComments, getLocations } from '../product/ProductsActions'
import { Row, H2, H3, H4, Wrapper, Separator } from '../../Components'
import { colors } from '../../utils'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import FlipCard from 'react-native-flip-card'
import { Dropdown } from 'react-native-material-dropdown';
import ModalSelector from 'react-native-modal-selector'
//const DropDown = require('react-native-dropdown')
import { onAddNegotation, onEditNegotation } from './NegotationActions'
import Icon from 'react-native-vector-icons/Ionicons'

const { width } = Dimensions.get('window')
const cardWidth = (width / 2) - 40

// const cities = [{
//   value: 'Улаанбаатар',
// }, {
//   value: 'Дархан'
// }, {
//   value: 'Эрдэнэт'
// }]
import ProductList from './ProductList'

class ProductSelector extends React.Component {
  state = {
    selected_products: this.props.selected_products
  }

  toggleProduct = (product) => {
    let selected_products = this.state.selected_products

    let index = _.findIndex(selected_products, (cur) => {
      return cur.products_id == product.products_id
    })

    if(index == -1) {
      selected_products.push(product)
      this.setState({
        selected_products: selected_products
      })
      return
    }

    _.pullAt(selected_products, [index])

    this.setState({
      selected_products,
    })
  }

  CommentItem = ({ item }) => {
    let { product_id, products_name, products_price, products_description, products_image,client_firstname } = item

    let is_selected = _.findIndex(this.state.selected_products, (product) =>  { return product.products_id == item.products_id }) != -1 

    return (
      <CardView
        style={{ flex: 1, margin: 2 }}
        cardElevation={7}
        cardMaxElevation={7}
        cornerRadius={10}
      >
        <StatusBar
          backgroundColor="#f9ac19"
          barStyle="light-content"
        />
        <TouchableHighlight
          underlayColor={'transparent'}
          onPress={() => this.toggleProduct(item)}
          style={{ flex:1/3, aspectRatio:1 }}>
          <View style={{ overflow: 'hidden', paddingBottom:15, justifyContent:'center', alignItems:'center' }}>
            <H4>{products_name}</H4>
            <View style={{ width: cardWidth, height: cardWidth, borderRadius: 10, overflow: 'hidden' }}>
              <Image
                style={{ flex: 1, width: null, height: null }}
                source={{ uri: 'http://124.158.124.60:8080/toilet/'+products_image+'' }} 
              />
              {
                is_selected && (
                    <View
                      style={{
                        backgroundColor: 'rgba(143, 201, 58, 0.6)',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        borderRadius: 10,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <Icon name='md-checkmark' size={41} color='#fff' />
                    </View>
                )
              }
               
            </View>
            <H3>{parseInt(products_price)}</H3>
          </View>
        </TouchableHighlight>
      </CardView>
    )
  }

  _renderEmpty() {
    return <H3></H3>
  }

  onSaveChanges = () => {
    this.props.onSelectedProducts(this.state.selected_products)
  }

  _renderFooter = () => {
    return (
      <View style={{ flexDirection: 'row', paddingVertical: 10, paddingHorizontal: 20, }}>
        <TouchableHighlight onPress={this.props.onBack} style={[styles.buttonContainer,styles.loginButton, { flex: 1, backgroundColor: '#b5b5b5' }]}>
          <Text style={styles.loginText}>Буцах</Text>
        </TouchableHighlight>
        <View style={{ width: 10, }}/>
        <TouchableHighlight onPress={this.onSaveChanges} style={[styles.buttonContainer,styles.loginButton, { flex: 1, }]}>
          <Text style={styles.loginText}>Тохируулах</Text>
        </TouchableHighlight>
      </View>
    )
  }

  render() {
    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
          <FlatList
            contentContainerStyle={{
              backgroundColor: '#fff',
            }}
            numColumns={2}
            data={this.props.products}
            //data={[]}
            renderItem={this.CommentItem}
            removeClippedSubviews={false}
            // ItemSeparatorComponent={Separator}
            ListEmptyComponent={this._renderEmpty}
            // refreshControl={
            //   <RefreshControl
            //     refreshing={loading}
            //     onRefresh={this._onRefresh.bind(this)}
            //   />
            // }
          />
          { this._renderFooter() }
        </View>
    )
  }
}

const statusData = [{
      value: 'Шинэ',
    }, {
      value: 'Хүлээгдэж байгаа',
    }, {
      value: 'Үргэлжилж буй',
    }, {
      value: 'Дууссан',
    }, {
      value: 'Цуцлагдсан',
    }];

    let alphapet = ['а', 'б', 'в', 'г', 'д', 'е', 'ё', 'ж', 'з', 'и', 'й', 'к', 'л', 'м', 'н', 'о', 'п', 'р', 'с', 'т', 'у', 'ф', 'х', 'ц', 'ч', 'ш', 'щ', 'ъ', 'ы', 'ь', 'э', 'ю', 'я'].map((cur, index) => { return { key: index, label: cur.toUpperCase() }})
 

//const isValidate = firstName.length > 0 && client_lastName > 0 && register > 0 && client_lastName > 0;
class EditNegotation  extends React.Component {
  constructor(props) {
    super(props);
    console.log(props.negotiation)
    this.state = {
      firstName  : '',
      client_lastName: '',
      phone: '',
      register: '',
      negotiation_id: props.negotiation.negotiation_id,
      statusName: props.negotiation.status,
      selected_products: [],
      loading: false,
      product_chooser: false,
      pre_payment_percentage: props.negotiation.pre_payment_percentage,
      loan_month: props.negotiation.loan_month,
      description: props.negotiation.description,
      
    }
  }
  componentDidMount() {
    this.props.getMyComments()
    //this.props.getLocations()
    //console.log(this.props.comments)
  }
  _alert(){
    Alert.alert('Мэдэгдэл', 'хийгдэж байна')
  }
  _onRefresh(){
    this.getMyComments()
  }

  _getColor(value) {
    switch(value){
      case 4:
        return colors.green
      case 5:
        return 'red'
      case 2:
        return colors.brand_color
      default:
        return 'black'
    }
  }

  onStatusChanged = (value) => {
      let statusName
      switch(value){
        case 'Шинэ':
          statusName = 1;
          break
        case 'Хүлээгдэж байгаа':
          statusName = 2;
          break
        case 'Үргэлжилж буй':
          statusName = 3;
          break
        case 'Дууссан':
          statusName = 4;
          break
        case 'Цуцлагдсан':
          statusName = 5;
          break
        default:
          statusName = 0;
          break
      }

      this.setState({ statusName })
  }
  formValidate() {
    let { selected_products, statusName, pre_payment_percentage, loan_month } = this.state
  
    // if(selected_products.length == 0) {
    //   alert('Бүтээгдэхүүн сонгоно уу')
    //   return true
    // }

    if(statusName == 0) {
      alert('Хэлцлийн төлөв сонгоно уу')
      return true
    }

    return false
  }

  EditNegotation = () => {
    let error = this.formValidate()
    if(error) return
    this.props.onEditNegotation(this.state)
  }

  onQuantityChanged = (product, quantity) => {
    let selected_products = this.state.selected_products
    let index = _.findIndex(selected_products, (cur) => cur.products_id == product.products_id)
    selected_products[index].quantity = quantity
    this.setState({
      selected_products
    })
  }

  render() {
    const { comments, loading } = this.props
    const { navigate } = this.props.navigation
    const { navigation } = this.props;
    const first_name = firstName;
    const last_name = navigation.getParam('last_name');
    const registry_number = navigation.getParam('registry_number');
    let { selected_products, statusName, description, pre_payment_percentage, loan_month, city_id, district_id, firstName, client_lastName } = this.state

    console.log(statusName)

    return (
      <Wrapper>
        <ScrollView style={styles.container}>
          <KeyboardAwareScrollView contentContainerStyle={styles.container2}
          resetScrollToCoords={{x:1,y:1}}
          scrollEnabled={false}>
            <View style={{ marginBottom: 10, }}>
                <Text>
                  1. Харилцагчийн мэдээлэл
                </Text>
              </View>
            <View style={styles.rowText}>
              <Text style={{color:'#f9ac19',fontSize:16}}>Нэр: {first_name}</Text>
            </View>
            <View style={styles.rowText}>
              <Text style={{textAlign: 'right',color:'#f9ac19',fontSize:16}}>Овог: {last_name}</Text>
            </View>
            <View style={styles.rowText}>
              <Text style={{textAlign: 'right',color:'#f9ac19',fontSize:16}}>Регистер: {registry_number}</Text>
            </View>
                {/* Bvteegdhvvn */}
            <View style={{ padding: 20, backgroundColor: colors.gray }}>
              <View style={{ marginBottom: 10, }}>
                <Text>
                  2. Бүтээгдэхүүний мэдээлэл
                </Text>
              </View>
              <View style={{ height: 1, backgroundColor: 'lightgrey' }} />
              <ProductList 
                products={selected_products} 
                onQuantityChanged={this.onQuantityChanged}
              />
              <TouchableOpacity 
                activeOpacity={0.6}
                onPress={() => this.setState({ product_chooser: true })}
              >
                <View style={[styles.inputContainer, { marginBottom: 0, backgroundColor: colors.dark_gray }]}>
                    <View style={styles.inputs2}>
                        <Text>Бүтээгдэхүүн тохируулах</Text>
                    </View>
                </View>
              </TouchableOpacity>
            </View>

            <View style={{ padding: 20, backgroundColor: colors.gray }}> 
              {/* tolow */}
              <View style={{ marginBottom: 10, }}>
                  <Text>
                    4. Хэлцлийн дэлгэрэнгүй
                  </Text>
              </View>
              <Dropdown 
                  style={[styles.dropdownButton, styles.rowText]}
                  onChangeText={this.onStatusChanged}
                  dropdownOffset={{top:5}}
                  containerStyle={{
                    borderWidth: 1, 
                    borderColor:'lightgrey',
                    borderRadius: 30,
                    backgroundColor:'#fff',
                    marginBottom: 20,
                    height: 45,
                  }}
                  //textColor='red'
                  textColor={this._getColor(statusName)}
                  rippleCentered={true}
                  inputContainerStyle={{ borderBottomColor: 'transparent', marginLeft:16, }}
                  label='Хэлцэлийн төлөв'
                  value={statusData[statusName].value}
                  data={statusData}
              />
              <View style={{ flexDirection: 'row'}}>
                <View style={[styles.inputContainer, { flex: 1, }]}>    
                    <TextInput style={styles.inputs}
                        placeholder="Урьдчилгаа хувь"
                        keyboardType="numeric"
                        underlineColorAndroid='transparent'
                        value={String(pre_payment_percentage)}
                        onChangeText={(pre_payment_percentage) => this.setState({ pre_payment_percentage })}
                    />
                </View>
                <View style={{ width: 10, }}/>
                <View style={[styles.inputContainer, { flex: 1, }]}>    
                    <TextInput style={styles.inputs}
                        placeholder="Зээлийн сар"
                        keyboardType="numeric"
                        underlineColorAndroid='transparent'
                        value={String(loan_month)}
                        onChangeText={(loan_month) => { 
                          this.setState({ loan_month }) 
                        }}
                    />
                </View>
              </View>

              <View style={[styles.inputContainer, { marginBottom: 0, flex: 1, height: 100 }]}>    
                    <TextInput style={[styles.inputs, { height: 90 }]}
                        placeholder="Нэмэлт тайлбар"
                        //keyboardType="default"
                        value={description}
                        multiline={true}
                        numberOfLines={12}
                        underlineColorAndroid='transparent'
                        onChangeText={description => this.setState({ description })}
                    />
              </View>
            </View>
            
            <View style={{ padding: 20, }}>
            {
              
              loading ? (
                <ActivityIndicator />
              ) : (
                
                <TouchableHighlight onPress={this.EditNegotation} style={[styles.buttonContainer,styles.loginButton]}>
                  <Text style={styles.loginText}>Хэлцэл засварлах</Text>
                </TouchableHighlight>
              )
            }
            </View>
          
        </KeyboardAwareScrollView>
      </ScrollView>
      <Modal 
        isOpen={this.state.product_chooser}
        onClosed={() => this.setState({ product_chooser: false })}
      >
        <ProductSelector 
          products={comments}
          selected_products={this.state.selected_products}
          onSelectedProducts={(selected_products) => {
            this.setState({ selected_products: selected_products.map((product) => Object.assign(product, {
              quantity: 1,
            })), product_chooser: false })
          }}
          onBack={() => this.setState({ product_chooser: false })}
        />
      </Modal>
    </Wrapper>
    
    )
  }
}
export default connect(
  state => ({
      loading: state.negotation.getIn(['comment_list', 'loading']),
      comments: state.products.getIn(['comment_list', 'data']).toJS(),
      negotiation: state.negotation.getIn(['selected_negotiation', 'data']).toJS(),
      //locations: state.products.getIn(['locations']).toJS(),
  }),
  dispatch => {
    return {
      onAddNegotation: bindActionCreators(onAddNegotation, dispatch),
       onEditNegotation: bindActionCreators(onEditNegotation, dispatch),
       getMyComments: bindActionCreators(getMyComments, dispatch),
       //getLocations: bindActionCreators(getLocations, dispatch)
      // navigate: this.props.navigation
    }
  }
)(EditNegotation)

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#fff',
    //width:wp('100%'),
    //height:hp('98%'),
    //paddingHorizontal: 20,
  },
  container2: {
    //paddingTop:'10%',
    //justifyContent: 'center',
    //alignItems: 'center',
  },
  dropdownButton: {
    flex: 1,
    
    fontSize:15
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
  inputs:{
    height:45,
    marginLeft:16,
    borderBottomColor: '#DCDCDC',
    fontSize:15,
    flex:1,
},
inputs2:{
  marginLeft:16,
  borderBottomColor: '#DCDCDC',
  fontSize:15,
  flex:1,
},
buttonContainer: {
  height:45,
  //flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  //alignItems: 'center',
  //width:250,
  borderRadius:30,
},
rowText:{
  flexDirection: 'row',
  fontSize:15,
  justifyContent: 'space-between',
  
},
inputs:{
    height:45,
    marginLeft:16,
    borderBottomColor: '#DCDCDC',
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
    //padding: 10,
    //margin: 10,
    borderRadius:10,
    justifyContent: 'center',
  },
  photo: {
    height: 50,
    width: 50,
    borderRadius: 20,
  },
  loginButton: {
    backgroundColor: "#f9ac19",
   
  },
  loginText: {
    color: 'black',
  }
});
