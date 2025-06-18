import axios from 'axios';
const URL = import.meta.env.VITE_URL_API;

const logout = async() => {
    try{
        const res = await axios.post(`${URL}/logout`,{},{
            withCredentials: true
        })
        window.location.href = 'login.html'
    }catch(error){
        console.log("logout Error", error)
    }
}
document.querySelector('#logout').addEventListener('click', logout)