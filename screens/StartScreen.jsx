import { Animated, Pressable, SafeAreaView, StatusBar, StyleSheet } from "react-native";

import Button from "../components/Button";
import Title from "../components/Title";
import { useEffect } from "react";

export default function Start({ navigation }){
    const fadeAnim = new Animated.Value(0);
    useEffect(()=>{
        Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 8000,
        useNativeDriver: true,
        }).start();
    },[])
    return(
        <SafeAreaView style={style_this.container}>
          
          <Animated.View style={[
            style_this.container,
            {
              opacity: fadeAnim,
            },
          ]}>

            <Pressable onPress={() => {
                  console.log(
                    'Стартов екран заглавие тап.'+
                    ' Ще бъде препратка към инструкции за употреба, ' + 
                    ' общи цели и управление на профила');
                  navigation.navigate('Списък');
                  }} >
                <Title 
                  text='МОГА' 
                  color='white' 
                /> 
            </Pressable>
          </Animated.View>
            
          <StatusBar barStyle='light-content'/>
          
        </SafeAreaView>
    )
}

const style_this = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'black',
      alignItems: 'center',
      justifyContent: 'center'
    },
  });


  /*

  

<Button 
							title='Влизане' 
							onPress={() => navigation.navigate('Влез')} 
					/>
          <Button 
							title='Участвай' 
							onPress={() => navigation.navigate('Участвай')} 
					/>

//логин от първия проект

  <Button
            mode="contained"
            onPress={() => navigation.navigate('Влез')}
          >
            Влизане
          </Button>
  <Button
        mode="outlined"
        onPress={() => navigation.navigate('Участвай')}
      >
        Участвай
      </Button>

  */