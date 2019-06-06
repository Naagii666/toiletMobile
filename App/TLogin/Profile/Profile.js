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
import { setAuthenticationToken, getCustomerId } from '../../Services/storage'
import Icon from 'react-native-vector-icons/Entypo'

class Profile extends Component {

    constructor(props) {
      super(props);
      this._onChangePassFunction = this._onChangePassFunction.bind(this)
      state = {
        firstname : '',
        lastname : '',
        email   : '',
        phone: '',
        customer_id: '',
        loading: false,
        old_password: '',
        new_password: '',
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

    state = {
        //Assing a array to your pokeList state
        pokeList: [],
        //Have a loading state where when data retrieve returns data. 
        loading: true
    }
    //Define your componentDidMount lifecycle hook that will retrieve data.
    //Also have the async keyword to indicate that it is asynchronous. 
    componentWillMount(){
        const { navigation } = this.props;
        this.setState({customer_id : navigation.getParam('itemId', 'NO-ID')});
        // this.setState({customer_name : 'Test'});
        var cust_form = new FormData();
        cust_form.append("customer_id", navigation.getParam('itemId', 'NO-ID'));
        // cust_form.append("customer_id", getCustomerId());
        axios.post('http://124.158.124.60:8080/toilet/api/user/view',cust_form)
          .then((response) => {
              // setAuthenticationToken(response.data.data.auth_token)
              this.setState({firstname : response.data.data.first_name});
              this.setState({lastname : response.data.data.last_name});
              this.setState({email : response.data.data.email});
              this.setState({phone : response.data.data.phone});
              this.setState({customer_id : response.data.data.customers_id});
          }).catch(function(error){
              alert(error.message)
              console.log(JSON.stringify(error));
          });
    }

    _onChangePassFunction = () => {
      if(this.state.old_password && this.state.new_password){
        var form = new FormData();
        let id = null;
        getCustomerId().then((value) => {
          id = value;
        })
        form.append("cid", this.state.customer_id);
        form.append("old_password", this.state.old_password);
        form.append("new_password", this.state.new_password);
        axios.post('http://124.158.124.60:8080/toilet/api/user/changepass',form)
          .then(response => {
            if(response.data.success) {
              Alert.alert("Мэдээлэл", "Таны нууц үг солигдлоо.");
            }
            else{
              Alert.alert("Алдаа", response.data.data);
            }
          }).catch(error => {
            alert(error.message)
            console.log(error);
        });
      }
      else{
        Alert.alert("Мэдээлэл", "Та хуучин ба шинэ нууц үгийг оруулна уу.");
      }
      


      // axios.post('http://124.158.124.60:8080/toilet/api/user/login',form)
      //   .then(response => {
      //     if(response.data.success) {
      //       console.log(JSON.stringify(response.data.data));
      //       let token = response.data.data.auth_token.toString();
      //       let customers_id = response.data.data.customers_id.toString();
      //       let customers_picture = response.data.data.picture;
      //       let customer_name = response.data.data.user_name;

      //       let userData = {
      //         name: response.data.data.name,
      //         email: response.data.data.email,
      //         auth_token: token,
      //         customers_id: customers_id
      //       }

      //       console.log('login userData ' + JSON.stringify(userData))
      //       // alert(userData);

      //       setAuthenticationToken(token)
      //       setCustomerId(customers_id)

      //       let appState = {
      //         isLoggedIn: true,
      //         userData: userData
      //       }

      //       this.setState({
      //         isLoggedIn: appState.isLoggedIn,
      //         user: appState.user
      //       });

      //       if(this.state.isLoggedIn) {
      //         this.props.navigation.navigate('Dashboard',{
      //           url: customers_picture,
      //           name: customer_name
      //         })
      //       } else {
      //         Alert.alert("Алдаа", "Хэрэглэгчийн мэйл/нууц үг буруу байна!");
      //       }
      //     }
      //     else{
      //       Alert.alert("Алдаа", "Хэрэглэгчийн имэйл эсвэл нууц үг буруу байна!");
      //     }
      //   }).catch(error => {
      //       alert(error.message)
      //       console.log(error);
      //   });
    }
  
    render() {
      return (
        <ScrollView style={Loginstyles.container}>
        <KeyboardAwareScrollView  contentContainerStyle={Loginstyles.container2} 
        resetScrollToCoords={{x:1,y:1}}
        scrollEnabled={false}>

          <View style={Loginstyles.inputContainer} >
            
              <Icon name="v-card" size={32} color="#f9ac19" />
              <TextInput style={Loginstyles.inputsReadOnly}
                underlineColorAndroid='transparent'
                editable={false}
                selectTextOnFocus={false}
                value={this.state.firstname}/>
            
          </View>
          <View style={Loginstyles.inputContainer}>
            <Icon name="v-card" size={32} color="#f9ac19" />
            <TextInput style={Loginstyles.inputsReadOnly}
                underlineColorAndroid='transparent'
                editable={false}
                selectTextOnFocus={false}
                value={this.state.lastname}/>
          </View>
          
          <View style={Loginstyles.inputContainer}>
            <Icon name="email" size={32} color="#f9ac19" />
            <TextInput style={Loginstyles.inputsReadOnly}
                keyboardType="email-address"
                underlineColorAndroid='transparent'
                editable={false}
                selectTextOnFocus={false}
                value={this.state.email}/>
          </View>
  
          <View style={Loginstyles.inputContainer}>
            <Icon name="phone" size={32} color="#f9ac19" />
            <TextInput style={Loginstyles.inputsReadOnly}
                underlineColorAndroid='transparent'
                editable={false}
                selectTextOnFocus={false}
                value={this.state.phone}/>
          </View>

          <View style={Loginstyles.inputContainerinputsReadable}>
            <Icon name="key" size={32} color="#f9ac19" />
            <TextInput style={Loginstyles.inputsReadable}
                underlineColorAndroid='transparent'
                placeholder="Хуучин нууц үг"
                secureTextEntry={true}
                onChangeText={(old_password) => this.setState({old_password})}/>
          </View>

          <View style={Loginstyles.inputContainerinputsReadable}>
            <Icon name="key" size={32} color="#f9ac19" />
            <TextInput style={Loginstyles.inputsReadable}
                underlineColorAndroid='transparent'
                placeholder="Шинэ нууц үг"
                secureTextEntry={true}
                onChangeText={(new_password) => this.setState({new_password})}/>
          </View>
          
          <TouchableHighlight style={[Loginstyles.buttonContainer, Loginstyles.loginButton]} 
              onPress={(e) => this._onChangePassFunction(e)}>
            <Text style={Loginstyles.loginText}>Хадгалах</Text>
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
        backgroundColor: '#f7f7f7',
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
    inputsReadOnly:{
        height:45,
        marginLeft:16,
        borderBottomColor: '#FFFFFF',
        flex:1,
    },
    inputContainerinputsReadable: {
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
    inputsReadable:{
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