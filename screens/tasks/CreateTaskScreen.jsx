import { useState, useEffect } from "react";
import { 
    Text, View,
    TextInput, Button, 
    StyleSheet, ScrollView,
    KeyboardAvoidingView,
    Platform,
    Pressable, } from "react-native";
import { TaskType } from "../../components/DropDowns";
import React from 'react';
import { SelectList } from 'react-native-dropdown-select-list'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { GET, POST } from "../../core/api";

export default function CreateTaskScreen({navigation}){

    var action_navigation = ''
    const myFormatDate = (datetime)=>{
        
        strDate = datetime.toLocaleString('en-GB')
        let date = strDate.split(',')[0].split('/') 
        let time = strDate.split(',')[1].split(':')
        
        const year = date[2]
        const month = date[1]
        const day = date[0]
        const hour = time[0]
        const minute = time[1]

        date = year + '-' + month + '-' + day 
        time = hour + ':' + minute
        strDate = date + time
        return strDate
    }
    const GPTformatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${year}-${month}-${day} ${hours}:${minutes}`;
    };

    const [task_type, setTaskType] = useState('')
    const [name, setTaskName] = useState('')
    const [description, setDescription] = useState('')
    const [capacity, setCapacity] = useState(1)
    const [location, setLocation] = useState('')
    
    const [valid_from, setStartTime] = useState('')
    const [valid_to, setExpireTime] = useState('')
    const [general,setGeneral] = useState(false)

    const [errors,setErrors] = useState({})
    const [isStartDatePickerVisible, setStartDatePickerVisibility] = useState(false);
    const [isExpireDatePickerVisible, setExpireDatePickerVisibility] = useState(false);

    const [categories, setCategories] = useState([]);
    const [subcategories, setSubcategories] = useState([]);
    const [category, setCategory] = useState('');
    
    const getCategories = async ()=>{
        const target = '/task-categories/'
        const responseData = await GET(target)
        const parentCategories = responseData.context.categories;
        setCategories(parentCategories);
    }

    const handleCategoryChange = (categoryID) => {
        const category = categories.find(cat => cat.id === categoryID);
        setSubcategories(category ? category.subcategories : []);
    };
    const showStartDatePicker = () => {
        setStartDatePickerVisibility(true);
    };
    const hideStartDatePicker = () => {
        setStartDatePickerVisibility(false);
    };
    const handleStartTime = (date) => {
        setStartTime(myFormatDate(date));
        hideStartDatePicker();
    };
    const showExpireDatePicker = () => {
        setExpireDatePickerVisibility(true);
    };
    const hideExpireDatePicker = () => {
        setExpireDatePickerVisibility(false);
    };
    const handleExpireTime = (date) => {
        setExpireTime(myFormatDate(date));
        hideExpireDatePicker();
    };
    const validateCapacity = (capacity)=>{

        const enteredValue = String(capacity).replace(/[^0-9]/g,'')
        const parsedInt = parseInt(enteredValue,10)

        if(!isNaN(parsedInt)){setCapacity(parsedInt.toString())}
        else {setCapacity('')}
    }   
    const initStartTime = ()=>{        
        var start_date = new Date()
        setStartTime(myFormatDate(start_date));  
    }
    const initStopTime = (days=null)=>{              
        var expire_date = new Date()
        if(days){
            expire_date.setDate(expire_date.getDate() + days);
        }
        else {
            expire_date.setDate(expire_date.getDate() + 30);
        }
        setExpireTime(myFormatDate(expire_date));
    }
    const validateForm = ()=>{
        let errors = {}
        if(!task_type){errors.task_type = 'Избери тип'}
        if(!category){errors.category = 'Избери категория'}
        if(!name){errors.name = 'Въведи име на задача'}
        if(!capacity){errors.capacity = 'Въведи число'}
        setErrors(errors)
        return Object.keys(errors).length === 0
    }

    const setActionNavigation = ()=>{
        switch(task_type){
            case 'ДИСКУСИЯ':
                action_navigation = 'Участия' 
                break
            case 'ЛЕКЦИЯ':          
                action_navigation = 'Абонаменти' 
                break
            case 'БЕЛЕЖНИК':
                action_navigation = 'Персонални' 
                break
            default: 
                action_navigation = 'Участия' 
                break

        }
    }
    const handleSubmit = () => {
        const target = '/create-task/';
        const formData = { 
            category, 
            task_type, 
            name,
            description, 
            valid_from, 
            valid_to,
            capacity, 
            location,
            general,
        };
        //console.log(formData)
        POST(target,formData)
        setActionNavigation()
        navigation.navigate(action_navigation)
    }

    useEffect(()=>{ initStartTime()},[])
    useEffect(()=>{ initStopTime()},[])
    useEffect(()=>{ getCategories()},[])

    return (
        <ScrollView 
            style={{
                backgroundColor: '#DFF67C',
                flex:1,
            }}>
                
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}
            >

            <View style={styles.form}>

                <View style={styles.title}>
                    <Text style={styles.title}>
                        Нова задача
                    </Text>
                </View>

                <View style={styles.container}>
                    <Text style={styles.label}>Избери раздел на задачата:</Text>
                    
                    <SelectList 
                        data={categories.map(cat => ({ key: cat.id, value: cat.name }))}
                        setSelected={handleCategoryChange}
                        placeholder='Раздел'

                    />
                    
                    
                    {subcategories.length > 0 && (
                        <>
                            <Text>Избери категория:</Text>
                            <SelectList 
                                data={subcategories.map(sub => ({ key: sub.id, value: sub.name }))}
                                setSelected={setCategory}
                                placeholder='Категория'
                                save='key'
                            />
                        </>
                    )}
                    {errors.category ? (<Text style={styles.error}>{errors.category}</Text>):null}
                    
                </View>
                
                <View style={styles.container}>
                    <Text style={styles.label}>Избери тип</Text>
                    <SelectList 
                        setSelected={(val) => setTaskType(val)} 
                        onSelect={()=>console.log(task_type)}
                        data={TaskType} 
                        save="value"
                        placeholder='Тип на задачата'
                        search={false}
                        boxStyles={styles.input}
                    />
                    {errors.task_type ? (<Text style={styles.error}>{errors.task_type}</Text>):null}
                </View>
             
                <View style={styles.container}>
                    <Text style={styles.label}>Наименование</Text>
                    <TextInput 
                        placeholder="Заглавие на заданието"
                        value={name}
                        onChangeText={setTaskName} 
                        style={styles.input}>
                    </TextInput>
                    {errors.name ? (<Text style={styles.error}>{errors.name}</Text>):null}
                </View>
                            
                <View style={styles.container}>
                    <Text style={styles.label}>Кратко описание</Text>
                    <TextInput 
                        placeholder="Описание"
                        value={description}
                        onChangeText={setDescription} 
                        style={styles.input}>
                    </TextInput>
                </View>
                <View style={styles.container}>
                    <Text style={styles.label}>Място на изпълнение</Text>
                    <TextInput 
                        placeholder="България"
                        value={location}
                        onChangeText={setLocation} 
                        style={styles.input}>
                    </TextInput>
                </View>
                <View style={styles.container}>
                    <Text style={styles.label}>Участници</Text>
                    <TextInput 
                        placeholder="Необходим брой"
                        defaultValue="1"
                        value={capacity}
                        onChangeText={validateCapacity}
                        keyboardType='numeric' 
                        style={styles.input}>
                    </TextInput>
                </View>

                <View style={styles.container}>
                    <Text style={styles.label}>Начало</Text>
                    <DateTimePickerModal
                        isVisible={isStartDatePickerVisible}
                        mode="datetime"
                        onConfirm={handleStartTime}
                        onCancel={hideStartDatePicker}
                    />
                    <Pressable onPress={showStartDatePicker}>
                        <Text 
                            style={styles.button}>
                                Валидна от: {valid_from ? (<Text>{valid_from}</Text>): (<Text>сега</Text>) }
                        </Text>
                    </Pressable>
                </View>
                    
                <View style={styles.container}>
                    <Text style={styles.label}>Край</Text>
                    <DateTimePickerModal
                        isVisible={isExpireDatePickerVisible}
                        mode="datetime"
                        //is24Hour={true}
                        onConfirm={handleExpireTime}
                        onCancel={hideExpireDatePicker}
                    />
                    <Pressable onPress={showExpireDatePicker}>
                        <Text 
                            style={{...styles.button,backgroundColor:'red'}}>
                                Валидна до: {valid_to ? (<Text>{valid_to}</Text>): (<Text>1 месец</Text>) }
                        </Text>
                    </Pressable>
                    
                </View>

            </View>

            <View style={styles.submit}>
                <Button title="Запиши" 
                    onPress={()=>{
                        if (validateForm()){
                            handleSubmit();
                            setCategory('');
                            setTaskName('');
                            setCapacity(1);
                            initStartTime();
                            initStopTime();
                            console.log('Зявка за запис на задача с '+ String(capacity) + ' участника') 
                        }
                        else {console.log('Невалидна заявка')}
                    }}/>
            </View>

            </KeyboardAvoidingView>
            
        </ScrollView>
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
    label:{

    },
    input:{
            paddingVertical:3,
            paddingLeft: 4,
            borderColor: 'black',
            width: '100%',
            borderWidth: 2,
            backgroundColor: '#eee8aa',
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

/*
//const formattedStartDate = formatDate(start_date);
            //setStartTime(formattedStartDate);
kbview
behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
*/