import AsyncStorage from '@react-native-community/async-storage'

const USER_AUTHENTICATION_TOKEN = 'User_authentication_token'

export async function setAuthenticationToken(token) {
    try {
	    await AsyncStorage.setItem(USER_AUTHENTICATION_TOKEN, token)
	} catch (e) {
	    // saving error
	}
}

export async function getAuthenticationToken() {
	try {
	    const token = await AsyncStorage.getItem(USER_AUTHENTICATION_TOKEN)
	    return token
	} catch(e) {
	    // error reading value
	}
}

export async function deleteAuthenticationToken() {
	try {
		await AsyncStorage.removeItem(USER_AUTHENTICATION_TOKEN)
	} catch(e) {
		
	}
}