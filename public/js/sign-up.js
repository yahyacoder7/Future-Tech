let regesForm = document.getElementById('sign-up-from')

regesForm.addEventListener('submit', async function (event) {

    event.preventDefault()

    const formData = new FormData(regesForm)
  
    const dataToSend = Object.fromEntries(formData)

    const res = await fetch('/sign-up', {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(dataToSend)
    })
 
    const result = await res.json()

    if (result.success) {
        window.location.replace('/')
    }

})
