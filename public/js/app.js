console.log('client side javascript is loaded!')
//fetch the data in this url and then run this function
fetch('http://puzzle.mead.io/puzzle').then((response)=> {
    response.json().then((data)=>{
        console.log(data)
    })
}) 



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

//messageOne.textContent = 'from js'

weatherForm.addEventListener('submit', (event) => {
    //i take the argument of the callback and I use the preventDefault so the output of the callback function will remain in the console.
    event.preventDefault()

//value extracts the input value and down below we store it inside the variable
    const location = search.value 
    
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch('/weather?address=' + location).then((response)=> {
    response.json().then((data)=> {
        if (data.error) {
           messageOne.textContent = data.error
        }else {
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast
        }
    })
})

  
})