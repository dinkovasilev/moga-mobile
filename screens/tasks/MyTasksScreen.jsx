import {React, useEffect, useState} from 'react'
import { View, Text, FlatList, StyleSheet, Pressable } from 'react-native'
import { GET } from '../../core/api';

export default function MyTasksScreen({navigation}) {
  
    const [tasklist, setTaskList] = useState([])

    const getMyTasks = async () => {
        const target = '/mytasks/'
        const responseData = await GET(target)
        setTaskList(responseData.context.tasks);
    };

    const renderListEmptyComponent = () => (
        <View style={styles.emptyListContainer}>
            <Text style={styles.noTaskFound}>
                Няма съдържание!
            </Text>
        </View>
    );

    useEffect(()=>{ getMyTasks()},[])

    return (
        <View style={styles.content}>
            <View>
                <Text style={styles.title}>Всички задачи в моето пространство</Text>
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
                            <Text > {task.task_type} </Text>
                            <Text > {task.name} </Text>
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
        paddingLeft: 4,
        borderColor: 'red',
        width: '100%',
        borderWidth: 2,
        backgroundColor: '#E8CCF6',
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

