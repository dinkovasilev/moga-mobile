import { View, Text, Pressable, FlatList,
    StyleSheet, Button, 
    TouchableOpacity, Animated, } from 'react-native'
import React, { useState, useEffect, useCallback } from 'react'
import { useFocusEffect } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GET, POST } from '../../core/api';
import utils from '../../core/utils';

export default function TaskDetails({route, navigation}) {
const {task} = route.params.task;
const [response,setResponse] = useState('')
const [messages, setMessages] = useState([])
const [contentHeight, setContentHeight] = useState(0);
const [expanded, setExpanded] = useState(false);
const [animation] = useState(new Animated.Value(0));
const [selectedRating, setSelectedRating] = useState()

var data = {
   target_id : task.task_id,
   action : '',
}
var action = [];
var action_navigation

const toggleExpand = () => {
    Animated.timing(animation, {
        toValue: expanded ? 0 : 1,
        duration: 300,
        useNativeDriver: false
    }).start();
    setExpanded(!expanded);
};
const height = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, contentHeight],
    extrapolate: 'clamp',
  });

const getMessages = async ()=>{
    const target = '/task-messages/' + task.task_id
    const responseData = await GET(target)
    const messages = responseData.context.messages;
    setMessages(messages);
    action = []
}


switch(task.task_type){
    case 'ДИСКУСИЯ':
        action.push('НАПУСКАНЕ НА ДИСКУСИЯТА')
        action.push('ВЛЕЗ В ЧАТ')
        data.action = 'leave-discussion'
        action_navigation = 'Участия' 
        break
    case 'ЛЕКЦИЯ':          
        action.push('НАПУСКАНЕ НА ЛЕКЦИЯТА')
        action.push('ВЛЕЗ В ЧАТ')
        data.action = 'leave-lesson'
        action_navigation = 'Абонаменти' 
        break
    case 'БЕЛЕЖНИК':
        action.push('ИЗТРИЙ БЕЛЕЖНИКА')
        data.action = 'remove-note'
        action_navigation = 'Персонални' 
        break
    default: 
        action.push('ЗАВЪРШИ ЗАДАЧАТА')
        action.push('ОТКАЖИ ЗАДАЧАТА')
        action.push('ВЛЕЗ В ЧАТ')
        action_navigation = 'Участия' 
        break
}

const execute_action = async ()=>{  
    const target = '/task-action/'
    const response = await POST(target,data)
    setResponse(response.message)
    navigation.navigate(action_navigation)//'Избор задачи'
}

const message_vote = async ()=>{  
    console.log(data.action)
    const target = '/message-vote/'
    const response = await POST(target,data)
    setResponse(response.message)
    if (response.status === 200){
        for(let i=0;i<messages.length;i++){
            if (messages[i].message_id == data.target_id){
                messages[i].rating = response.rating
                setSelectedRating(response.rating)
                break
            }
        }
        
    }
}

const enter_chat = ()=>{
    console.log('CHAT: /task/' + task.task_id + '/')
    target = { 
        type:'task',
        id:task.task_id
    }
    navigation.navigate(action_navigation, {target:{target}})
}
//useEffect(()=>{ getMessages() },[])
useFocusEffect(
    useCallback(() => {
        getMessages();

      // Връщане на функция за почистване при излизане от фокуса
      return () => {
        // Почисти ако е нужно
      };
    }, []))
return (
   <SafeAreaView style={styles.content}>
        <TouchableOpacity onPress={toggleExpand}> 
            <View>
                <Text style={styles.title}> Натисни за {expanded ? 'по-малко': 'повече'} детайли</Text>
            </View>
        </TouchableOpacity>
        <Animated.View style={{ height, overflow: 'hidden' }}>
            <View 
                style={styles.info}
                onLayout={(event) => setContentHeight(event.nativeEvent.layout.height)}
                >
                <Text> {task.name} </Text>
                <Text> Тип: {task.task_type} </Text>
                <Text> Статус: {task.status}</Text>
                <Text> Категория: {task.category_name} </Text>
                <Text> Описание: {task.description} </Text>
                <FlatList
                    data={action}
                    renderItem={({ item }) => (
                        <Pressable onPress={()=>{
                            if (item == 'ВЛЕЗ В ЧАТ'){ 
                                action_navigation = 'Чат задачи'
                                {enter_chat()}
                            }
                            else {
                                if (item == 'ЗАВЪРШИ ЗАДАЧАТА'){ data.action = 'finish-task' }
                                if (item == 'ОТКАЖИ ЗАДАЧАТА'){ data.action = 'cancel-task' }
                                {execute_action()}
                            }
                            
                        }}>
                            <View style={styles.task}>
                                <Text style={{color:'white',fontSize: 12,}}> {item} </Text>
                            </View>
                        </Pressable>
                    )}
                />
            </View>
        </Animated.View>
        <Text style={styles.title}>Списък собщения</Text>
        <FlatList
            extraData={selectedRating}
            data={messages}
            keyExtractor={item => item.message_id}
            renderItem={({ item:message }) => (
               
                <View style={styles.message}>
                    <Text> {utils.format_django_datetime(message.message_time)} </Text>
                    <Text> {message.message_text} </Text>
                    {task.task_type !== 'БЕЛЕЖНИК'? 
                        <View style={styles.vote}>
                            <Pressable onPress={()=>{
                                    data.target_id = message.message_id
                                    data.action = 'vote-up'
                                    {message_vote()}
                                }}>
                                    <Text style={{
                                        ...styles.button,
                                        color:'white', 
                                        backgroundColor:'green'
                                    }}
                                    > 
                                        Да 
                                    </Text>
                            </Pressable>
                            <Text> Рейтинг: {message.rating} </Text>
                            <Pressable onPress={()=>{
                                    data.target_id = message.message_id
                                    data.action = 'vote-down'
                                    {message_vote()}
                                }}>
                                    <Text style={{
                                        ...styles.button,
                                        color:'white',
                                        backgroundColor:'red',
                                    }}
                                    > 
                                        Не </Text>

                            </Pressable>
                        </View>: '' }
                </View>
                
           )}
       />
        <Text style={styles.status}> {response} </Text>
        <Pressable onPress={()=>{

                {navigation.navigate('Ново съобщение',{
					task:{task}, back_route:'Детайли задача',
				})}
            }}>
                <Text style={{
                    ...styles.button,
                    color:'white',
                    backgroundColor:'red',
                }}
                > 
                    Ново съобщение </Text>

        </Pressable>
   </SafeAreaView>
)
}

const styles = StyleSheet.create({
task:{
    paddingVertical:5,
    paddingHorizontal:10,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: 'black',
    width: '100%',
    marginTop: 5,
    backgroundColor: '#0A509A',
    fontSize: 12,
},
vote:{
    flex:1,
    flexDirection:'row',
    alignContent:'space-between',
    justifyContent: 'center',
    paddingVertical:5,
    paddingHorizontal:10,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: 'black',
    width: '100%',
    marginTop: 5,
    borderWidth: 2,
    //backgroundColor: 'orange',
    fontSize: 12,
},
button:{
    paddingVertical:2,
    paddingHorizontal:10,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: 'black',
    width: '100%',
    backgroundColor: '#0A509A',
    fontSize: 10,
},
info:{
    borderColor: 'black',
    borderRadius: 10,
    borderWidth: 2,
    backgroundColor:'lightgreen',
    padding: 10,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
},
content:{
   flex:1,
   paddingHorizontal:20,
   justifyContent:'center',
   backgroundColor:'lightblue', 
   alignContent: 'center', 
},
title:{
   marginTop: 1,
   fontWeight: 'bold',
   textAlign: 'center',
   fontSize: 16,
},
status:{
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'red',
    fontSize: 16,
    marginBottom:5,
},
message:{
    paddingVertical:5,
    paddingHorizontal:10,
    borderColor: 'black',
    borderRadius: 10,
    borderWidth: 2,
    width: '100%',
    marginTop: 5,
    borderWidth: 2,
    backgroundColor: 'orange',
    fontSize: 14,
},
})