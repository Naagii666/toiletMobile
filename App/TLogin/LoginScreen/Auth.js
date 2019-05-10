import React from 'react'
import { View, Modal, KeyboardAvoidingView, StyleSheet, Button,ScrollView } from 'react-native'
import DebugConfig from '../../Config/DebugConfig'
import RoundedButton from '../../Components/RoundedButton'
import LoginForm from './LoginForm'
import Register from './Register';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import { createStackNavigator, createAppContainer } from 'react-navigation';

class Auth extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      showModal: false
    }
  }

  toggleModal = () => {
    this.setState({ showModal: !this.state.showModal })
  }

  render () {
    if (DebugConfig.showDevScreens) {
      return (
        <ScrollView>
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
          <View>
            {/* <RoundedButton onPress={ () => this.props.navigation.navigate('Login') }>
              Нэвтрэх
            </RoundedButton> */}

            <Button title="Нэвтрэх" onPress={ () => this.props.navigation.navigate('Login') } />

            <RoundedButton onPress={this.toggleModal}>
              Бүртгүүэх
            </RoundedButton>
            <Modal
              visible={this.state.showModal}
              onRequestClose={this.toggleModal}>
              {/* <PresentationScreen screenProps={{ toggle: this.toggleModal }} /> */}
            </Modal>
          </View>
        </KeyboardAvoidingView>
        </ScrollView>
      )
    } else {
      return <View />
    }
  }
}

class LoginScreen extends React.Component {
  render() {
    return (
      <ScrollView>
        <KeyboardAwareScrollView  
          contentContainerStyle={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} 
          resetScrollToCoords={{x:0,y:0}}
          scrollEnabled={false}
        >
      
        <Text>Details Screen</Text>
        <Button
          title="Go to Details... again"
          onPress={() => this.props.navigation.push('Details')}
        />
        <Button
          title="Go to Home"
          onPress={() => this.props.navigation.navigate('Home')}
        />
        <Button
          title="Go back"
          onPress={() => this.props.navigation.goBack()}
        />
      </KeyboardAwareScrollView>
      </ScrollView>
    );
  }
}

const RootStack = createStackNavigator(
  {
    Home: {
      screen: Auth,
    },
    Details: {
      screen: LoginScreen,
    },
  },
  {
    initialRouteName: 'Home',
  }
);

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#2c3e50',
  },
  loginContainer:{
      alignItems: 'center',
      flexGrow: 1,
      justifyContent: 'center'
  },
  logo: {
      position: 'absolute',
      width: 300,
      height: 100
  },
  title:{
      color: "#FFF",
      marginTop: 120,
      width: 180,
      textAlign: 'center',
      opacity: 0.9
  }
});