import { View, Text, Pressable, FlatList,
         StyleSheet, Button, TextInput, 
         ImageBackground, ActionSheetIOS } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { POST } from '../../core/api';

export default function TaskTakeOrWait({route, navigation}) {
    const {item} = route.params.item;
    const [response,setResponse] = useState('')
    var target = '/task-action/'
    var data = {
        target_id : item.task_id,
        action : '',
    }
    var action= [];
    var action_navigation = ''
    
    switch(item.task_type){
        case 'ДИСКУСИЯ':
            action.push('ВЛИЗАНЕ В ДИСКУСИЯТА')
            action_navigation = 'Участия' 
            break
        case 'ЛЕКЦИЯ':          
            action.push('ЗАПИСВАНЕ ЗА ЛЕКЦИЯ')
            if(item.status == 'ЧАКАЩА'){
                action.push('ПРОВЕДИ ЛЕКЦИЯ')
            }
            
            break
        default: 
            if(item.status == 'ЧАКАЩА'){
                action.push('ИЗВЪРШИ ' + item.task_type)
            }
            action_navigation = 'Абонаменти' 
            break
    }
    
    if(item.status == 'АРХИВИРАНА'){
        data.action = 'history'
        action.push('ИСТОРИЯ')
        action_navigation = 'Абонаменти' 
    }
    const execute_action = async ()=>{  
        const response = await POST(target,data)
        setResponse(response.message)
        if (response.status == 200){
            navigation.navigate(action_navigation)
        }
        
    }
    return (
        <SafeAreaView style={styles.content}>
            <Text style={styles.title}> Детайли за задачата</Text>
            <View style={styles.info}>
                
                <Text> {item.name} </Text>
                <Text> Тип: {item.task_type} </Text>
                <Text> Статус: {item.status}</Text>
                <Text> Категория: {item.category_name} </Text>
                <Text> Описание: {item.description} </Text>
                <Text>{item.task_id}</Text>
            </View>
           
            <FlatList
                data={action}
                renderItem={({ item }) => (
                    <Pressable onPress={({target})=>{
                        console.log('Влизане задача')
                        if (item == 'ЗАПИСВАНЕ ЗА ЛЕКЦИЯ'){ 
                            data.action = 'add-listener' 
                            action_navigation = 'Абонаменти' 
                        }
                        else { 
                            data.action = 'take-mission' 
                            action_navigation = 'Участия'
                        };
                        {execute_action();}
                    }}>
                        <View style={styles.task}>
                            <Text> {item} </Text>
                        </View>
                    </Pressable>
                )}
            />
            <Text style={styles.status}> {response} </Text>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    task:{
          paddingVertical:5,
          paddingHorizontal:10,
          borderColor: 'black',
          width: '100%',
          marginTop: 5,
          borderWidth: 2,
          backgroundColor: '#eee8aa',
          fontSize: 14,
    },
    info:{
        paddingVertical: 20,
        borderColor: 'black',
        borderRadius: 20,
        width: '100%',
        borderWidth: 2,
        marginBottom: 20,
        marginTop: 10,
        backgroundColor:'lightgreen'
    },
    content:{
        flex:1,
        paddingHorizontal:20,
        justifyContent:'center',
        backgroundColor:'lightblue', 
        alignContent: 'center', 
    },
    title:{
        marginTop: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 16,
    },
    status:{
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'red',
        fontSize: 16,
        marginBottom:20,
    },
  })