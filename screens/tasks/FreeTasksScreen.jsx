import {React, useEffect, useState, useCallback} from 'react'
import { useFocusEffect } from '@react-navigation/native';
import { View, Text, FlatList, TextInput, ScrollView, StyleSheet, Pressable } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { GET } from '../../core/api';

export default function FreeTasksScreen({navigation}) {
  const [tasklist, setTaskList] = useState([])

  const getFreeTasks = async () => {
    const target = '/freetasks/'
    const responseData = await GET(target)
    setTaskList(responseData.context.tasks);
  };

  //useEffect(()=>{ getFreeTasks()},[])
  useFocusEffect(
    useCallback(() => {
      getFreeTasks();

      // Връщане на функция за почистване при излизане от фокуса
      return () => {
        // Почисти ако е нужно
      };
    }, []))  

  return (
    
    <SafeAreaView style={styles.content}>
		<View>
			<Text style={styles.title}>Списък на беседи, дискусии, задачи и желания</Text>
		</View>
		<FlatList
		data={tasklist}
		renderItem={({ item }) => (
			<Pressable onPress={()=>{
				navigation.navigate('Приемане на задачата',{
					item:{item},
				})}}>
				<View style={styles.task}>
					<Text> {item.name} </Text>
					<Text> Тип: {item.task_type} </Text>
					<Text> Статус: {item.status}</Text>
				</View>
			</Pressable>
		)}
		/>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  task:{
        paddingVertical:3,
        paddingLeft: 4,
        borderColor: 'grey',
        width: '100%',
        borderWidth: 2,
        backgroundColor: '#eee8aa',
        fontSize: 14,
        borderRadius: 15,
        marginTop: 5,
},
content:{
  flex:1,
  paddingHorizontal:20,
  justifyContent:'center',
  backgroundColor:'black', 
  alignContent: 'center', 
},
title:{
  marginTop: 20,
  fontWeight: 'bold',
  textAlign: 'center',
  fontSize: 16,
  color:'white',
}
})
