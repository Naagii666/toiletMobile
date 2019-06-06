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
    Dimensions,
    PixelRatio,
    StatusBar,
  } from 'react-native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import axios from 'axios';
import styles from './../Styles/DashboardScreenStyles'
import Storage from 'react-native-storage';
import { Images } from '../../Themes/'
import CardView from 'react-native-cardview'
import Icon from 'react-native-vector-icons/FontAwesome'
import { 
    getCustomerId, 
    deleteCustomerId, 
    setAuthenticationToken,
    getAuthenticationToken, 
    deleteAuthenticationToken, 
    getCustomerPicture 
  } from '../../Services/storage'
const storage = new Storage({
  size: 1000,
  defaultExpires: 1000 * 3600 * 24,
  enableCache: true,
  storageBackend: AsyncStorage,
  sync: {
  }
});
const{
  width:SCREEN_WIDTH,
  height:SCREEN_HEIGHT,
}=Dimensions.get('window');

function fitSize(){
  if(SCREEN_WIDTH<500){
    return 70;
  }else{
    return 90;
  }
}
class Dashboard extends Component {

  constructor(props){
    super(props);
    // const { navigation } = this.props;
    this.state = {
      name: '',
      email: '',
      auth_token: '',
      url: '',
      cid: ''
    }

  }

  componentWillMount = () => {
      // this.fetchData();
  }

  componentDidMount = () => {
      this.props.navigation.setParams({ 
          onLogout: this.onLogout,
      });
      
      this.fetchData();
  }

  fetchData () {
      let id = null;
      // Alert.alert("","did did did");
      getCustomerId().then((value) => {
          id = value;
      })
      .then(res => {
          var cust_form = new FormData();
          cust_form.append("customer_id", id);
          axios.post('http://124.158.124.60:8080/toilet/api/user/view',cust_form)
              .then((response) => {
                  // setAuthenticationToken(response.data.data.auth_token)
                  this.props.navigation.setParams({
                      id: response.data.data.customers_id,
                      first_name: response.data.data.first_name,
                      img_url: response.data.data.picture
                  });
              }).catch(function(error){
                  alert(error.message);
                  console.log(JSON.stringify(error));
              });
      });
  }



  onLogout = () => {
    Alert.alert(
      '',
      'Та гарахдаа итгэлтэй байна уу',
      [
        {
          text: 'Үгүй',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'Тийм', onPress: () => {
          deleteAuthenticationToken(),
          deleteCustomerId(),
          this.props.navigation.navigate('MainScreen')
        }},
      ],
      { cancelable: false },
    );
    
  }

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;

    let id = params.id;

    // let BASE_URL = 'http://124.158.124.60:8080/toilet/' + url;
    let BASE_URL = 'http://124.158.124.60:8080/toilet/' + params.img_url;
    
    return {
      headerTitle: (
        <View style={{
          flex:1,
          overflow:'hidden', 
          justifyContent: 'space-between',
          flexDirection: 'row'
        }}>
          <TouchableOpacity 
              activeOpacity={0.6}
              onPress={() => navigation.navigate('profile', {
                  itemId: id,
                })
              }
            >
            <View style={{ justifyContent: 'center' }}>
              
              <Image 
                style={{
                  width:60,
                  height:60,
                  alignItems:'center',
                  borderRadius:20,
                  marginLeft:20,
                  marginRight: 20,
                  backgroundColor:'white'
                }}
                source={{uri: BASE_URL}}
              />

            </View>
            </TouchableOpacity>
            <View style={{flex: 1 ,justifyContent: 'center'}}>
              <Text style={{ fontSize: 19 } }>{ params.first_name }</Text>
              <Text style={{ fontSize: 12, color: '#fff' } } adjustFontSizeToFit  numberOfLines={1}> Менежер </Text>
            </View> 
          
         
          <View style={{ alignItems: 'flex-end' }}>
            <TouchableOpacity 
              activeOpacity={0.6}
              onPress={navigation.getParam('onLogout')}
            >
              <View style={{ margin:20, marginLeft:80, borderRadius: 5, paddingVertical: 10, paddingHorizontal: 20, backgroundColor: '#fff' }}>
                <Text>
                  Гарах
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      ),
      headerStyle:{
        backgroundColor: '#f9ac19',
        height:80
      },
      headerLeft: null,
      gesturesEnabled: false,
    }
  }

  render () {
    return (
      <CardView
        style={{ flex: 1, margin: 1,height:hp('100%'),width:wp('100%') }}
        cardElevation={7}
        cardMaxElevation={7}
      >
        <StatusBar
          backgroundColor="#f9ac19"
          barStyle="light-content"
        />
        <View style={styles.headerText}>
          <Text style={{marginTop:10, marginLeft:10, fontSize:20}}>Үндсэн цэс</Text>
        </View>

        <View style={styles.inputContainer1}>
          <TouchableHighlight style={[styles.facebook]} underlayColor={'transparent'}  
            onPress={() => this.props.navigation.navigate('Products')}>
            <View style={{alignItems: 'center'}}>
              {/* <Image style={{height:100, width:100}} source={Images.fashion} /> */}
              <Icon name='check-circle' size={fitSize()} color='#f9ac19' />
              <Text style={styles.loginText}>Загвар шалгах</Text>
            </View>
          </TouchableHighlight>
          
          <TouchableHighlight style={[styles.facebook]} underlayColor={'transparent'} 
            onPress={() => this.props.navigation.navigate('Negotation')}>
            <View>
              {/* <Image style={{height:100, width:100,}} source={Images.transaction} /> */}
              <Icon name='handshake-o' size={fitSize()} color='#f9ac19' />
              <Text style={styles.loginText}>Хэлцэл</Text>
            </View>
          </TouchableHighlight>
        </View>

        <View style={styles.inputContainer1}>
          <TouchableHighlight style={[styles.facebook]} underlayColor={'transparent'} 
            onPress={() => this.props.navigation.navigate('MonitorMaps')}>
            <View style={{alignItems: 'center'}}>
              {/* <Image style={{height:100, width:100}} source={Images.maps} /> */}
              <Icon name='map-marker' size={fitSize()} color='#f9ac19' />
              <Text style={styles.loginText}>Хяналтын {'\n'} самбар</Text>
            </View>
          </TouchableHighlight>

          <TouchableHighlight style={[styles.facebook]} underlayColor={'transparent'}  
            onPress={() => this.props.navigation.navigate('News')}>
            <View style={{textAlign: 'center'}}>
              {/* <Image style={{height:100, width:100}} source={Images.information} /> */}
              <Icon name='newspaper-o' size={fitSize()} color='#f9ac19' />
              <Text style={styles.loginText}>Мэдээллийн {'\n'} самбар</Text>
            </View>
          </TouchableHighlight>
        </View>

        <View style={styles.inputContainer1}>
          <TouchableHighlight style={[styles.facebook]} underlayColor={'transparent'}  
            onPress={() => this.props.navigation.navigate('Comment')}>
            <View>
              {/* <Image style={{height:100, width:100}} source={Images.comment} /> */}
              <Icon name='comments' size={fitSize()} color='#f9ac19' />
              <Text style={styles.loginText}>Сэтгэгдэл</Text>
            </View>
          </TouchableHighlight>

          <TouchableHighlight style={[styles.facebook]} underlayColor={'transparent'}  
            onPress={() => this.props.navigation.navigate('Help')}>
            <View>
              {/* <Image style={{height:100, width:100}} source={Images.help} /> */}
              <Icon name='bookmark' size={fitSize()} color='#f9ac19' />
              <Text style={styles.loginText}>Тусламж</Text>
            </View>
          </TouchableHighlight>
        </View>
      </CardView>
    );
  }
}

export default Dashboard