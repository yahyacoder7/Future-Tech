const regForm = document.getElementById('regFrom')
const btnDelete = document.getElementById('delete-btn')

btnDelete.addEventListener('click', (event) => {
    event.preventDefault()
    const formData = new FormData(regForm)
    const dataToSend = Object.fromEntries(formData)

    console.log(dataToSend)
    
})