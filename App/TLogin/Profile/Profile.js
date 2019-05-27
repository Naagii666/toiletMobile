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
  } from 'react-native'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Images } from '../../Themes'
import axios from 'axios'
import { setAuthenticationToken } from '../../Services/storage'
import Icon from 'react-native-vector-icons/Entypo'

class Profile extends Component {

    constructor(props) {
      super(props);
      state = {
        firstname : '',
        lastname : '',
        email   : '',
        phone: '',
        loading: false,
      }
    }
  
    onClickListener = (viewId) => {
  
      var form = new FormData();
          form.append("firstname", this.state.firstname);
          form.append("lastname", this.state.lastname);
          form.append("email", this.state.email);
          form.append("phone", this.state.phone);
  
      axios.post('http://124.158.124.60:8080/toilet/api/user/view',form)
          .then((response) => {
              setAuthenticationToken(response.data.data.auth_token)
              var respEmail = response.data.data.email;
              this.setState({ loading: true })
              this.props.navigation.navigate('Dashboard')
              
          }).catch(function(error){
              alert(error.message)
              console.log(JSON.stringify(error));
          });
  
      //Alert.alert("Alert", "Button pressed "+viewId+this.state.email+this.state.password);
      //this.props.navigation.goBack(null);
    }
  
    render() {
      return (
        <ScrollView style={Loginstyles.container}>
        <KeyboardAwareScrollView  contentContainerStyle={Loginstyles.container2} 
        resetScrollToCoords={{x:1,y:1}}
        scrollEnabled={false}>

          <View style={Loginstyles.inputContainer} >
            
              <Icon name="firstname" size={32} color="#f9ac19" />
              <TextInput style={Loginstyles.inputs}
                placeholder="Name"
                underlineColorAndroid='transparent'
                onChangeText={(name) => this.setState({firstname})}/>
            
          </View>
          <View style={Loginstyles.inputContainer}>
            <Icon name="lastname" size={32} color="#f9ac19" />
            <TextInput style={Loginstyles.inputs}
                placeholder="Email"
                underlineColorAndroid='transparent'
                onChangeText={(email) => this.setState({lastname})}/>
          </View>
          
          <View style={Loginstyles.inputContainer}>
            <Icon name="email" size={32} color="#f9ac19" />
            <TextInput style={Loginstyles.inputs}
                placeholder="Password"
                keyboardType="email-address"
                underlineColorAndroid='transparent'
                onChangeText={(password) => this.setState({email})}/>
          </View>
  
          <View style={Loginstyles.inputContainer}>
            <Icon name="phone" size={32} color="#f9ac19" />
            <TextInput style={Loginstyles.inputs}
                placeholder="Password Confirmation"
                underlineColorAndroid='transparent'
                onChangeText={(password_confirmation) => this.setState({phone})}/>
          </View>
          
          <TouchableHighlight style={[Loginstyles.buttonContainer, Loginstyles.loginButton]} 
              onPress={() =>alert("go back")}>
            <Text style={Loginstyles.loginText}>Бүртгүүлэх</Text>
          </TouchableHighlight>
        </KeyboardAwareScrollView>
        </ScrollView>
      );
    }
  }

const Loginstyles = StyleSheet.create({
    container: {
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
    inputs:{
        height:45,
        marginLeft:16,
        borderBottomColor: '#FFFFFF',
        flex:1,
    },
    inputIcon:{
      width:30,
      height:30,
      marginLeft:15,
      justifyContent: 'center'
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
    loginButton: {
      backgroundColor: "#f9ac19",
    },
    loginText: {
      color: 'white',
    }
  });

export default Profile