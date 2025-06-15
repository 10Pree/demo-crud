import axios from "axios"
const URL = import.meta.env.VITE_URL_API;
// เช็ค สิทธิ ในการเข้าใช้
export const checkPermission = async () => {
    try {
        const checkToken = await axios.get(`${URL}/check`, {
            withCredentials: true
        })
        if (checkToken.status === 200) {
            return true
        }
        return false
    } catch (error) {
        if (error.response && error.response.status === 401) {
            window.location.href = 'login.html';
            return false;
        }
        console.error('Permission check failed:', error);
        return false;
    }
}

// เช็คว่ามร token 
export const isLoggedIn = () => {
    return Boolean(localStorage.getItem('token'))
}

// เช็คว่ามีการ login หรือ ป่าวในการเช็ค จาก token 
export const Auth = (redirectTo = 'login.html') => {
    if (!isLoggedIn()) {
        window.location.href = redirectTo
        return false
    }
    return true
}
