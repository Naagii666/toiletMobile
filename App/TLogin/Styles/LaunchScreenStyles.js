import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles } from '../../Themes/'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    // paddingBottom: Metrics.baseMargin,
    flex: 1, backgroundColor: '#f9ac19',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignContent: 'flex-end',
    height: hp('100%'),
    width:wp('100%')
  },
  logo: {
    flex: 1, 
    height: null,
    width: null,
  },
  centered: {
    flex:1,
    // alignItems: 'center',
    // justifyContent: 'center'
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#4c4b48',
    //margin: 10,
    paddingTop: 20,
    paddingLeft:5,
    paddingRight:5,
    paddingBottom:20,
    flex: 1,
    borderRadius:10
  },
  register: {
    alignItems: 'center',
    backgroundColor: 'white',
    //margin: 10,
    paddingTop: 20,
    paddingLeft:5,
    paddingRight:5,
    paddingBottom:20,
    flex: 1,
    borderRadius:10,
  },
  registerText: {
    fontSize: 18,
    color: 'black',
    textAlign: 'center'
  },
  buttonText: {
    flex: 1,
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    flex:1
  },
  headerTitle: {
    overflow:'hidden', 
    justifyContent: 'space-between',
    flexDirection: 'row'
  }
})
