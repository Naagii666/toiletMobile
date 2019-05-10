import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import CardView from 'react-native-cardview'

import React from 'react'
import { View, Text, FlatList, RefreshControl, TouchableHighlight , StatusBar} from 'react-native'
import moment from 'moment'
import { Row, H2, H3, H4,H5, Wrapper, Separator } from '../../Components'
import { getMyComments } from './NewsActions'
import Icon from 'react-native-vector-icons/Entypo'
// import Icon from 'react-native-vector-icons/FontAwesome'

class NewsView extends React.Component {
	componentDidMount() {
	  this.props.getMyComments()
	  //console.log(this.props.comments)
	}

	_onRefresh() {
		this.props.getMyComments()
	}

	_renderEmpty() {
		return <H3>Мэдэгдэл алга байна.</H3>
	}

	CommentItem ({ item }){
    let { news_name, news_date_added, news_description, news_slug, news_image } = item
		const { navigate } = this.props.navigation
    return (
			<CardView
				style={{ flex: 1, margin:10, padding: 10}}
				cardElevation={7}
				cardMaxElevation={7}
				cornerRadius={15}
			>
				<StatusBar
					backgroundColor="#f9ac19"
					barStyle="light-content"
				/>
				<TouchableHighlight
					underlayColor={'transparent'}
					onPress={ () => navigate('NewsDetial', {
						news_name: news_name,
            news_slug: news_slug,
            news_description: news_description,
						news_date_added: news_date_added,
						url: news_image,
					}) }
					>
					<View style={{padding:5, flexDirection:'row'}}>
						<Icon name='mail' size={50} color='#f9ac19' />
						<View style={{paddingLeft: 10,justifyContent:'center'}}>
							<Text style={{fontWeight:'bold',color:'black'}}> { news_slug } </Text>
							<H4> { news_name } </H4>
							<Text style={{fontSize:10,paddingTop:10 ,color:'blue'}}> { moment(news_date_added).format('YYYY-mm-DD hh:mm') } </Text>
						</View>
					</View>
				</TouchableHighlight>
			</CardView>
    )
  }

	render() {
    const { comments, loading } = this.props
    const { navigate } = this.props.navigation

		return (

			<Wrapper padding={10}>
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
					// numColumns={3}
					data={comments}
					//data={[]}
          renderItem={this.CommentItem.bind(this)}
					removeClippedSubviews={false}
					// ItemSeparatorComponent={Separator}
					ListEmptyComponent={this._renderEmpty}
				/>
			</Wrapper>
		)
	}
}

export default connect(
   state => ({
   	   loading: state.news.getIn(['comment_list', 'loading']),
   	   comments: state.news.getIn(['comment_list', 'data']).toJS(),
   }),
   dispatch => {
     return {
     	getMyComments: bindActionCreators(getMyComments, dispatch),
       //navigate: bindActionCreators(NavigationActions.navigate, dispatch),
     }
   }
)(NewsView)
