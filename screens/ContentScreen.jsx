import { View, Text, Pressable, StyleSheet, Button, TextInput, ImageBackground } from 'react-native'
import React from 'react'

const Separator = () => <View style={styles.separator} />;
const contentImg = require('../assets/images/content-crossroad.jpeg')
export default function ContentScreen({navigation}) {

  return (
    <ImageBackground 
        source={contentImg} 
        style={{ flex:1, width: '100%', height: '100%',}}
    > 
    <View style={styles.container}>
      
        <Separator/>
        <View style={styles.search} >
            <TextInput
              style={styles.input}
              placeholder="Търсене в базата ..."
            />
            <Button title='Намери' 
              onPress={()=> console.log('Заявка за търсене')} 
              style={styles.button}/>
          </View>
          
          <Separator />       
          <Pressable onPress={() => {
                    console.log('Свободни задачи');
                    navigation.navigate('Свободни задачи');
                    }} 
                    style={({pressed}) => [
                      {
                        backgroundColor: pressed ? 'rgb(210, 230, 255)' : 'transparent',
                      },
                    ]}>
                    {({pressed}) => (
                      <Text 
                        style={styles.textLink}>
                          {pressed ? 'Приеми задача' : 'Разгледай задачи' }
                      </Text>
                    )} 
          </Pressable>
          <Separator />
          <Pressable onPress={() => {
                    console.log('Свободни желания');
                    navigation.navigate('Свободни желания');
                    }} 
                    style={({pressed}) => [
                      {
                        backgroundColor: pressed ? 'rgb(210, 230, 255)' : 'transparent',
                      },
                    ]}>
                    {({pressed}) => (
                      <Text style={styles.textLink}>{pressed ? 'Изпълни желание' : 'Разгледай желания' }</Text>
                    )}    
          </Pressable>
          <Separator />   
          <View style={styles.testbutton}>

          <Button 
                  title='ТЕСТ КОМПОНЕНТ'
                  onPress={()=> {
                    console.log('Тест  на категориите')
                    navigation.navigate('Тест на компонент')
                  }}
                  color={'black'}
                  
          />
          </View>
         
    </View>
    </ImageBackground> 
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    //justifyContent: 'center',
  },
  linkList:{
    alignItems:'left',
    padding: 20,
    paddingTop: 20,
    backgroundColor: 'gainsboro',
  },
  textLink:{
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
    borderColor: 'white',
    borderWidth: 1,
    paddingTop: 7,
    paddingBottom: 7,
    paddingLeft: 20,
    textShadowColor:'#585858',
    textShadowOffset:{width: 2, height: 2},
    textShadowRadius:10,
    //backgroundColor: 'transparent',//'blanchedalmond'
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  input: {
    fontSize: 14,
    fontWeight: 'bold',
    borderColor: 'black',
    borderWidth: 1,
    paddingTop: 7,
    paddingLeft: 10,
    width: '80%',
    height: 45,
    backgroundColor: 'blanchedalmond'
  },
  button: {
    fontSize: 14,
    fontWeight: 'bold',
    borderColor: 'black',
    borderWidth: 1,
    paddingTop: 7,
    width: '20%',
    height: 20,
  },
  testbutton:{
    borderColor: 'white',
    borderWidth: 2,
    width: '100%',
    height: 50,
    backgroundColor:'black',
    marginTop:'auto',
  },
  search: {
    flexDirection: 'row',
    textAlign: "left",
    display: 'flex',
    justifyContent: "space-between",
    alignItems: 'flex-start',
    width: '80%',
  }
})

