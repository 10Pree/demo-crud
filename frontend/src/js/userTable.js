export const populateTable = (users) => {
    const tbody = document.querySelector('#tableBody')
    tbody.innerHTML = ''

    users.forEach(user => {
        const row = `
                <tr class="border border-b-1">
                    <td class="px-6 py-4 text-lg">${user.username}</td>
                    <td class="px-6 py-4">${user.email}</td>
                    <td class="px-6 py-4">${user.phone}</td>
                    <td class="px-6 py-4">${user.address}</td>
                    <td class="px-3 py-4 text-center">
                        <button class="popup-open-update bg-indigo-600 px-3 py-2 mb-2 md:mb-0 rounded-lg text-white hover:bg-indigo-400" data-user-id="${user.id}"  type="button">Edit</button>
                        <button class="btn-delete  bg-red-600 px-3 py-2 rounded-lg text-white hover:bg-red-400" data-user-id="${user.id}" type="button">Delete</button>
                    </td>
                </tr>
        `
        tbody.innerHTML += row
    });

}