import { View, Text, Image, TouchableOpacity } from "react-native"
import useGlobal from "../../core/global"


function ProfileLogout() {
	const logout = useGlobal(state => state.logout)

	return (
		<TouchableOpacity
			onPress={logout}
			style={{
				flexDirection: 'row',
				height: 52,
				borderRadius: 26,
				alignItems: 'center',
				justifyContent: 'center',
				paddingHorizontal: 26,
				backgroundColor: '#202020',
				marginTop: 40
			}}
		>

			<Text
				style={{
					fontWeight: 'bold',
					color: '#d0d0d0'
				}}
			>
				Logout
			</Text>
		</TouchableOpacity>
	)
}



function ProfileScreen() {
	const user = useGlobal(state => state.user)
	return (
		<View
			style={{
				flex: 1,
				alignItems: 'center',
				paddingTop: 100
			}}
		>


			<Text 
				style={{
					textAlign: 'center',
					color: '#303030',
					fontSize: 20,
					fontWeight: 'bold',
					marginBottom: 6
				}}
			>
				{user.username}
			</Text>
			<Text
				style={{
					textAlign: 'center',
					color: '#606060',
					fontSize: 14
				}}
			>
				@{user.username}
			</Text>

			<ProfileLogout />

		</View>
	)
}

export default ProfileScreen