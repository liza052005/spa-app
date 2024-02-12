import axios from "axios";

const BASE_URL = 'https://jsonplaceholder.typicode.com'

export const fetchData = async () =>{
    try {
        const response = await fetch(`${BASE_URL}/posts`, {
            method: 'GET',
            headers: {
                authorization: 'Bearer token'
            }
        }) 
        return await response.json()
    } catch(error) {
        console.error('Иди нахуй', error);
        throw error;
    }
};

