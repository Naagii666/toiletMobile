import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import React from 'react'
import { View, Text, FlatList, RefreshControl,TouchableHighlight,StyleSheet,Alert } from 'react-native'
import moment from 'moment'
import { Row, H2, H3, H4, Wrapper, Separator } from '../../Components'
import { getMyComments } from './CommentActions'

const CommentItem = ({ item, index }) => {
	let { comment, Date } = item

	return (
		<View style={{ paddingHorizontal: 20, }}>
			<Row justify='between'>
				<H4>
					Сэтгэгдэл
				</H4>
				<H4>
					{moment(Date).format('YYYY-MM-DD')}
				</H4>
			</Row>
			<View style={{ paddingTop: 10, }}>
				<H3>
					{comment}
				</H3>
			</View>
		</View>
	)
}

class CommentView extends React.Component {
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

	_alert(){
    Alert.alert('Мэдэгдэл', 'хийгдэж байна')
  }

	render() {
		const { comments, loading } = this.props

		return (
			<Wrapper padding={20}>
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
					data={comments}
					//data={[]}
					renderItem={CommentItem} 
					ItemSeparatorComponent={Separator}
					ListEmptyComponent={this._renderEmpty}
				/>
				<View>
				<TouchableHighlight onPress={ () => this.props.navigation.navigate('AddComment') } style={styles.button}>
            <Text> Сэтгэгдэл бичих </Text>
          </TouchableHighlight>
        </View>
			</Wrapper>
		)
	}
}


export default connect(
   state => ({
   	   loading: state.comment.getIn(['comment_list', 'loading']),
   	   comments: state.comment.getIn(['comment_list', 'data']).toJS(),
   }),
   dispatch => {
     return {
     	getMyComments: bindActionCreators(getMyComments, dispatch),
       //navigate: bindActionCreators(NavigationActions.navigate, dispatch),
     }
   }
)(CommentView)

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
