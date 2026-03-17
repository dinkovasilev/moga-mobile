import axios from 'axios'
import { Platform } from 'react-native'
import {API_HOST} from './config'

export const ADDRESS = API_HOST;


const headers = {
      'Content-Type': 'application/json',
    };

export const GET = async (target) => {

    const url = 'http://' + ADDRESS + target;
    try {
		const response = await fetch(url, {
			method: 'GET',
			headers: headers,
			credentials: 'include',
		});

		const responseData = await response.json();
		console.log('SERVER [' + url + '] status:' + response.status);
		return responseData
    } 
    catch (error) {
      console.error('Error:', error);
    }
  };

export const POST0 =(target, data)=>{
	const url = 'http://' + ADDRESS + target;
	fetch(url, {
		method: 'POST',
		headers: headers,
		credentials: 'include', 
		body: JSON.stringify(data),
	})
	.then(response => response.json())
	.then(data => {
		console.log('SERVER: [' + url + ']:',data)
		return data
	})
	.catch(error => {
		console.log(error)
		return false
	});}


export const POST = async (target, data)=>{
	const url = 'http://' + ADDRESS + target;
	try{
		response = await fetch(url, {
			method: 'POST',
			headers: headers,
			credentials: 'include', 
			body: JSON.stringify(data),
		})
		let responseData = await response.json();
		responseData.status = response.status
		console.log('SERVER [' + url + '] status:' + response.status);
		return responseData
	}
	catch (error) {
		console.log('Error sending data to server in POST function!',error)
	}
	
}

const api = axios.create({
	baseURL: 'http://' + ADDRESS,
	headers: {
		'Content-Type': 'application/x-www-form-urlencoded',//'Content-Type': 'application/json',
	},
	credentials: 'include',
})

export default api

