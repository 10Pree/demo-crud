import axios from 'axios';
const getUser = async () => {
    try {
        const response = await axios.get("http://localhost:8000/users");
        // console.log("ข้อมูล:", response.data);
        populateTable(response.data.results)
    } catch (error) {
        if(error.response){
            console.log(error.response)
        } else{
            console.log(error)
        }
    }
};

const populateTable = (users) => {
    const tbody = document.querySelector('#tableBody')
    tbody.innerHTML = ''

    users.forEach(user => {
        const row = `
                <tr>
                    <td class="px-6 py-4 text-lg">${user.username}</td>
                    <td class="px-6 py-4">${user.email}</td>
                    <td class="px-6 py-4">${user.phone}</td>
                    <td class="px-6 py-4">${user.address}</td>
                    <td class="px-3 py-4 text-center">
                        <button class="bg-indigo-600 px-3 py-2 rounded-lg text-white hover:bg-indigo-400" type="button">Edit</button>
                        <button class="bg-red-600 px-3 py-2 rounded-lg text-white hover:bg-red-400" type="button">Delete</button>
                    </td>
                </tr>
        `
        tbody.innerHTML += row
    });

} 

getUser()