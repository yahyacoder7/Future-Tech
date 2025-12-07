
let successMessage = document.getElementById('success-message')
let formReg = document.getElementById('componentForm')

function showSuccess() {
    successMessage.classList.add('active')
    setTimeout(() => {
        successMessage.classList.remove('active')
    }, 3000)
}

formReg.addEventListener('submit', async (event) => {
    event.preventDefault()

    const type = document.getElementById('category').value;

    if (!type) {
        alert('Please Seclet Type First!!!')
        return;
    }

    const formData = new FormData(formReg)
    const dataToSend = Object.fromEntries(formData)

    console.log(dataToSend)
    try {
        const resbone = await fetch(`/add-${type}`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(dataToSend)

        });

        if (resbone.ok) {
            const res = await resbone.json()
            if (res.success) {
                showSuccess();
                formReg.reset();
            } else { alert('something wrong' + res.message) }      

        } else {  
            const errorRes = await resbone.json(); 
            alert('Connection Failed: ' + resbone.status + '\nMessage: ' + errorRes.message)
        }

    } catch (error) { console.log('Error IS:' + error) }

})