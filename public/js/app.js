//get the html elements from the hbs files
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.getElementById('message-1')
const messageTwo = document.getElementById('message-2')

weatherForm.addEventListener('submit', e => {
    e.preventDefault() //Prevents the form from reloading on submit. It is a default behaviour
    const location = search.value
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    //get response for the users search
    fetch('http://localhost:3000/weather?address=' + location).then(response => {
        response.json().then(data => {
            if (data.error) {
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast

            }
        })
    })
})