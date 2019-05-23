import { StyleSheet } from 'react-native'

export default StyleSheet.create({

    container: {
      flex: 1,
    //   justifyContent: 'center',
    //   alignItems: 'center',
      // backgroundColor: '#99ccff',
      backgroundColor: 'white',
      borderRadius:20,
      margin:10
    },
    headerText:{
      // borderTopLeftRadius:20,
      // borderTopRightRadius: 20,
      color:'black',
      // padding:25,
      //backgroundColor: '#d9d9d9',
      // alignItems: 'center',
    },
    inputContainer1: {
      flexDirection: 'row',
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    facebook: {
      // height:120,
      alignItems: 'center',
      marginBottom:20,
      // width:150,
      // marginLeft:10,
      // marginRight:10,
      flex:1,
      elevation: 1,
      padding: 20,
      marginLeft: 20,
      marginRight: 20,
      // borderRadius: 10,
      // shadowColor: '#000000',
      // shadowOffset: {
      //   width: 0,
      //   height: 3
      // },
      // shadowRadius: 5,
      // shadowOpacity: 1.0
    //   borderRadius:30,
    },
    fingerPrint: {
      height:45,
      marginBottom:20,
      width:50,
      borderRadius:30,
      justifyContent: 'center',
    },
    loginButton: {
      backgroundColor: "#ffa31a",
    },
    loginText: {
      color: 'black',
      textAlign: 'center',
    }
  });