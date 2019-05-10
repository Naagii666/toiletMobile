import React, { Component } from 'react'
import 
{ View, Text, FlatList, TextInput, RefreshControl, TouchableHighlight, StyleSheet, Alert, StatusBar, Image } 
	from 'react-native'
import axios from 'axios'
import { getAuthenticationToken, deleteAuthenticationToken } from '../../Services/storage'

class NewNegotation extends Component {

	constructor(props){
    super(props)
    this._onLoginFunction = this._onLoginFunction.bind(this)
    this.state = {
      client_lastname   : '',
      client_firstname: '',
      register: '',
      token: ''
    }
  }

  componentDidMount(){
    getAuthenticationToken()
      .then(token => {
        this.setState({ token: token })
    })
  }

  _onLoginFunction = () => {
	  var form = new FormData();
    form.append("client_lastname", this.state.client_lastname);
    form.append("client_firstname", this.state.client_firstname);
    form.append("register", this.state.register);
    form.append("products_id", '87');
    form.append("token", this.state.token);

    axios.post('http://124.158.124.60:8080/toilet/api/negotations',form)
    .then(response => {
      console.log(response)
      alert('hey')
      if(response.data.success) {
        alert('yes')
        // if(this.state.isLoggedIn) {
        //   this.props.navigation.navigate('Dashboard')
        // } else {
        //   Alert.alert("Алдаа", "Хэрэглэгчийн мэйл/нууц үг буруу байна!");
        // }
      }
    }).catch(error => {
        alert(error.message)
        console.log(error);
    });
  }

	render() {
		return(
			<View>
				<View style={Loginstyles.inputContainer}>
          <Image style={Loginstyles.inputIcon} source={{uri: 'https://png.icons8.com/message/ultraviolet/50/3498db'}}/>
          <TextInput style={Loginstyles.inputs}
              placeholder="Овог нэр"
              keyboardType="default"
              underlineColorAndroid='transparent'
              onChangeText={(client_lastname) => this.setState({client_lastname})}/>
        </View>

        <View style={Loginstyles.inputContainer}>
          <Image style={Loginstyles.inputIcon} source={{uri: 'https://png.icons8.com/message/ultraviolet/50/3498db'}}/>
          <TextInput style={Loginstyles.inputs}
              placeholder="Нэр"
              keyboardType="default"
              underlineColorAndroid='transparent'
              onChangeText={(client_lastname) => this.setState({client_lastname})}/>
        </View>
        
        <View style={Loginstyles.inputContainer}>
          <Image style={Loginstyles.inputIcon} source={{uri: 'https://png.icons8.com/message/ultraviolet/50/3498db'}}/>
          <TextInput style={Loginstyles.inputs}
              placeholder="Регистр"
              keyboardType="default"
              underlineColorAndroid='transparent'
              onChangeText={(register) => this.setState({register})}/>
        </View>

        <TouchableHighlight style={[Loginstyles.buttonContainer, Loginstyles.loginButton]} 
            onPress={(e) => this._onLoginFunction(e)}>
          <Text style={Loginstyles.loginText}>Хадгалах</Text>
        </TouchableHighlight>
			</View>
		)
	}
}

const Loginstyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DCDCDC',
  },
  inputContainer: {
      borderBottomColor: '#F5FCFF',
      backgroundColor: '#FFFFFF',
      borderRadius:30,
      borderBottomWidth: 1,
      width:250,
      height:45,
      marginBottom:20,
      flexDirection: 'row',
      alignItems:'center'
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
    backgroundColor: "#00b5ec",
  },
  loginText: {
    color: 'white',
  }
});

export default NewNegotation