import { useState, useEffect } from "react";
import { 
    Text, View,
    TextInput, Button, 
    StyleSheet, ScrollView,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    SafeAreaView, } from "react-native";
import React from 'react';
import { GET, POST } from "../../core/api";

export default function CreateMessageScreen({route,navigation}){
    const {task} = route.params.task;
    const back_route = route.params.back_route
    const [message, setMessage] = useState('')
    const [errors, setErrors] = useState({})

    const validateForm = ()=>{
        let errors = {}
        if(!message){errors.message = 'Въведи съдържание!'}
        setErrors(errors)
        return Object.keys(errors).length === 0
    }
    const handleSubmit = async () => {
        const target = '/create-message/';
        const formData = { 
            message, 
            target_type : 'task',
            target_id: task.task_id,
        };
        console.log('Зявка за изпращане на съобщение') 
        console.log(formData)
        response = await POST(target,formData)
        if (response.status == 200){
            navigation.navigate('Детайли задача', {task:{task},})
        }
        
    }
    return (
        <SafeAreaView>
        <View style={styles.container}>
            <Text style={styles.label}>Съобщение</Text>
            <TextInput 
                multiline={true}
                numberOfLines={20}
                placeholder=" Въведи съобщение...."
                value={message}
                onChangeText={setMessage} 
                style={styles.input}>
            </TextInput>
            {errors.message ? (<Text style={styles.error}>{errors.message}</Text>):null}
        </View>
        <View style={styles.submit}>
        <Button title="Изпрати" 
            onPress={()=>{
                if (validateForm()){
                    handleSubmit()
                }
                else {console.log('Невалидна заявка')}
            }}/>
        </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    title:{
            fontSize: 24,
            fontWeight: 'bold',
            alignContent:'flex-end',
            paddingTop: 7,
            paddingBottom: 1,
            paddingLeft: 10,
    },
    form:{
            paddingVertical: 10,
            paddingHorizontal: 10,
            justifyContent:'center',
            //backgroundColor:'#DFF67C',
            borderRadius: 10,
            shadowColor: '#8b0000',
            shadowOffset:{width:0,height:3},
            shadowOpacity:0.25,
            elevation: 5,
    },
    input:{
            paddingVertical:3,
            paddingLeft: 4,
            borderColor: 'black',
            width: '100%',
            borderWidth: 2,
            backgroundColor: '#eee8aa',
            textAlign:'left',
            textAlignVertical:'top',
    },
    submit:{
            marginTop:'auto',
            paddingBottom: 10,
            paddingLeft:50,
            paddingRight: 50,
    },
    container:{
        paddingBottom:5,
        paddingHorizontal: 20,
    },
    error:{
        color: 'red',
        fontWeight: 'bold',
    },
    button:{
        paddingVertical:3,
        paddingLeft: 4,
        borderColor: 'black',
        width: '100%',
        borderWidth: 2,
        borderRadius:10,
        backgroundColor: 'lightgreen',
    }
})
