import React, { useEffect, useState } from 'react';
import { View, Text, Button, TextInput } from 'react-native';
import secure from '../../core/secure';
import { ADDRESS } from '../../core/api';


const ChatSocket = ({route, navigation}) => {
  
  const {target} = route.params.target;
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([])
  const [receivedMessage, setReceivedMessage] = useState('');
  const server_path = 'ws://' + ADDRESS.split('/')[0] + '/ws/chat-server/' + target.id + '/'
  const [ws, setWs] = useState(null);

  const getUsername = async ()=> {
    const credentials = await secure.get('credentials')
    setUsername(credentials.username)
  }
  const [username,setUsername] = useState(getUsername())

  

  useEffect(() => {
    const socket = new WebSocket(server_path);
    
    socket.onopen = () => {
      console.log('WebSocket connected');
      setWs(socket);
    };

    socket.onmessage = (e) => {
      const data = JSON.parse(e.data);
      setReceivedMessage(data.username + ': ' + data.message);
      setMessages(prevMessages => [...prevMessages, { id: prevMessages.length, text: receivedMessage }]);
    };

    socket.onclose = (e) => {
      console.log('WebSocket disconnected', e.reason);
    };

    socket.onerror = (e) => {
      console.error('WebSocket error', e.message);
    };

    return () => {
      socket.close();
    };
  }, []);

  const sendMessage = () => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      console.log(username + ' is SENDING: '+ target.type + ', id: '+ target.id +  ', message: ' + message)
      if (message == '') {
        console.log(username,': empty message')
        return
      }
      ws.send(JSON.stringify({ message:message, username:username }));
    } else {
      console.log('WebSocket is not open:', ws.readyState);
      Alert.alert('Error', 'WebSocket is not open. Please try again later.');
    }
    setMessage('')
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        placeholder="Enter message"
        value={message}
        onChangeText={setMessage}
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
      />
      <Button title="Send Message" onPress={sendMessage} />
      {receivedMessage ? <Text>Received: {receivedMessage}</Text> : null}
    </View>
  );
};

export default ChatSocket;
