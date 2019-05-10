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
  FlatList,
} from 'react-native'
import axios from 'axios'
import { SearchBar } from 'react-native-elements'
import Storage from 'react-native-storage';
import { request } from '../../utils/api'
import { getAuthenticationToken } from '../../Services/storage'

const storage = new Storage({
  size: 1000,
  defaultExpires: 1000 * 3600 * 24,
  enableCache: true,
  storageBackend: AsyncStorage,
  sync: {
  }
});

class Negotation extends Component{

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
        user_name: ret.user_name,
        email: ret.email,
        definition: ret.definition,
        timestamp: ret.timestamp,
        auth_token: ret.auth_token
      });
      console.log('url2 '+ token);
      console.log('token2 '+ this.state.auth_token);
      let token = this.state.auth_token
      //let token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTAuNS4yMDEuMjQ6ODAwMC9hcGkvdXNlci9sb2dpbiIsImlhdCI6MTU1NDE2Mjc4MywiZXhwIjoxNTU0MTY2MzgzLCJuYmYiOjE1NTQxNjI3ODMsImp0aSI6InowOFZQTnY4NnpmdjN4S1ciLCJzdWIiOjEsInBydiI6Ijg3ZTBhZjFlZjlmZDE1ODEyZmRlYzk3MTUzYTE0ZTBiMDQ3NTQ2YWEifQ.SbmDKTUzYFBL3Ap2xV3Iiwkh2NKqnNAlgbVp4zS1xWk'
      axios.get('http://124.158.124.60:8080/toilet/api/negotations?token='+token+'')
      .then(response => {
        console.log(response);
        let resJson = response.data.data;
        this.setState({
          products: resJson
        });
        console.log(resJson);
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
          onPress={ () => this.props.navigation.navigate('DetialFaCheck') }
        >
        <View style={styles.renderItem}>
          <Image 
              style={styles.photo}
              source={{ uri: 'https://cdn.dribbble.com/users/1162077/screenshots/5940704/mushoom-boy-dribbble.png' }} />
          <View style={{flexDirection:'row'}}>
            <Text style={styles.ItemText}>{item.client_firstname}</Text>
            <Text style={styles.ItemText}>{item.register}</Text>
            <Text style={styles.ItemText}>Амжилттай</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    return(
      <View style={styles.container}>
        <View>
          <SearchBar 
            placeholder="Хайх үгээ оруул"
            onChangeText={this.updateSearch}
            value={this.state.search}
          />
        </View>

        <FlatList
          rowNums={1}
          data={this.state.products}
          renderItem={({item}) =>this.renderItem(item)}
          keyExtractor={(item) => item.id.toString()}
        />
        <TouchableOpacity onPress={ () => this.props.navigation.navigate('DetialFaCheck') } style={styles.button}>
          <Text style={{color:'white'}}>Шинэ хэлцэл үүсгэх</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  //   justifyContent: 'center',
  //   alignItems: 'center',
    backgroundColor: '#DCDCDC',
  },
  headerText:{
    fontSize:20,
    color:'black',
    alignItems:'center',
    padding:20,
    borderBottomWidth:1,
    borderBottomColor: 'black',
    marginBottom:10
  },
  ItemText: {
    alignItems: 'center',
    justifyContent: 'center',
    color: 'black',
    fontSize:20,
    margin:10
  },
  renderItem: {
    margin:5,
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'center',
  },
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#8E8E8E',
  },
  photo: {
    height: 40,
    width: 40,
    borderRadius: 20,
  },
  button: {
    // flex:1/5,
    height:50,
    justifyContent:'flex-end',
    justifyContent: 'center',
    marginBottom: 10,
    alignItems: 'center',
    backgroundColor: '#841584',
    // padding: 10,
    margin: 10,
    borderRadius:10
  },
});

export default Negotation