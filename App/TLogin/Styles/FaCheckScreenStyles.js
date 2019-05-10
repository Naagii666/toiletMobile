import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    container: {
        flex: 1,
    //   justifyContent: 'center',
    //   alignItems: 'center',
        backgroundColor: '#DCDCDC',
        margin:10
    },
    headerText:{
        fontSize:20,
        color:'black',
        alignItems:'center',
        padding:20,
        borderBottomWidth:1,
        borderBottomColor: 'black',
        marginBottom:10
    },
    ItemText: {
        alignItems: 'center',
        justifyContent: 'center',
        color: 'black',
        fontSize:15,
    },
    searchBar: {
        width: "90%",
        borderWidth:0, //no effect
        shadowColor: 'white', //no effect
    },
    searchcontainer: {
        backgroundColor: 'white',
        borderWidth: 0, //no effect
        shadowColor: 'white', //no effect
        borderBottomColor: 'transparent',
        borderTopColor: 'transparent'
    }
});