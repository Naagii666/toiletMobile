import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import CardView from 'react-native-cardview';

import React from 'react'
import { View, Image, FlatList,Dimensions, RefreshControl, TouchableHighlight, StatusBar } from 'react-native'
import moment from 'moment'
import { Row, H2, H3, H4, Wrapper } from '../../Components'
import { getMyComments } from './ProductsActions'
const { width } = Dimensions.get('window')
const cardWidth = (width / 2) - 40
class ProductsView extends React.Component {
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
    let { products_name, products_price, products_description, products_image } = item
    const { navigate } = this.props.navigation
    return (
      <CardView
        style={{ flex: 1}}
        cardElevation={7}
        cardMaxElevation={7}
        cornerRadius={10}
        margin={5}
      >
        <StatusBar
          backgroundColor="#f9ac19"
          barStyle="light-content"
        />
        <TouchableHighlight
          underlayColor={'transparent'}
          onPress={ () => navigate('DetialFaCheck',{
            name: products_name,
            price: products_price,
            definition: products_description,
            url: products_image,
          }) }
          style={{flex:1/3,aspectRatio:1}}>
          <View style={{paddingBottom:1,justifyContent:'center',alignItems:'center',padding:5}}>
            <H4 adjustFontSizeToFit numberOfLines={1}>{products_name}</H4>
            <Image
                style={{  width: cardWidth, height: cardWidth }}
                source={{ uri: 'http://124.158.124.60:8080/toilet/'+products_image+'' }} 
              />
          </View>
        </TouchableHighlight>
      </CardView>
    )
  }

	render() {
    const { comments, loading } = this.props
    const { navigate } = this.props.navigation

		return (

			<Wrapper style={{ width: cardWidth, height: cardWidth, borderRadius: 10, overflow: 'hidden' }}>
				<FlatList
					contentContainerStyle={{
						backgroundColor: '#fff',
					}}
					numColumns={2}
					data={comments}
					//data={[]}
          renderItem={this.CommentItem.bind(this)}
          removeClippedSubviews={false}
          keyExtractor={CommentItem => CommentItem.products_name}
					// ItemSeparatorComponent={Separator}
          ListEmptyComponent={this._renderEmpty}
          refreshControl={
            <RefreshControl
              refreshing={loading}
              onRefresh={this._onRefresh.bind(this)}
            />
          }
				/>
			</Wrapper>
		)
	}
}

export default connect(
  state => ({
      loading: state.products.getIn(['comment_list', 'loading']),
      comments: state.products.getIn(['comment_list', 'data']).toJS(),
  }),
  dispatch => {
    return {
      getMyComments: bindActionCreators(getMyComments, dispatch),
      // navigate: this.props.navigation
    }
  }
)(ProductsView)
