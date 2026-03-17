import {React, useEffect, useState, useCallback} from 'react'
import { useFocusEffect } from '@react-navigation/native';
import { View, Text, FlatList, StyleSheet, Pressable } from 'react-native'
import { GET } from '../../core/api';

export default function MyOwnTasksScreen({navigation}) {
  const [tasklist, setTaskList] = useState([])

  const getOwnTasks = async () => {
    const target = '/owntasks/'
    const responseData = await GET(target)
    setTaskList(responseData.context.tasks);
  };
  const renderListEmptyComponent = () => (
    <View style={styles.emptyListContainer}>
        <Text style={styles.noTaskFound}>
            Няма задачи в тази кутия!
        </Text>
    </View>
  );

  //useEffect(()=>{ getOwnTasks()},[])

  useFocusEffect(
    useCallback(() => {
      getOwnTasks();

      // Връщане на функция за почистване при излизане от фокуса
      return () => {
        // Почисти ако е нужно
      };
    }, []))

  return (
    <View style={styles.content}>
		<View>
			<Text style={styles.title}>Създадени от мен</Text>
		</View>
    <FlatList
		data={tasklist}
		ListEmptyComponent={renderListEmptyComponent} 
		renderItem={({ item:task }) => (
			<Pressable onPress={()=>{
				console.log('Детайли на задача')
				navigation.navigate('Детайли задача',{
					task:{task},
				})}}>
				<View style={styles.task}>
					<Text style={styles.label}> {task.task_type} </Text>
					<Text style={styles.label}> Заглавие: {task.name} </Text>
				</View>
			</Pressable>
		)}
	/>
    </View>
  )
}

const styles = StyleSheet.create({
  task:{
        paddingVertical:3,
        paddingLeft: 10,
        borderColor: 'blue',
        width: '100%',
        borderWidth: 2,
        backgroundColor: '#801EFF',
        fontSize: 14,
        borderRadius: 15,
        marginTop: 5,
  },
  label:{
        color: 'white',
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
  },
  emptyListContainer: {
    alignItems: 'center',
    justifyContent: 'center',
},
noTaskFound: {
    fontSize: 16,
    color:'white',
},
})

