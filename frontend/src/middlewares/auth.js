import axios from "axios"
const URL = import.meta.env.VITE_URL_API;
// เช็ค สิทธิ ในการเข้าใช้
export const checkToken = async () => {
    try {
        const res = await axios.get(`${URL}/check`, {
            withCredentials: true
        })
        if (res.status === 200) {
            isLoggedIn(true)
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


export const isLoggedIn = (event) => {
    return Boolean(event)
}

// เช็คว่ามีการ login หรือ ป่าวในการเช็ค จาก token 
export const Auth = (redirectTo = 'login.html') => {
    if (!isLoggedIn()) {
        window.location.href = redirectTo
        return false
    }
    return true
}
