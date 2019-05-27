import React, { Component } from 'react'
import { View, Image, Text } from 'react-native'
import { createStackNavigator, createAppContainer } from 'react-navigation'
import LaunchScreen from '../TLogin/LaunchScreen'
import LoginScreen from '../TLogin/LoginScreen'
import CommentView from '../TLogin/comment/CommentView'
import AddComment from '../TLogin/comment/AddComment'
import NewsView from '../TLogin/news/NewsView'
import NewsDetial from '../TLogin/news/NewsDetial'
import NegotationDetial from '../TLogin/negotation/NegotationDetial'
import NewNegotation from '../TLogin/negotation/NewNegotation'
import ProductsView from '../TLogin/product/ProductsView'
import NegotationView from '../TLogin/negotation/NegotationView'
import AddNegotation from '../TLogin/negotation/AddNegotation'
import EditNegotiation from '../TLogin/negotation/EditNegotiation'
import Login from '../TLogin/LoginScreen/LoginForm'
import Register from '../TLogin/LoginScreen/Register'
import Dashboard from '../TLogin/Dashboard/Dashboard'
import FaCheck from '../TLogin/Dashboard/FaCheck'
import DetialFaCheck from '../TLogin/product/DetialFaCheck'
import MonitorMaps from '../TLogin/Dashboard/MonitorMaps'
import Help from '../TLogin/Dashboard/help'

import launchStyle from '../TLogin/Styles/LaunchScreenStyles'

import styles from './Styles/NavigationStyles'
import profile from '../TLogin/Profile/Profile'

// Manifest of possible screens
const PrimaryNav = createStackNavigator({
  LaunchScreen: {
    screen: LaunchScreen,
    navigationOptions: {
      header: null,
    }
   },
  Help: { screen: Help,
    navigationOptions: {
      headerTitle: 'Ашиглах заавар',
      headerStyle:{
        backgroundColor: '#f9ac19',
        color: 'white',
        size:10
      },
      headerTitleStyle:{
        color: 'white'
      },
      headerTintColor: 'white'
    },
  },
  MainScreen: {
    screen: LoginScreen,
    navigationOptions: {
      header: null,
    }
   },
  Comment: { screen: CommentView,
    navigationOptions: {
      headerTitle: 'Сэтгэгдэл',
      headerStyle:{
        backgroundColor: '#f9ac19',
        color: 'white',
        size:10
      },
      headerTitleStyle:{
        color: 'white'
      },
      headerTintColor: 'white'
    },
  },
  AddComment: { screen: AddComment,
      navigationOptions: {
      headerTitle: 'Сэтгэгдэл нэмэх',
      headerStyle:{
        backgroundColor: '#f9ac19',
        color: 'white',
        size:10
      },
      headerTitleStyle:{
        color: 'white'
      },
      headerTintColor: 'white'
    },
  },
  EditNegotiation: { screen: EditNegotiation,
    navigationOptions: {
    headerTitle: 'Хэлцэл засварлах',
    headerStyle:{
      backgroundColor: '#f9ac19',
      color: 'white',
      size:10
    },
    headerTitleStyle:{
      color: 'white'
    },
    headerTintColor: 'white'
    },
  },
  AddNegotation: { screen: AddNegotation,
    navigationOptions: {
    headerTitle: 'Хэлцэл нэмэх',
    headerStyle:{
      backgroundColor: '#f9ac19',
      color: 'white',
      size:10
    },
    headerTitleStyle:{
      color: 'white'
    },
    headerTintColor: 'white'
    },
  },
  News: { screen: NewsView,
    navigationOptions: {
      headerTitle: 'Мэдээ мэдээлэл',
      headerStyle:{
        backgroundColor: '#f9ac19',
        color: 'white',
        size:10
      },
      headerTitleStyle:{
        color: 'white'
      },
      headerTintColor: 'white'
    },
  },
  Products: 
    { screen: ProductsView,
    navigationOptions: {
      headerTitle: 'Бүтээгдэхүүн',
      headerStyle:{
        backgroundColor: '#f9ac19',
        color: 'white',
        size:10
      },
      headerTitleStyle:{
        color: 'white'
      },
      headerTintColor: 'white'
    },
  },
  Dashboard: {
    screen: Dashboard,
  },
  FaCheck: {
    screen: FaCheck,
    navigationOptions: {
      headerStyle:{
        backgroundColor: '#ff9900',
      },
      headerTitle: 'Загварууд',
      headerTintColor: 'white'
    }
  },
  DetialFaCheck: {
    screen: DetialFaCheck,
    navigationOptions: {
      headerTitle: 'Дэлгэрэнгүй',
      headerStyle:{
        backgroundColor: '#f9ac19',
        color: 'white',
        size:10
      },
      headerTitleStyle:{
        color: 'white'
      },
      headerTintColor: 'white'
    },
  },
  NegotationDetial: {
    screen: NegotationDetial,
    navigationOptions: {
      headerTitle: 'Дэлгэрэнгүй',
      headerStyle:{
        backgroundColor: '#f9ac19',
        color: 'white',
        size:10
      },
      headerTitleStyle:{
        color: 'white'
      },
      headerTintColor: 'white'
    },
  },
  NewsDetial: {
    screen: NewsDetial,
    navigationOptions: {
      headerTitle: 'Дэлгэрэнгүй',
      headerStyle:{
        backgroundColor: '#f9ac19',
        color: 'white',
        size:10
      },
      headerTitleStyle:{
        color: 'white'
      },
      headerTintColor: 'white'
    },
  },
  Negotation: {
    screen: NegotationView,
    navigationOptions: {
      headerStyle:{
        backgroundColor: '#ff9900',
      },
      title: 'Хэлцэл',
      // headerLeft: null,
      headerTintColor: 'white',
      gesturesEnabled: false,
    },
  },
  NewNegotation: {
    screen: NewNegotation,
    navigationOptions: {
      headerTitle: 'Шинэ хэлцэл',
      headerStyle:{
        backgroundColor: '#f9ac19',
        color: 'white',
        size:10
      },
      headerTitleStyle:{
        color: 'white'
      },
      headerTintColor: 'white'
    },
  },
  MonitorMaps: {
    screen: MonitorMaps,
    navigationOptions: {
      headerStyle:{
        backgroundColor: '#ff9900',
      },
      title: 'Google maps',
      headerTintColor: 'white',
      gesturesEnabled: false,
    },
  },
  Login: {
    screen: Login,
    navigationOptions: {
      headerStyle:{
        backgroundColor: "#f9ac19",
      },
      title: '',
      // headerLeft: null,
      headerTintColor: 'white',
      gesturesEnabled: false,
    },
  },
  // Comment: {
  //   screen: CommentView
  // },
  Register: {
    screen: Register,
    navigationOptions: {
      headerStyle:{
        backgroundColor: "#f9ac19",
      },
      title: '',
      // headerLeft: null,
      headerTintColor: 'white',
      gesturesEnabled: false,
    },
  },
  profile: {
    screen: profile,
    navigationOptions: {
      headerTitle: 'Хувийн мэдээлэл',
      headerStyle:{
        backgroundColor: "#f9ac19",
      },
      title: '',
      // headerLeft: null,
      headerTintColor: 'white',
      gesturesEnabled: false,
    },
  },
}, 
{
  // Default config for all screens
  // headerMode: 'none',
  initialRouteName: 'LaunchScreen',
  // initialRouteName: 'Dashboard',
  navigationOptions: {
    headerStyle: styles.header
  }
})

export default createAppContainer(PrimaryNav)
