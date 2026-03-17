import React from 'react'
import { StyleSheet, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Text } from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';

import Start from '../screens/StartScreen';

import ContentScreen from '../screens/ContentScreen';

import TasksScreen from '../screens/tasks/TasksScreen';
import MyTasksScreen from '../screens/tasks/MyTasksScreen';
import TaskDetails from '../screens/tasks/TaskDetails';
import MyOwnTasksScreen from '../screens/tasks/MyOwnTasksScreen';
import MyExternTasksScreen from '../screens/tasks/MyExternTasksScreen';
import MyWaitingsTasksScreen from '../screens/tasks/MyWaitingsTasksScreen';
import CreateTaskScreen from '../screens/tasks/CreateTaskScreen';
import CategorySelector from '../screens/tasks/category_test';

import ItemsScreen from '../screens/items/ItemsScreen';
import MyItemsScreen from '../screens/items/MyItemsScreen';
import MyOwnWishesScreen from '../screens/items/MyOwnWishesScreen';
import WishesScreen from '../screens/items/WishesScreen';
import GiftsScreen from '../screens/items/GiftsScreen';

import PostScreen from '../screens/PostScreen';
import CreateMessageScreen from '../screens/postings/CreateMessage';

import FreeItemsScreen from '../screens/items/FreeItemsScreen';
import FreeTasksScreen from '../screens/tasks/FreeTasksScreen';
import TaskTakeOrWait from '../screens/tasks/TaskTakeOrWait';

import LoginScreen from '../screens/player/LoginScreen';
import RegisterScreen from '../screens/player/RegisterScreen';

import Notifications from '../screens/websockets/Notifications';
import ProfileScreen from '../screens/player/Profile';
import ChatSocket from '../screens/websockets/ChatScreen';


const navMySpaceTopTab = createMaterialTopTabNavigator();
const navContentStack = createNativeStackNavigator();
const navMyTaskStack = createNativeStackNavigator();
const navMyItemStack = createNativeStackNavigator();
const nvProfileStack = createNativeStackNavigator();
const navMainBottomTab = createBottomTabNavigator();

function NavProfile(){
	return (

		<nvProfileStack.Navigator initialRouteName='Статус' screenOptions={{
			headerShown: false,
		  	}}>
			
			<nvProfileStack.Screen 
				name='Статус' 
				component={ProfileScreen} 
				/>
			<nvProfileStack.Screen 
				name='Влез' 
				component={LoginScreen} 
			/>
			<nvProfileStack.Screen 
				name='Участвай' 
				component={RegisterScreen} 
			/>

		</nvProfileStack.Navigator>
	
	)
}

function NavMain(){
	return (
            
		<navMainBottomTab.Navigator 
			initialRouteName='Съдържание' 
			screenOptions={{
				headerShown: false,
				tabBarLabelPosition:'beside-icon',
				tabBarShowLabel: false,
				tabBarActiveTintColor: 'red',
				tabBarStyle:{
				backgroundColor: 'lightblue'
			},}}>
			
			<navMainBottomTab.Screen 
				screenOptions={{
                    headerShown: false,}}
				name='Съдържание' 
				component={NavContent} 

				options={{
					tabBarItemStyle:{padding: 5,},
					tabBarLabel:'Съдържание',
					tabBarIcon: ({focused})=> <Ionicons name='home' 
						focused={focused}
						size={30} 
						style={
							{ color: focused ? 'red' : 'grey' }
					}/>,
					headerStyle:{
						backgroundColor: 'lightyellow',
					},
					headerTitleAlign: 'center'
					}} 
			/>
					
			<navMainBottomTab.Screen 
				name='Мои' 
				component={NavMySpace} 
				options={{
					tabBarLabel:'Мои',
					headerShown:false,
					tabBarIcon: ({focused})=> <Ionicons name='apps' 
						focused={focused}
						size={30} 
						style={
							{ color: focused ? 'yellow' : 'grey' }
					}/>,
					}} 
			/>

			<navMainBottomTab.Screen 
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
								{ color: focused ? 'orange' : 'grey' }
						}
					/>,
				}} 
			/>
			<navMainBottomTab.Screen 
				name='Профил' 
				component={NavProfile} 
				options={{
					tabBarItemStyle:{padding: 5,},
					
					tabBarLabel:'Профил',
					headerShown: false,
					tabBarIcon: ({focused})=> <Ionicons name='person' 
						focused={focused}
						size={30} 
						style={
							{ color: focused ? 'green' : 'grey' }
						}/>,
				}}
			/>
		</navMainBottomTab.Navigator>
	)
}

function NavMySpace(){
	return(
		<navMySpaceTopTab.Navigator 
			initialRouteName='Мои задачи' 
			screenOptions={{
			
			tabBarIndicatorStyle:{
				backgroundColor: 'lightblue',
				height: 5,
			},
			tabBarStyle:{
				backgroundColor: 'lightyellow',
				height: 'auto',
			},
		}}>
			<navMySpaceTopTab.Screen 
					name='Мои желания' 
					component={NavMyItems} 
					options={{
						//tabBarItemStyle: styles.tabItem,
                        tabBarLabel:(focused) => 
							<Text 
								focused={focused}
								style={{
									...styles(focused).tabText,
									...styles(focused).tabWish
									}}>
									Желания
							</Text>,
						}} />
			
			<navMySpaceTopTab.Screen 
					name='Мои задачи' 
					component={NavMyTasks} 
					options={{
						//tabBarItemStyle: styles.tabItem,
                        tabBarLabel:(focused) => 
							<Text 
								focused={focused}
								style={{
									...styles(focused).tabText,
									...styles(focused).tabTask}}>
									Задачи
							</Text>,
						}} />
			
            <navMySpaceTopTab.Screen 
					name='Поща' 
					component={PostScreen} 
					options={{
						//tabBarItemStyle:styles.tabItem,
                        tabBarLabel:(focused) => 
							
								<Text 
								focused={focused}
								style={{
									...styles(focused).tabText,
									...styles(focused).tabPost}}>
								Поща
								</Text>,
						}} />
		</navMySpaceTopTab.Navigator>
	)
	
}

function NavMyTasks(){
	return (

		<navMyTaskStack.Navigator screenOptions={{
			headerShown: false,
		  	}}>
			<navMyTaskStack.Screen 
				name='Избор задачи' 
				component={TasksScreen} 
			/>
			<navMyTaskStack.Screen 
				name='Списък задачи' 
				component={MyTasksScreen} 
			/>
			<navMyTaskStack.Screen 
				name='Персонални' 
				component={MyOwnTasksScreen} 
			/>
			<navMyTaskStack.Screen 
				name='Участия' 
				component={MyExternTasksScreen} 
				/>
			<navMyTaskStack.Screen 
				name='Абонаменти' 
				component={MyWaitingsTasksScreen} 
				/>
			<navMyTaskStack.Screen 
				name='Чат задачи' 
				component={ChatSocket} 
				/>
			<navMyTaskStack.Screen 
				name='Нова задача' 
				component={CreateTaskScreen} 
				/>
			<navMyTaskStack.Screen 
				name='Детайли задача' 
				component={TaskDetails} 
				/>
			<navMyTaskStack.Screen 
				name='Ново съобщение' 
				component={CreateMessageScreen} 
				/>
		</navMyTaskStack.Navigator>
	
	)
}

function NavMyItems(){
	return (

		<navMyItemStack.Navigator screenOptions={{
			headerShown: false,
		  	}}>
			<navMyItemStack.Screen 
				name='Избор желания' 
				component={ItemsScreen} 
			/>
			<navMyItemStack.Screen 
				name='Списък желания' 
				component={MyItemsScreen} 
			/>
			<navMyItemStack.Screen 
				name='Персонални' 
				component={MyOwnWishesScreen} 
			/>
			<navMyItemStack.Screen 
				name='Искам' 
				component={WishesScreen} 
				/>
			<navMyItemStack.Screen 
				name='Давам' 
				component={GiftsScreen} 
				/>
		</navMyItemStack.Navigator>
	
	)
}

function NavContent(){
	return(
		<navContentStack.Navigator 
			// screenOptions={{
			// 	headerShown: false,
		  	// }}
		>
			<navContentStack.Screen 
				name='Начало' 
				component={Start} 
				/>
			<navContentStack.Screen 
				screenOptions={{
					headerShown: true,
					  }}
				name='Списък' 
				component={ContentScreen} 
			/>
			<navContentStack.Screen 
				name='Свободни желания' 
				component={FreeItemsScreen} 
			/>
			<navContentStack.Screen 
				name='Свободни задачи' 
				component={FreeTasksScreen} 
				/>
			<navContentStack.Screen 
				name='Приемане на задачата' 
				component={TaskTakeOrWait} 
				/>
			<navContentStack.Screen 
				name='Тест на компонент' 
				component={CategorySelector} 
				/>
		</navContentStack.Navigator>
	)

}

const styles = ({focused})=> StyleSheet.create({
	tabText:{
		fontSize: 14,
		fontWeight: 'bold',
		color: 'darkblue',
		borderColor: 'gold',
		borderTopLeftRadius: 20,
		borderBottomRightRadius: 20,
		borderWidth: 2,
		//backgroundColor: focused ? 'lightblue':'transparent'
	},
	tabTask:{
		backgroundColor: focused ? 'lightgreen':'transparent'
	},
	tabWish:{
		backgroundColor: focused ? 'pink':'transparent'
	},
	tabPost:{
		backgroundColor: focused ? '#37D1FF':'transparent'
	},
	tabItem:{
		width: 'auto',
	},
	separator: {
		marginVertical: 8,
		borderBottomColor: '#737373',
		borderBottomWidth: StyleSheet.hairlineWidth,
	  },
  })

export {
    NavContent,
    NavMySpace,
	NavMyTasks,
	NavMyItems,
	NavProfile,
	NavMain,
}


