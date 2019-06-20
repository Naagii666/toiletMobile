import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import React from 'react'
import { View, Text, FlatList, RefreshControl, TouchableHighlight ,Image,StyleSheet, StatusBar} from 'react-native'
import moment from 'moment'
import { Row, H2, H3, H4,H5, Wrapper, Separator } from '../../Components'
import { getMyComments } from './NewsActions'
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
	newsImage(news_image){
        if(news_image!=''){
            return 'http://124.158.124.60:8080/toilet/'+news_image+''
		}else{
			return 'http://124.158.124.60:8080/toilet/resources/assets/images/news_images/1560142780.kisspng-computer-icons-instagram-icon-design-download-5ae173724580e2.3113791515247245942847.png'
		}
	}
	CommentItem ({ item }){
    let { news_name, news_date_added, news_description, news_slug, news_image } = item
		const { navigate } = this.props.navigation
    return (
			// <View style={{ marginHorizontal:10,paddingVertical:8, backgroundColor:"#fff"}}>
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
					<View style={styles.rowContainer}>
					<Image style={styles.thumb} source={{ uri: this.newsImage(news_image) }} />
						<View style={styles.textContainer}>
						<Text style={styles.newsName} numberOfLines={1}>{ news_name }</Text>
							<H3></H3>
						<Text style={styles.title} numberOfLines={1}>{ moment(news_date_added).format('YYYY-MM-DD hh:mm') }</Text>
						
						</View>
					</View>
				</TouchableHighlight>
				// </View>
    )
  }

	render() {
    const { comments, loading } = this.props
    const { navigate } = this.props.navigation

		return (

			<Wrapper >
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
					ItemSeparatorComponent={Separator}
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

const styles = StyleSheet.create({
  thumb: {
    width: 80,
    height: 80,
    marginRight: 10
	},
	textContainer: {
    flex: 1
	},
	rowContainer: {
    flexDirection: 'row',
    padding: 10
	},
	newsName: {
    fontSize: 18,
    // fontWeight: 'bold',
    color: 'black'
	},
	title: {
    fontSize: 14,
    color: '#656565'
  },
});
