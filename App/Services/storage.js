import AsyncStorage from '@react-native-community/async-storage'

const USER_AUTHENTICATION_TOKEN = 'User_authentication_token'
const USER_ID = 'User_id'

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

export async function setCustomerId(customers_id) {
	try {
		await AsyncStorage.setItem(USER_ID, customers_id)
	} catch (e) {
		//saving error
	}
}


export async function getCustomerId() {
	try {
	    const customers_id = await AsyncStorage.getItem(USER_ID)
	    return customers_id
	} catch(e) {
	    // error reading value
	}
}

export async function deleteCustomerId() {
	try {
		await AsyncStorage.removeItem(USER_ID)
	} catch(e) {
		
	}
}