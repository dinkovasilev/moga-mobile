import { View, Text, StyleSheet } from 'react-native'

export default function Task(task, bkcolor){
    return (
        <View style={styles.task}>
            <Text style={styles.label}> Статус: {task.status} </Text>
            <Text style={styles.label}> Тип: {task.task_type} </Text>
            <Text style={styles.label}> Заглавие: {task.name} </Text>
            <Text style={styles.label}> Категория: {task.category_name} </Text>
            <Text style={styles.label}> Описание: {task.description} </Text>
          </View>
    )
}

const styles = StyleSheet.create({
    task:{
          paddingVertical:3,
          paddingLeft: 4,
          borderColor: 'black',
          width: '100%',
          borderWidth: 2,
          backgroundColor: '#801EFF',
          fontSize: 14,
          borderRadius: 10,
          
    },
    label:{
          color: 'white',
    }
  })