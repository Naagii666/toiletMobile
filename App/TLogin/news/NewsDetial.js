// Загвар дэлгэрэнгүй
import React, { Component } from 'react'
import {
  Text, 
  Image, 
  View, 
  TouchableOpacity, 
  StyleSheet,
  Alert,
  ScrollView
} from 'react-native'

class NewsDetial extends Component{

  render() {
    const { navigation } = this.props;
    const news_name = navigation.getParam('news_name', 'some default value');
    const news_slug = navigation.getParam('news_slug', 'NO-ID');
    const news_description = navigation.getParam('news_description', 'some default value');
    const news_date_added = navigation.getParam('news_date_added', 'some default value');
    const url = navigation.getParam('url', 'some default value');
    const regex = /([&]nbsp[;])*(<.*?>)/ig;
    //let imageUrl = url;
    return(
        <ScrollView>
            <View style={styles.container}>
            <View>
                <Text style={{fontSize:18, color:'black'}}> {news_name} </Text>
            </View>
            <View style={styles.rowText}>
                {/* <Text style={{color:'#f9ac19',fontSize:16}}>{  }</Text> */}
                <View style={{flex: 1}}>
                    <Text style={{textAlign: 'left',color:'#f9ac19',fontSize:16}}> {news_date_added}</Text>
                </View>
            </View>
            <View>
                <Image 
                    style={[ url == '' ? { height: 0, } : { height: 400, width: '100%', }]}
                    source={{ uri: 'http://124.158.124.60:8080/toilet/'+url+'' }} />
            </View>
            <View style={{alignItems:'center',marginTop:20,flex: 1,flexWrap:'wrap'}}>
                <Text style={styles.definition}>{news_description.replace(regex,'')}</Text>
            </View>
            </View>
        </ScrollView>
    );
  }
}

export default NewsDetial

const styles = StyleSheet.create({
  container:{
    flex: 1,
    margin:20,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  rowText:{
    flexDirection: 'row',
    paddingTop:20,
    paddingBottom:20,
    fontSize:15,
    color:'#ff9900',
    justifyContent: 'space-between',
  },
  definition: {
    fontSize:15,
    color:'black',
    textAlign:'justify'
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
});