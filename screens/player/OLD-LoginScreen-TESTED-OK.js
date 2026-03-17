
import axios from 'axios'
/*
    // const api = axios.create({
    //   method:'post',
    //   baseURL:'http://192.168.1.110:8000',
    //   headers: {
    //     'Content-Type':'application/json'
    //   },
    // })

    // api({
    //   url:'/mobile/login/',
    //   data:{
    //     username:username,
    //     password:password
    //   }
    // })
    //   .then(response=> console.log('SUCCESS'))
    //   .catch(function (error) {
    //     if (error.response) {
    //       // The request was made and the server responded with a status code
    //       // that falls out of the range of 2xx
    //       console.log('FAIL 1')
    //       console.log(error.response.data);
    //       console.log(error.response.status);
    //       console.log(error.response.headers);
    //     } else if (error.request) {
    //       console.log('FAIL 2')
    //       // The request was made but no response was received
    //       // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    //       // http.ClientRequest in node.js
    //       console.log(error.request);
    //     } else {
    //       console.log('FAIL 3')
    //       // Something happened in setting up the request that triggered an Error
    //       console.log('Error', error.message);
    //     }
    //     console.log(error.config);
    //   });
    //setIsPosting(true)
*/

import React, { useState } from 'react'
import { TouchableOpacity, StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'
import Background from '../../components/Background'
import Logo from '../../components/Logo'
import Header from '../../components/Header'
import Button from '../../components/Button'
import TextInput from '../../components/TextInput'
import BackButton from '../../components/BackButton'
import { theme } from '../../core/theme'
import { usernameValidator } from '../../helpers/usernameValidator'
import { passwordValidator } from '../../helpers/passwordValidator'
import api from "../../core/api"
import utils from "../../core/utils"
import useGlobal from "../../core/global"

const sendLogin = async (username,password)=>{

    const response = await fetch('http://192.168.1.110:8000/mobile/login/',{
      method: 'post',
      headers: {
        'Content-Type':'application/json'
      },
      body: JSON.stringify({
        username:{username},
        password:{password}
      })
    })

  const tokens =  await response.json()
  if (tokens.happy){
    console.log('happy')
    console.log(tokens.tokens)
    
    return true
  }
  return false
}

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })

  const onLoginPressed = () => {
    const usernameError = usernameValidator(username.value)
    const passwordError = passwordValidator(password.value)
    if (usernameError || passwordError) {
      setUsername({ ...username, error: usernameError })
      setPassword({ ...password, error: passwordError })
      return
    }
    if (sendLogin(username,password)){
      console.log('Authenticated')
      navigation.navigate('MySpace')
    }
    else {
      console.log('AUTH FAIL')
      return
    }
  }

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header>Здравей отново</Header>
      <TextInput
        label="Потребител"
        returnKeyType="next"
        value={username.value}
        onChangeText={(text) => setUsername({ value: text, error: '' })}
        error={!!username.error}
        errorText={username.error}
        autoCapitalize="none"
      />
      <TextInput
        label="Парола"
        returnKeyType="done"
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: '' })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />
      <View style={styles.forgotPassword}>
        <TouchableOpacity
          onPress={() => navigation.navigate('ResetPasswordScreen')}
        >
          <Text style={styles.forgot}>Забравена парола?</Text>
        </TouchableOpacity>
      </View>
      <Button mode="contained" onPress={onLoginPressed}>
        Влез
      </Button>
      <View style={styles.row}>
        <Text>Нов профил? </Text>
        <TouchableOpacity onPress={() => navigation.replace('RegisterScreen')}>
          <Text style={styles.link}>Участвай</Text>
        </TouchableOpacity>
      </View>
    </Background>
  )
}

const styles = StyleSheet.create({
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  forgot: {
    fontSize: 13,
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
})

