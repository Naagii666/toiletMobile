import React, { Component } from 'react'
import { 
    ScrollView, 
    Text, 
    Image, 
    View, 
    KeyboardAvoidingView,
    Button, 
    TextInput,
    TouchableHighlight, 
    StyleSheet,
    Alert,
    AsyncStorage
  } from 'react-native'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
import Storage from 'react-native-storage';
import { Images } from '../../Themes'
import axios from 'axios'
import { setAuthenticationToken, setCustomerPicture } from '../../Services/storage'
import { setCustomerId } from '../../Services/storage'
import Icon from 'react-native-vector-icons/Entypo'

class LoginForm extends Component {

  constructor(props){
    super(props)
    this._onLoginFunction = this._onLoginFunction.bind(this)
    this.state = {
      email   : '',
      password: '',
      isLoggedIn: false,
      userData: {}
    }
  }

  // componentWillMount = () => {}

  _onLoginFunction = () => {
	  var form = new FormData();
    form.append("email", this.state.email);
    form.append("password", this.state.password);

    axios.post('http://124.158.124.60:8080/toilet/api/user/login',form)
      .then(response => {
        if(response.data.success) {
          console.log(JSON.stringify(response.data.data));
          let token = response.data.data.auth_token.toString();
          let customers_id = response.data.data.customers_id.toString();
          let customers_picture = response.data.data.picture;
          let customer_name = response.data.data.user_name;

          let userData = {
            name: response.data.data.name,
            email: response.data.data.email,
            auth_token: token,
            customers_id: customers_id
          }

          console.log('login userData ' + JSON.stringify(userData))
          // alert(userData);

          setAuthenticationToken(token)
          setCustomerId(customers_id)

          let appState = {
            isLoggedIn: true,
            userData: userData
          }

          this.setState({
            isLoggedIn: appState.isLoggedIn,
            user: appState.user
          });

          if(this.state.isLoggedIn) {
            this.props.navigation.navigate('Dashboard',{
              url: customers_picture,
              name: customer_name
            })
          } else {
            Alert.alert("Алдаа", "Хэрэглэгчийн мэйл/нууц үг буруу байна!");
          }
        }
      }).catch(error => {
          alert(error.message)
          console.log(error);
      });
  }

  render() {
    return (
      <ScrollView style={Loginstyles.container}>
        <KeyboardAwareScrollView contentContainerStyle={Loginstyles.container2}
        resetScrollToCoords={{x:0,y:0}}
        scrollEnabled={false}>
        <View style={Loginstyles.inputContainer}>
          <Icon name="mail" size={35} color="#f9ac19" />
          <TextInput style={Loginstyles.inputs}
              placeholder="Email"
              keyboardType="email-address"
              underlineColorAndroid='transparent'
              onChangeText={(email) => this.setState({email})}/>
        </View>
        
        <View style={Loginstyles.inputContainer}>
        <Icon name="key" size={35} color="#f9ac19"/>
          <TextInput style={Loginstyles.inputs}
              placeholder="Password"
              secureTextEntry={true}
              underlineColorAndroid='transparent'
              onChangeText={(password) => this.setState({password})}/>
        </View>
        <View style={Loginstyles.buttons}>
        <TouchableHighlight style={[Loginstyles.buttonContainer, Loginstyles.loginButton]} 
            onPress={(e) => this._onLoginFunction(e)}>
          <Text style={Loginstyles.loginText}>Нэвтрэх</Text>
        </TouchableHighlight>
        <TouchableHighlight style={[Loginstyles.buttonContainer, Loginstyles.loginButton]} 
            onPress={() => this.props.navigation.navigate('Register')}>
            <Text style={Loginstyles.loginText}>Бүртгүүлэх</Text>
        </TouchableHighlight>
        </View>
        
        <View style={Loginstyles.inputContainer1}>
          {/* <TouchableHighlight style={[Loginstyles.facebook, Loginstyles.loginButton]} 
              onPress={() => this.onClickListener('facebook_login')}>
            <Text style={Loginstyles.loginText}>Facebook нэвтрэх</Text>
          </TouchableHighlight>

          <TouchableHighlight style={[Loginstyles.fingerPrint]} 
              onPress={() => this.onClickListener('login')}>
            <Image style={Loginstyles.fingerIcon} source={Images.fingerPrint}/> */}
            {/* <Text style={Loginstyles.loginText}>Хур</Text> */}
          {/* </TouchableHighlight> */}
        </View>

        {/* <TouchableHighlight style={Loginstyles.buttonContainer} onPress={() => this.onClickListener('restore_password')}>
            <Text>Нууц үгээ мартсан?</Text>
        </TouchableHighlight> */}

        {/* <TouchableHighlight style={Loginstyles.buttonContainer} onPress={() => this.props.navigation.navigate('Register')}>
            <Text>Бүртгүүлэх</Text>
        </TouchableHighlight> */}
      </KeyboardAwareScrollView>
      </ScrollView>

    );
  }
}

const Loginstyles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#fff',
    width:wp('100%'),
    height:hp('98%'),
  },
  container2: {
    paddingTop:'30%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttons:{
    marginTop:'10%'
  },
  inputContainer: {
      borderBottomColor: '#F5FCFF',
      backgroundColor: '#FFFFFF',
      borderRadius:30,
      borderBottomWidth: 1,
      borderColor:'lightgrey',
      borderWidth:1,
      width:250,
      height:45,
      marginBottom:20,
      flexDirection: 'row',
      alignItems:'center',
      paddingLeft:10
  },
  inputContainer1: {
    width:250,
    height:45,
    marginBottom:15,
    flexDirection: 'row',
    alignItems:'center',
},
  inputs:{
      height:45,
      marginLeft:16,
      borderBottomColor: '#FFFFFF',
      flex:1,
  },
  inputIcon:{
    width:40,
    height:40,
    marginLeft:15,
    justifyContent: 'center',
  },
  fingerIcon:{
    width:40,
    height:40,
    marginLeft:10,
    justifyContent: 'center',
    // backgroundColor: 'black',
    borderRadius: 30,
  },
  buttonContainer: {
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:250,
    borderRadius:30,
  },
  facebook: {
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:200,
    borderRadius:30,
  },
  fingerPrint: {
    height:45,
    marginBottom:20,
    width:50,
    borderRadius:30,
    justifyContent: 'center',
  },
  loginButton: {
    backgroundColor: "#f9ac19",
  },
  loginText: {
    color: 'white',
  }
});

export default LoginForm