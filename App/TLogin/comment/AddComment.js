import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import React from 'react'
import { View, Text, FlatList, RefreshControl,TouchableHighlight,StyleSheet,Alert, TextInput } from 'react-native'
import moment from 'moment'
import { Row, H2, H3, H4, Wrapper, Separator } from '../../Components'
import { onAddComment } from './CommentActions'

class AddComment extends React.Component {
	_alert(){
    Alert.alert('Мэдэгдэл', 'хийгдэж байна')
  }

  InsertComment = () => {
    // alert('Working');
    const { comment } = this.state
    this.props.onAddComment(comment,false)
    // const {customer_id} = this.state;
    // let token='eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTI0LjE1OC4xMjQuNjA6ODA4MC90b2lsZXQvYXBpL3VzZXIvbG9naW4iLCJpYXQiOjE1NTYyNjM4MTEsImV4cCI6MTU1NjI2NzQxMSwibmJmIjoxNTU2MjYzODExLCJqdGkiOiJpYUJXMmNNMU9ZaHZxcmZBIiwic3ViIjoxOSwicHJ2IjoiODdlMGFmMWVmOWZkMTU4MTJmZGVjOTcxNTNhMTRlMGIwNDc1NDZhYSJ9.7_qp_Yxi5KrgKdew50vBOuO7mpczBqEtn-QdmEAve78'
    // let customer_id='1';
    // let today=new Date().getDate();
    // let url='http://124.158.124.60:8080/toilet/api/comment/save_comment?token='+token+'&commend='+comment+'&customer_id='+customer_id+'&Date='+today;
    // console.log("url::=>"+url);

    // axios
    // .get(url, {
    //     comment
    // })
    // .then(res => {
    //   console.log(res)
    // })
    // .catch(e => {
    //   console.log('Error' + e);
    // })
  }

	render() {
		const { comments, loading } = this.props

		return (
			<Wrapper padding={20}>
        <View style={styles.inputContainer }>
          <TextInput style={styles.inputs}
            placeholder="Comment"
            onChangeText={comment => this.setState({comment})}
          />
        </View>
        <View>
          <TouchableHighlight onPress={this.InsertComment} style={styles.button}>
            <Text> Сэтгэгдэл нэмэх </Text>
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
     	onAddComment: bindActionCreators(onAddComment, dispatch),
       //navigate: bindActionCreators(NavigationActions.navigate, dispatch),
     }
   }
)(AddComment)

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
  inputContainer: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFF',
    borderRadius:30,
    borderBottomWidth: 1,
    marginBottom:20,
    flexDirection: 'row',
    alignItems:'center',
    flex:1
},
inputs:{
    borderBottomColor: '#DCDCDC',
    flex:1,
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
