let formReg = document.getElementById('cpu_form')
let successMessage = document.getElementById('success-message')
let Btn = document.getElementById('btn')


function showSuccess() {
    successMessage.classList.add('active')
    setTimeout(() => {
        successMessage.classList.remove('active')
    }, 3000)
}

formReg.addEventListener('submit', async (event) => {

    event.preventDefault()
    const formData = new FormData(formReg)
    const dataToSend = Object.fromEntries(formData)
    console.log(dataToSend)
    const resbone = await fetch('/cpu-add', {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(dataToSend)

    })
    const res = await resbone.json()
    if (res.success) {
        showSuccess();
    } else {

    }
})