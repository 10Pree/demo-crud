import axios from 'axios';
const URL = import.meta.env.VITE_URL_API;

const login = async () => {
    try {
        const emailInput = document.querySelector('#email')
        const passwordInpu = document.querySelector('#password')

        const email = emailInput.value
        const password = passwordInpu.value

        const response = await axios.post(`${URL}/login`, {
            email: email,
            password: password
        },{
            withCredentials: true
        })
        emailInput.value = ""
        passwordInpu.value = ""
        window.location.href = '/index.html'
    } catch (error) {
        console.log("login Error", error)
    }
}


document.querySelector('#btn-login').addEventListener('click', login)