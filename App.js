import React, { useEffect, } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {StatusBar, } from 'react-native'

import useGlobal from './core/global';

import { NavMain, NavProfile } from './components/Navigators';
import LoginScreen from './screens/player/LoginScreen';
import RegisterScreen from './screens/player/RegisterScreen';



const Stack = createNativeStackNavigator()


export default function App() {
	const initialized = useGlobal(state => state.initialized)
	const authenticated = useGlobal(state => state.authenticated)

	const init = useGlobal(state => state.init)

	useEffect(() => {
		init()
	}, [])

	return (
		<NavigationContainer>
			<StatusBar barStyle='dark-content' />
			<Stack.Navigator 
                screenOptions={{
                    headerShown: false,}}>

				{!initialized ? (
					<>
     				<Stack.Screen name="Profile" component={NavProfile} />
					</>
				) : !authenticated ? (
					<>
                        <Stack.Screen name="SignIn" component={LoginScreen} />
                        <Stack.Screen name="SignUp" component={RegisterScreen} />
					</>
                    ) : (
                        <>
                            <Stack.Screen name="Main" component={NavMain} 
                                screenOptions={{
                                    headerShown: false,}}/>
                        </>
                        )}
    	</Stack.Navigator>
		</NavigationContainer>
	)
}




/*
const navMainTab = createBottomTabNavigator();

export default function App() {
    const initialized = useGlobal(state => state.initialized)
	const authenticated = useGlobal(state => state.authenticated)

	const init = useGlobal(state => state.init)

	useEffect(() => {
		init()
	}, [])

	return (
		<NavigationContainer>
            
            <navMainTab.Navigator initialRouteName='start' screenOptions={{
                tabBarLabelPosition:'beside-icon',
                tabBarShowLabel: false,
                tabBarActiveTintColor: 'red',
				tabBarStyle:{
					backgroundColor: 'lightblue'
				},}}>
                    
                <navMainTab.Screen 
                    name='Старт' 
                    component={NavProfile} 
                    options={{
                        tabBarItemStyle:{padding: 5,},
                        
                        tabBarLabel:'Старт',
                        headerShown: false,
                        tabBarIcon: ({focused})=> <Ionicons name='home' 
                            focused={focused}
                            size={30} 
                            style={
                                { color: focused ? 'red' : 'grey' }
                        }/>,
                        }}/>
                <navMainTab.Screen 
                    name='Съдържание' 
                    component={NavContent} 

                    options={{
                        tabBarItemStyle:{padding: 5,},
						tabBarLabel:'Съдържание',
                        tabBarIcon: ({focused})=> <Ionicons name='list' 
                            focused={focused}
                            size={30} 
                            style={
                                { color: focused ? 'yellow' : 'grey' }
                        }/>,
                        headerStyle:{
                            backgroundColor: 'lightyellow',
                        },
                        headerTitleAlign: 'center'
                        }} />
                <navMainTab.Screen 
                    name='Аз' 
                    component={NavMySpace} 
                    options={{
						tabBarLabel:'Аз',
                        headerShown:false,
                        tabBarIcon: ({focused})=> <Ionicons name='person' 
                            focused={focused}
                            size={30} 
                            style={
                                { color: focused ? 'green' : 'grey' }
                        }/>,
                        }} />
                <navMainTab.Screen 
                    name='Известия' 
                    component={Notifications} 
                    options={{
                        tabBarItemStyle:{
                            //backgroundColor: 'lightgrey',
                            paddingLeft: 3,
                        },
                        headerTitleAlign: 'center',
						tabBarLabel:'Известия',
                        headerShown:true,
                        //tabBarActiveTintColor: 'red',
                        //tabBarActiveBackgroundColor: 'lightred',
                                
                        tabBarIcon: ({focused})=> <Ionicons 
                            focused={focused}
                            name='notifications' 
                            size={30}
                            style={
                                    { color: focused ? 'black' : 'grey' }
                            }
                            />,
                        }} />
            </navMainTab.Navigator>
        </NavigationContainer>
	)
}

*/


/*

*/
