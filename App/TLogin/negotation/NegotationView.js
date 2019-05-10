import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import CardView from 'react-native-cardview';

import React from 'react'
import { View, Text, FlatList, RefreshControl, TouchableHighlight, StyleSheet, Alert, StatusBar } from 'react-native'
import moment from 'moment'
import { Row, H2, H3, H4, Wrapper, Separator } from '../../Components'
import { getMyComments } from './NegotationActions'
import Icon from 'react-native-vector-icons/FontAwesome'
import NewNegotation from './NewNegotation'

function Color(statusName){
  switch(statusName){
    case 'Амжилттай':
      return '#8FC93A';
    case 'Цуцлагдсан':
      return '#ff0000';
    case 'Хүлээгдэж байгаа':
      return '#f9ac19';
    default:
      return 'white';
  }
}

class NegotationView extends React.Component {
	componentDidMount() {
	  this.props.getMyComments()
	  //console.log(this.props.comments)
	}

	_onRefresh() {
		this.props.getMyComments()
	}

	_renderEmpty() {
		return <H3></H3>
	}


  CommentItem ({ item }){
    let { 
      client_firstname, client_lastname, register, statusName, date,
      cityName, districtName, khorooName, productName, productImage, productPrice
    } = item
    
    const { navigate } = this.props.navigation
    return (
      <TouchableHighlight underlayColor={'#f2f2f2'}  onPress={ () => navigate('NegotationDetial',{
        client_firstname: client_firstname,
        client_lastname: client_lastname,
        register: register,
        statusName: statusName,
        date: date,
        cityName: cityName,
        districtName: districtName,
        khorooName: khorooName,
        productName: productName,
        productImage: productImage,
        productPrice: productPrice,
      }) } >
        <View style={{ paddingHorizontal: 10, }}>
          <View style={{flexDirection: 'row', flex:1}}>
            <Icon name='circle' size={60} color={Color(statusName)} style={{
                textShadowColor: '#dcdcdc',
                shadowOpacity: 0.4,
                shadowRadius: 5,
                textShadowOffset:{width: 1,height:5}
            }}/>

            <View style={{paddingLeft: 10, paddingTop:5,flex:1,flexDirection: 'row', justifyContent:'space-between',}}>
              <H3>
                Хэлцэл
              </H3>
              <H3>
                {moment(date).format('YYYY-MM-DD')}
              </H3>
            </View>
            <View style={{flexWrap: 'wrap',alignItems:'center',justifyContent:'center',flexDirection: 'row',flex:1}}>
              <Text> { client_firstname } </Text>
              <Text> { register } </Text>
              <Text> { statusName } </Text>
            </View>
          </View>
        </View>
      </TouchableHighlight>
    )
  }

  _newNegotation(){
    this.props.navigation.navigate('NewNegotation');
  }

	render() {
    const { comments, loading } = this.props
    const { navigate } = this.props.navigation

		return (
			<Wrapper padding={10}>
        <StatusBar
          backgroundColor="#f9ac19"
          barStyle="light-content"
        />
				<FlatList
					refreshControl={
						<RefreshControl
							refreshing={loading}
							onRefresh={this._onRefresh.bind(this)}
						/>
					}
					contentContainerStyle={{
						backgroundColor: '#fff',
					}}
					// numColumns={2}
					data={comments}
          renderItem={this.CommentItem.bind(this)}
					removeClippedSubviews={false}
					ItemSeparatorComponent={Separator}
          ListEmptyComponent={this._renderEmpty}
          keyExtractor={item => item.register}
				/>
        <View>
          <TouchableHighlight onPress={ () => navigate('AddNegotation') } style={styles.button}>
          {/* <TouchableHighlight onPress={ () => this._newNegotation() } style={styles.button}> */}
            <Text> Шинэ хэлцэл үүсгэх </Text>
          </TouchableHighlight>
        </View>
			</Wrapper>
		)
	}
}

export default connect(
  state => ({
      loading: state.negotation.getIn(['comment_list', 'loading']),
      comments: state.negotation.getIn(['comment_list', 'data']).toJS(),
  }),
  dispatch => {
    return {
      getMyComments: bindActionCreators(getMyComments, dispatch),
      // navigate: this.props.navigation
    }
  }
)(NegotationView)

const styles = StyleSheet.create({
  container:{
    flex: 1,
    margin:20,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  rowText:{
    flexDirection: 'row',
    // padding:10,
    fontSize:15,
    color:'#ff9900',
    justifyContent: 'space-between',
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
});
