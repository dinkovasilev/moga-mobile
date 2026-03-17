import { useLayoutEffect, useState } from "react"
import { 
	Keyboard,
	KeyboardAvoidingView,
	SafeAreaView, 
	Text, 
	TouchableWithoutFeedback, 
	View 
} from "react-native"

import Input from "../../components/Input"
import Logo from '../../components/Logo'
import Button from '../../components/Button'

import api from "../../core/api"
import utils from "../../core/utils"
import useGlobal from "../../core/global"


function LoginScreen({ navigation }) {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')

	const [usernameError, setUsernameError] = useState('')
	const [passwordError, setPasswordError] = useState('')

	const login = useGlobal(state => state.login)

	useLayoutEffect(() => {
		navigation.setOptions({
			headerShown: false
		})
	}, [])

	function onSignIn() {
		console.log('Влиза:', username, password)

		// Check username
		const failUsername = !username
		if (failUsername) {
			setUsernameError('Не е въведен потребител')
		}
		// Check password
		const failPassword = !password
		if (failPassword) {
			setPasswordError('Паролата не е въведена')
		}
		// Break out of this function if there were any issues
		if (failUsername || failPassword) {
			return
		}
		// Make signin request
		
		api({
			method: 'POST',
			url: '/login/',
			data: {
				username: username,
				password: password
			}
		})
		.then(response => {
			utils.log('Влизане:', response.data)
			
			const credentials = {
				username: username,
				password: password
			}
			login(
				credentials, 
				response.data.user,
				response.data.tokens
			)
		})
		.catch(error => {
			if (error.response) {
				console.log(error.response.data);
				console.log(error.response.status);
				console.log(error.response.headers);
			} else if (error.request) {
				console.log(error.request);
			} else {
				console.log('Error', error.message);
			}
			console.log(error.config);
		})
	}

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<KeyboardAvoidingView behavior="height" style={{ flex: 1 }}>
				<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
					<View 
						style={{ 
							flex: 1, 
							justifyContent: 'center',
							paddingHorizontal: 20
						}}
					>
						<Logo />

						<Input 
							title='Потребител'
							value={username}
							error={usernameError}
							setValue={setUsername}
							setError={setUsernameError}
						/>

						<Input 
							title='Парола' 
							value={password}
							error={passwordError}
							setValue={setPassword}
							setError={setPasswordError}
							secureTextEntry={true}
						/>

						<Button 
							title='Влез' 
							onPress={onSignIn} 
						/>

						<Text style={{ textAlign: 'center', marginTop: 40 }}>
                Нов профил? <Text 
								style={{ color: 'blue' }}
								onPress={() => navigation.navigate('Участвай')}
							>
								Участвай
							</Text>
						</Text>

					</View>
				</TouchableWithoutFeedback>
			</KeyboardAvoidingView>
		</SafeAreaView>
	)
}

export default LoginScreen