import * as SecureStore from 'expo-secure-store'

async function set(key, object) {
	try { 
		await SecureStore.setItemAsync(key, JSON.stringify(object))
	} catch (error) {
		console.log('secure.set:', error)
	}
}

async function get(key) {
	try {
		const data = await SecureStore.getItemAsync(key)

		if (data !== undefined) {
			return JSON.parse(data)
		}
	 } catch (error) {
	 	console.log('secure.get:', error)
	}
}

async function remove(key) {
	try {
		await SecureStore.deleteItemAsync(key)//SecureStore.removeItem(key)
	} catch (error) {
		console.log('secure.remove:', error)
	}
}

async function wipe() {
	try {
		await SecureStore.deleteItemAsync('tokens')
		await SecureStore.deleteItemAsync('credentials')
	} catch (error) {
		console.log('secure.wipe:', error)
	}
}

export default { set, get, remove, wipe }