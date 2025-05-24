import axios from 'axios';

const getUser = async () => {
    try {
        const response = await axios.get("http://localhost:8000/users");
        console.log("ข้อมูล:", response.data);
    } catch (error) {
        console.log(error)
    }
};

document.getElementById('loadData').addEventListener('click', getUser)