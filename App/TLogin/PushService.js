import PushNotification from 'react-native-push-notification'
import { isNil } from 'lodash'
// import Config from '../config'
// import { isAndroid } from '../helpers/platform'

export default class PushService {
  static init() {
    PushService.onNotification = (notification) => {
      if ((!isNil(notification.subject) && notification.subject !== '')) {
        PushNotification.localNotification({
          title: 'notification.subject',
          message: 'notification.body',
        })
      }
    }
    PushService.onRegistration = null
    PushService.tab = null
  }

  static setCallbacks(onRegistration, onNotification) {
    PushService.onRegistration = onRegistration
    PushService.onNotification = onNotification
  }

  static configure() {
    PushNotification.configure({
      // onRegister: (device) => {
      //   if (PushService.onRegistration) {
      //     PushService.onRegistration(device)
      //   }
      // },
      onNotification: (notification) => {
        if (PushService.onNotification) {
          PushService.onNotification(notification)
        }
      },
      // senderID: Config.androidPushSenderId,
      // requestPermissions: true
    })
  }
}

PushService.init()