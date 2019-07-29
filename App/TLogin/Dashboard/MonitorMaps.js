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
  RefreshControl,
  Linking
} from 'react-native'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import { SearchBar } from 'react-native-elements'
import Storage from 'react-native-storage'
import MapView from 'react-native-maps'
import moment from 'moment'
import { colors } from '../../utils'

import { getFacebookComments } from '../negotation/NegotationActions'

class MonitorMaps extends Component{
  componentDidMount() {
    this.props.getFacebookComments()
  }

  onNavigateToFacebook = (url) => {
    Linking.openURL(url).catch((err) => console.error('An error occurred', err));
  }
  _onRefresh() {
    this.props.getFacebookComments()
  }
  _renderComment = ({ item, index }) => {
    let asSame = item.left

    return (
      <TouchableOpacity onPress={() => this.onNavigateToFacebook(item.PermalinkUrl)}>
        <View style={{ paddingVertical: 10, }}>
          <View style={[{ paddingHorizontal: 20 }, asSame == 0 ? { marginRight: 100 } : { marginLeft: 100 }]}>
            <View style={[asSame == 0 ? { backgroundColor: colors.gray, } : { backgroundColor: colors.dark_gray, }, { paddingVertical: 20, paddingHorizontal: 10, borderRadius: 5, }]}>
              <Text style={{ color: '#365899', fontWeight: 'bold', }}>{item.FromName}: </Text><Text style={{ color: colors.black }}>{item.Message}</Text>
            </View>
            <View style={[asSame == 0 ? { alignItems: 'flex-start' } : { alignItems: 'flex-end' }]}>
              <Text>{moment(item.CreateTime).fromNow()}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  render() {
    let { comments ,loading} = this.props
    let recomments = []
    comments.forEach((comment, i) => {
      if(i == 0) {
        recomments.push(Object.assign(comment, {
          prev: {},
          left: true,
        }))
        return
      }

      recomments.push(Object.assign(comment, {
        left: comments[i - 1].FromName == comment.FromName ? comments[i - 1].left : !comments[i - 1].left
      }))
    })

    return(
      <View style={{ flex: 1, }}>
        <FlatList
          refreshControl={
            <RefreshControl
              refreshing={loading}
              onRefresh={this._onRefresh.bind(this)}
            />
          } 
          inverted
          data={recomments}
          renderItem={this._renderComment}
        />
        {/*<MapView
          // provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          style={styles.map}
          region={{
            latitude: 47.919813,
            longitude: 106.929917,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}
        >
          <MapView.Marker
            coordinate={{
              latitude: 47.919813,
              longitude: 106.929917,
            }}
            title="1"
            description="2"
          />
        </MapView>*/}
        {/* <Text>texxt</Text> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: '100%',
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
 });

export default connect(
  state => ({
      loading: state.negotation.getIn(['facebook_comments', 'loading']),
      comments: state.negotation.getIn(['facebook_comments', 'data']).toJS(),
  }),
  dispatch => {
    return {
      getFacebookComments: bindActionCreators(getFacebookComments, dispatch),
      // navigate: this.props.navigation
    }
  }
)(MonitorMaps)