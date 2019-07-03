import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import CardView from 'react-native-cardview';
import _ from 'lodash'
import React from 'react'
import { View, Text, FlatList, RefreshControl, TouchableHighlight, StyleSheet, Alert, StatusBar } from 'react-native'
import moment from 'moment'
import { Row, H2, H3, H4, Wrapper, Separator } from '../../Components'
import { getMyComments, onSetSelectedNegotiation } from './NegotationActions'
import Icon from 'react-native-vector-icons/FontAwesome'
import NewNegotation from './NewNegotation'

function Color(status){
  switch(status){
    case 1:
      return '#CCCCCC';
    case 2:
      return '#FFFF33';
    case 3:
      return '#66FF00';
    case 4:
      return '#3399FF';
    default:
      return '#FF9999';
  }
}

function Status(status){
  switch(status){
    case 1:
      return 'Шинэ';
    case 2:
      return 'Хүлээгдэж байгаа';  
    case 3:
      return 'Үргэлжилж буй';
    case 4:
        return 'Дууссан';
    default:
      return 'Цуцлагдсан';  
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


  CommentItem ({ item }) {
    // let { 
    //   first_name, last_name, registry_number, status, date, phone, name,
    //   city_name, district_name, khoroo_name, products_name, products_image, total_price
    // } = item

    let { created_at, status,number } = item
    let { first_name, last_name, registry_number, phone } = item.customer
    //alert(created_at)
    
    const { navigate } = this.props.navigation
    return (
      <TouchableHighlight underlayColor={'#f2f2f2'}  onPress={() => {
        this.props.onSetSelectedNegotiation(item)
          navigate('NegotationDetial', { item }) 
        }}
      >
        <View style={{ paddingHorizontal: 10, }}>
          <View style={{flexDirection: 'row', flex:1}}>
            
            <Icon name='circle' size={60} color={Color(status)} style={{
                textShadowColor: '#dcdcdc',
                shadowOpacity: 0.4,
                shadowRadius: 5,
                
                textShadowOffset:{width: 1,height:5}
            }}/>
            <Text style={{ marginTop: 20,marginLeft:-45,color:'black' }}>{number}</Text>
            <View style={{ flex: 1, paddingHorizontal: 10, justifyContent: 'center' }}>
              <Row>
                  <H3> { first_name } </H3>
                  <H3> { last_name } </H3>
              </Row>
              <Text> { Status(status) } </Text>
            </View>
            <View style={{ paddingRight: 10, }}>
              <H3>
                {moment(created_at).format('YYYY-MM-DD')}
              </H3>
            </View>
          </View>
        </View>
      </TouchableHighlight>
    )
  }

  _newNegotation() {
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
          keyExtractor={(item, index) => String(index)}
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
      onSetSelectedNegotiation: bindActionCreators(onSetSelectedNegotiation, dispatch),
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
