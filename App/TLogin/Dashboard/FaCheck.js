// Загвар шалгах
import React, { Component } from 'react'
import { 
  ScrollView, 
  Text, 
  Image, 
  View, 
  Button, 
  TextInput,
  TouchableOpacity, 
  StyleSheet,
  Alert,
  AsyncStorage,
  FlatList
} from 'react-native'
import axios from 'axios'
import { SearchBar } from 'react-native-elements'
import Storage from 'react-native-storage';
import styles from './../Styles/FaCheckScreenStyles'

const storage = new Storage({
  size: 1000,
  defaultExpires: 1000 * 3600 * 24,
  enableCache: true,
  storageBackend: AsyncStorage,
  sync: {
  }
});

class FaCheck extends Component{

  constructor(props){
    super(props);
    this.state = {
      user_name: '',
      email: '',
      definition: '',
      timestamp: '',
      auth_token: '',
      products: []
    }
  }
    
  componentWillMount = () =>{
    storage.load({
      key:'userData',
      autoSync: true,
      syncInBackground: true,
      syncParams: {
        someFlag: true
      }
    }).then(ret => {
      this.setState({
        user_name: ret.name,
        email: ret.email,
        definition: ret.definition,
        timestamp: ret.timestamp,
        auth_token: ret.auth_token
      });
      // console.log('url2 '+ token);
      // console.log('token2 '+ this.state.auth_token);
      let token = this.state.auth_token
      //let token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTAuNS4yMDEuMjQ6ODAwMC9hcGkvdXNlci9sb2dpbiIsImlhdCI6MTU1NDE2Mjc4MywiZXhwIjoxNTU0MTY2MzgzLCJuYmYiOjE1NTQxNjI3ODMsImp0aSI6InowOFZQTnY4NnpmdjN4S1ciLCJzdWIiOjEsInBydiI6Ijg3ZTBhZjFlZjlmZDE1ODEyZmRlYzk3MTUzYTE0ZTBiMDQ3NTQ2YWEifQ.SbmDKTUzYFBL3Ap2xV3Iiwkh2NKqnNAlgbVp4zS1xWk'
      axios.get('http://124.158.124.60:8080/toilet/api/products?token='+token+'')
      .then(response => {
        console.log(response);
        // let resJson = JSON.parse(JSON.stringify(response.data));
        let resJson = response.data.data;
        this.setState({
          products: resJson
        });
        console.log('products= ' + resJson);
      }).catch(error => {
        console.log(error);
      });
    }).catch(err => {
      console.warn(err.message);
      switch (err.name) {
        case 'NotFoundError':
          break;
        case 'ExpiredError':
          break;
      }
    });
  }

  updateSearch = search => {
    this.setState({ search });
  }

  renderItem(item) {
    return(
      <TouchableOpacity
          onPress={ 
            () => this.props.navigation.navigate('DetialFaCheck',{
              name: item.products_name,
              price: item.products_price,
              definition: item.products_description,
              url: item.products_image
          }) }
        style={{flex:1/3,aspectRatio:1}}>
        <Text style={styles.ItemText}>{item.products_name}</Text>
        {/* <Text style={styles.ItemText}>Fuck</Text> */}
        <Image 
            style={{width: '100%', height: '100%'}}
            source={{ uri: 'http://124.158.124.60:8080/toilet/'+item.products_image+'' }} />
        {/* <Image style={{flex: 1}} resizeMode='cover' source={{uri: 'https://png.icons8.com/message/ultraviolet/50/3498db'}} ></Image> */}
      </TouchableOpacity>
    );
  }

  render() {
    return(
      <View style={styles.container}>
        <View>
          <SearchBar
            style={styles.searchBar}
            placeholder="Хайх үгээ оруул"
            containerStyle={styles.searchcontainer}
            inputStyle={{backgroundColor: 'white'}}
            onChangeText={this.updateSearch}
            value={this.state.search}
          />
        </View>
        <View>
          <FlatList
            numColumns={3}
            data={this.state.products}
            renderItem={({item}) =>this.renderItem(item)}
            // keyExtractor={(item, index) => index}
          />
        </View>
      </View>
    );
  }
}

export default FaCheck