import AsyncStorage from '@react-native-community/async-storage'

const USER_AUTHENTICATION_TOKEN = 'User_authentication_token'
const USER_ID = 'User_id'
const USER_PICTURE = 'User_picture'

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
	    const customers_id = await AsyncStorage.getItem(USER_PICTURE)
	    return customers_id
	} catch(e) {
	    // error reading value
	}
}

export async function deleteCustomerId() {
	try {
		await AsyncStorage.removeItem(USER_PICTURE)
	} catch(e) {
		
	}
}

export async function setPicture(customers_picture) {
	try {
		await AsyncStorage.setItem(USER_PICTURE, customers_picture)
	} catch (e) {
		//saving error
	}
}


export async function getPicture() {
	try {
	    const customers_picture = await AsyncStorage.getItem(USER_ID)
	    return customers_picture
	} catch(e) {
	    // error reading value
	}
}

export async function deletePicture() {
	try {
		await AsyncStorage.removeItem(USER_ID)
	} catch(e) {
		
	}
}

export async function setCustomerPicture(customers_picture) {
	try {
		await AsyncStorage.setItem(USER_PICTURE, customers_picture)
	} catch (e) {
		//saving error
	}
}


export async function getCustomerPicture() {
	try {
	    const customers_picture = await AsyncStorage.getItem(USER_PICTURE)
	    return customers_picture
	} catch(e) {
	    // error reading value
	}
}