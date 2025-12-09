const regForm = document.getElementById('formReg')
const btnDelete = document.getElementById('delete-btn')

btnDelete.addEventListener('click', async (event) => {
    event.preventDefault()
    const formData = new FormData(regForm)
    const data = Object.fromEntries(formData)

    console.log(data)

    const url = `/delete-item/${data.type}/${data.id}`;
    try {

        const resbone = await fetch(url, { method: 'DELETE' })
        const result = await resbone.json()
        result.success ? alert(result.message) : alert('Error:' + result.message)

    } catch (err) {
        console.error('Error:', err);
    }
})