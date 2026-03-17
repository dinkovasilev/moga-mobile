import { StyleSheet, View, Text, Pressable, Image, Button, ImageBackground, ScrollView } from 'react-native'
import React from 'react'

const myWishImg = require('../../assets/images/wish-sky.jpeg')

const SEPARATOR = ({margin=20}) => <View style={styles(margin).separator} />;

export default function ItemsScreen({navigation}) {
  return (


    <ImageBackground source={myWishImg} style={{width:'100%', height: '100%'}}>
    <ScrollView style={{flexGrow:1,}}>  
        <Pressable onPress={() => {
                  console.log('Списък желания');
                  navigation.navigate('Списък желания');
                  }} 
                  style={{marginTop:10,}}>
                  {({pressed}) => (
                    <Text 
                      style={
                        {...styles.textLink,
                          backgroundColor : pressed ? 'tomato': '#85DF9D'}}>
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
                          backgroundColor: pressed ? 'tomato' : '#F9F463',}}>
                        Персонални
                    </Text>
                  )}    
        </Pressable>

        <Pressable onPress={() => {
                  console.log('Желания мои и чужди');
                  navigation.navigate('Искам');
                  }} 
                  style={{marginTop:10,}}>
                  {({pressed}) => (
                    <Text 
                      pressed = {pressed}
                      style={
                        {...styles.textLink,
                          backgroundColor: pressed ? 'tomato' : '#E8B546',}}>
                        Искам
                    </Text>
                  )}    
        </Pressable>

        <Pressable onPress={() => {
                  console.log('Подаръци');
                  navigation.navigate('Давам');
                  }} 
                  style={{marginTop:10,}}>
                  {({pressed}) => (
                    <Text 
                      pressed = {pressed}
                      style={
                        {...styles.textLink,
                          backgroundColor: pressed ? 'tomato' : '#BC0000',}}>
                        Давам
                    </Text>
                  )}    
        </Pressable>

          
            
            <View style={styles.newitembutton}>
              
                <Button 
                  title='Ново желание'
                  onPress={()=> console.log('Заявка за ново желание')}
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
    paddingTop: 25,
    paddingBottom: 25,
    paddingLeft: 50,
    textShadowColor:'#404040',
    textShadowOffset:{width: 3, height: 4},
    textShadowRadius:10,
    borderBottomRightRadius: 60,
    borderTopLeftRadius: 60,
    borderBottomLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  newitembutton:{
    alignItems: 'flex-end',
    //paddingRight: '5%',
    paddingTop: 50,
  },
})
