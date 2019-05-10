import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import React from 'react'
import _ from 'lodash'
import { ActivityIndicator, Dimensions, View, Text,Image, FlatList, RefreshControl,TouchableHighlight,StyleSheet,Alert, TextInput,ScrollView,StatusBar  } from 'react-native'
import CardView from 'react-native-cardview';
import Modal from 'react-native-modalbox'
import { getMyComments } from '../product/ProductsActions'
import { Row, H2, H3, H4, Wrapper, Separator } from '../../Components'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import FlipCard from 'react-native-flip-card'
import { Dropdown } from 'react-native-material-dropdown';
import { onAddNegotation } from './NegotationActions'
import Icon from 'react-native-vector-icons/Ionicons'

const { width } = Dimensions.get('window')
const cardWidth = (width / 2) - 40
//const isValidate = firstName.length > 0 && client_lastName > 0 && register > 0 && client_lastName > 0;
class AddNegotation  extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName  : '',
      client_lastName   : '',
      register: '',
      statusName: 0,
      productID:'',
      product: {},
      products_count: 0,
      productNumber:'',
      loading: false,
      product_chooser: false,
    }
  }
  setStatus_Id(statusName){
    switch(statusName){
      case 'Амжилттай':
        return 2;
      case 'Цуцлагдсан':
        return 3;
      case 'Хүлээгдэж байгаа':
        return 1;
      default:
        return 0;
    }
  }
  componentDidMount() {
	  this.props.getMyComments()
	  //console.log(this.props.comments)
	}
  _alert(){
    Alert.alert('Мэдэгдэл', 'хийгдэж байна')
  }
  _onRefresh(){
    this.getMyComments()
  }

  onStatusChanged = (value) => {
      let statusName
      switch(value){
        case 'Амжилттай':
          statusName = 2;
          break
        case 'Цуцлагдсан':
          statusName = 3;
          break
        case 'Хүлээгдэж байгаа':
          statusName = 1;
          break
        default:
          statusName = 0;
          break
      }

      this.setState({ statusName })
  }
  formValidate(){
    if(this.state.firstName && this.state.client_lastName && this.state.register)
      return true;
    else
      return false;
  }
  InsertNegotation = () => {
    //alert('Working');
    const { NegotationData } = this.state
    if(this.formValidate()==true)
      this.props.onAddNegotation(this.state)
    else
      alert('Шаардлагатай талбаруудыг бөглөнө үү');
    
  }
  CommentItem = ({ item }) => {
    let { product_id, products_name, products_price, products_description, products_image,client_firstname } = item
    const { navigate } = this.props.navigation

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
          onPress={() => {
            this.setState({
              product: item,
              product_chooser: false,
            })
          }}
          style={{ flex:1/3, aspectRatio:1 }}>
          <View style={{ overflow: 'hidden', paddingBottom:15, justifyContent:'center', alignItems:'center' }}>
            <H4>{products_name}</H4>
            <View style={{ width: cardWidth, height: cardWidth, borderRadius: 10, overflow: 'hidden' }}>
              <Image
                style={{ flex: 1, width: null, height: null }}
                source={{ uri: 'http://124.158.124.60:8080/toilet/'+products_image+'' }} 
              />
              {
                this.state.product.products_id == item.products_id && (
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
            <H3>{products_price}</H3>
          </View>
        </TouchableHighlight>
      </CardView>
    )
  }

  _renderEmpty() {
    return <H3></H3>
  }

	render() {
    const { comments, loading } = this.props
    const { navigate } = this.props.navigation
    let statusData = [{
      value: 'Хүлээгдэж байгaa',
    }, {
      value: 'Амжилттай',
    }, {
      value: 'Цуцлагдсан',
    }];
    let productData = [{
      value: '1',
    }, {
      value: '2',
    }, ]
    // let productData = [{
    //   value: this.CommentItem.bind(this),
    // }];
    //let productsTempate = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((cur) => { value: cur })
    const MAX_PRODUCT_COUNT = 15
    let productsTempate = []
    for(let i = 1; i < MAX_PRODUCT_COUNT; i ++) {
      productsTempate.push({
        value: i,
      })
    }

		return (
      <Wrapper>
        <ScrollView style={styles.container}>
  			  <KeyboardAwareScrollView contentContainerStyle={styles.container2}
          resetScrollToCoords={{x:1,y:1}}
          scrollEnabled={false}>
            <View style={styles.inputContainer}>
                  <TextInput style={styles.inputs}
                      placeholder="Овог"
                      keyboardType="default"
                      underlineColorAndroid='transparent'
                      onChangeText={client_lastName => this.setState({client_lastName})}
                  />
            </View>  
            <View style={styles.inputContainer}>    
                  <TextInput style={styles.inputs}
                      placeholder="Нэр"
                      keyboardType="default"
                      underlineColorAndroid='transparent'
                      onChangeText={firstName => this.setState({firstName})}
                  />
            </View>
            <View style={styles.inputContainer}>
                  <TextInput style={styles.inputs}
                      placeholder="Регистэр"
                      keyboardType="default"
                      underlineColorAndroid='transparent'
                      onChangeText={register => this.setState({register})}
                  />
            </View>
            <View> 
            {/* tolow */}
            <Dropdown 
                style={[styles.dropdownButton, styles.rowText]}
                textStyle={styles.item}
                onChangeText={this.onStatusChanged}
                dropdownOffset={{top:5}}
                containerStyle={{borderWidth:1, borderColor:'lightgrey', borderRadius:30,width:250,backgroundColor:'#fff',marginBottom:20,height:45,
                }}
                rippleCentered={true}
                inputContainerStyle={{ borderBottomColor: 'transparent',marginLeft:16,
                 }}
                
                label='Хэлцэлийн төлөв'
                data={statusData}
            />
            </View>
            <View> 
              
                {/* Bvteegdhvvn */}
            <View style={styles.inputContainer}>
              <TouchableHighlight  style={styles.inputs2} onPress={() => this.setState({ product_chooser: true })}>
                <View>
                    {
                      _.isEmpty(this.state.product) ? (
                        <Text>Бүтээгдэхүүн сонгох</Text>   
                      ) : (
                        <Text>{this.state.product.products_name}</Text>
                      )
                    }
                </View>
              </TouchableHighlight>
              </View>
            </View>

            <View> 
            {/* tolow */}
              <Dropdown 
                  style={[styles.dropdownButton,styles.rowText]}
                  textStyle={styles.item}
                  onChangeText={(value) => this.setState({ products_count: parseInt(value) })}
                  dropdownOffset={{top:5}}
                  containerStyle={{borderWidth:1, borderColor:'lightgrey', borderRadius:30,width:250,backgroundColor:'#fff',marginBottom:20,height:45,
                  }}
                  rippleCentered={true}
                  inputContainerStyle={{ borderBottomColor: 'transparent',marginLeft:16,
                   }}
                  label='Тоо ширхэг'
                  data={productsTempate}
              />
            </View>
            
          {
            
            loading ? (
              <ActivityIndicator />
            ) : (
              
              <TouchableHighlight onPress={this.InsertNegotation} style={[styles.buttonContainer,styles.loginButton]}>
                <Text style={styles.loginText}>Хэлцэл үүсгэх</Text>
              </TouchableHighlight>
            )
          }
          
        </KeyboardAwareScrollView>
      </ScrollView>
      <Modal isOpen={this.state.product_chooser}>
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
          <FlatList
            contentContainerStyle={{
              backgroundColor: '#fff',
            }}
            numColumns={2}
            data={comments}
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
        </View>
      </Modal>
    </Wrapper>
		
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
      onAddNegotation: bindActionCreators(onAddNegotation, dispatch),
       getMyComments: bindActionCreators(getMyComments, dispatch),
      // navigate: this.props.navigation
    }
  }
)(AddNegotation)

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#fff',
    width:wp('100%'),
    height:hp('98%'),
  },
  container2: {
    paddingTop:'10%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdownButton: {
    flex: 1,
    
    fontSize:15
  },
  dropdownContainer: {
    height: 'auto',
    flexDirection: 'row',
    width:250,
    
  },
  

  inputContainer: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#fff',
    borderRadius:30,
    borderBottomWidth: 1,
    borderColor:'lightgrey',
    borderWidth:1,
    width:250,
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
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  width:250,
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
    padding: 10,
    margin: 10,
    // flex:1/3,
    borderRadius:10,
    alignContent: 'flex-end',
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
