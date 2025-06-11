import axios from 'axios';
const URL = import.meta.env.VITE_URL_API;

const login = async () => {
    try {
        const email = document.querySelector('#email').value
        const password = document.querySelector('#password').value
        console.log(email, password)
        console.log('API URL:', URL); // เพิ่มบรรทัดนี้เพื่อดูว่า URL ถูกต้องไหม

        const response = await axios.post(`${URL}/login`, {
            email: email,
            password: password
        })
        console.log("login Successfulss", response)
    } catch (error) {
        console.log("login Error", error)
    }
}

document.querySelector('#btn-login').addEventListener('click', login)