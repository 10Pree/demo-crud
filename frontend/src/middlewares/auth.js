// เช็ค สิทธิ ในการเข้าใช้
export const checkPermission = () =>{
    const token = localStorage.getItem('token')
    if(!token){
        window.location.href = "login.html"
        return false
    }
    console.log(token)
    return true
}

// เช็คว่ามร token ใน localStorage หรือป่าว
export const isLoggedIn = () =>{
    return Boolean(localStorage.getItem('token'))
}

// เช็คว่ามีการ login หรือ ป่าวในการเช็ค จาก token 
export const Auth = (redirectTo = 'login.html') =>{
    if(!isLoggedIn()){
        window.location.href = redirectTo
        return false
    }
    return true
}
