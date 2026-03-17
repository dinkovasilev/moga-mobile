import { StyleSheet, View, Text, Pressable, Image, ImageBackground, Button, ScrollView } from 'react-native'
import React from 'react'

const myTaskImg = require('../../assets/images/my-space-grass.jpeg')

const SEPARATOR = ({margin=20}) => <View style={styles(margin).separator} />;

export default function TasksScreen({navigation}) {
  return (
    <ImageBackground 
              source={myTaskImg} 
              style={{ flex:1, width: '100%', height: '100%',}}
    >
        <ScrollView style={{flexGrow:1}}>  
            <Pressable onPress={() => {
                    console.log('Списък задачи');
                    navigation.navigate('Списък задачи');
                    }} 
                    style={{marginTop:10,}}>
                    {({pressed}) => (
                        <Text 
                        style={
                            {...styles.textLink,
                            backgroundColor : pressed ? 'tomato': '#E8CCF6'}}>
                            ВСИЧКИ
                        </Text>
                    )} 
            </Pressable>

            <Pressable onPress={() => {
                    console.log('Лични задачи');
                    navigation.navigate('Персонални');
                    }} 
                    style={{marginTop:10,}}>
                    {({pressed}) => (
                        <Text 
                        pressed = {pressed}
                        style={
                            {...styles.textLink,
                            backgroundColor: pressed ? 'tomato' : '#801EFF',}}>
                            Персонални
                        </Text>
                    )}    
            </Pressable>

            <Pressable onPress={() => {
                    console.log('Участия в задачи');
                    navigation.navigate('Участия');
                    }} 
                    style={{marginTop:10,}}>
                    {({pressed}) => (
                        <Text 
                        pressed = {pressed}
                        style={
                            {...styles.textLink,
                            backgroundColor: pressed ? 'tomato' : '#7FDCEF',}}>
                            Участия
                        </Text>
                    )}    
            </Pressable>

            <Pressable onPress={() => {
                    console.log('Лекции и беседи');
                    navigation.navigate('Абонаменти');
                    }} 
                    style={{marginTop:10,}}>
                    {({pressed}) => (
                        <Text 
                        pressed = {pressed}
                        style={
                            {...styles.textLink,
                            backgroundColor: pressed ? 'tomato' : '#7CD9C1',}}>
                            Лекции и беседи
                        </Text>
                    )}    
            </Pressable>
            
            <Pressable onPress={() => {
                    console.log('ЧАТ');
                    navigation.navigate('Чат задачи');
                    }} 
                    style={{marginTop:10,}}>
                    {({pressed}) => (
                        <Text 
                        pressed = {pressed}
                        style={
                            {...styles.textLink,
                            backgroundColor: pressed ? 'tomato' : '#ccffe5',}}>
                            ЧАТ
                        </Text>
                    )}    
            </Pressable>
                
        <View style={styles.newtaskbutton}>
            
            <Button 
                title='Нова задача'
                onPress={()=> {
                console.log('Заявка за нова задача')
                navigation.navigate('Нова задача')
                }}
                color={'red'}
                
            />
        </View>
        </ScrollView>
    </ImageBackground>
  )
}


const styles =  StyleSheet.create({
  textLink:{
    color: 'white',
    fontSize: 20,
    fontWeight: 'condensed',
    borderColor: 'grey',
    borderWidth: 2,
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 50,
    textShadowColor:'#404040',
    textShadowOffset:{width: 3, height: 4},
    textShadowRadius:10,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 60,
    borderTopLeftRadius: 60,
    borderBottomLeftRadius: 5,
    
  },
  newtaskbutton:{
    alignItems: 'flex-end',
    //paddingRight: '5%',
    paddingTop: 50,
  },
})
