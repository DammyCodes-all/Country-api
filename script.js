let loaded = false

function renderHtml(data , className = ' '){
    const html = `
    <div class="card card-2 ${className}">
        <div class="head">
            <img src="${data.flags.png}" alt="Flag of ${data.name.common}">
        </div>
        <div class="body">
            <h2>${data.name.common}</h2>
            <p class="continent">${data.region}</p>
            <ul class="list">
                <li>👭${(data.population / 1000000).toFixed(1)}M People</li>
                <li>🗣${Object.values(data.languages)[0]}</li>
                <li>💵${Object.values(data.currencies)[0].name}</li>
            </ul>
        </div>
    </div>
`
$(".sample").hide()
// Add this to insert the card into the DOM
$(".card-container").prepend(html)
setTimeout(() => {
    $('.card-2').addClass('card-2-shown');
}, 100);
}

function showError(message){
    const error = $(".error")
    error.text(`${message}`).addClass('error-shown')
    setTimeout(function(){
       error.removeClass('error-shown')
    }, 2000)
    
}

function getCountryData(country){
    fetch(`https://restcountries.com/v3.1/name/${country}`)
     .then( (response) => {
        if(!response.ok){
            throw new Error(`Country not found (${response.status})`)
        }
        return response.json()
     })
     .then((data) => {
        console.log(data[0])
        renderHtml(data[0])
        loaded = true
       let neighbor =data[0].borders
        if(neighbor  === undefined){
            throw new Error('This country has no neighbor!!')
        }
        let index = Math.floor(Math.random() * neighbor.length)
        neighbor = neighbor[index]
        return fetch(`https://restcountries.com/v3.1/alpha/${neighbor}`)
     })
     .then(response =>{
       return response.json()
     } )
     .then((data2) =>{
        if(!data2) return
        console.log(data2[0])
        renderHtml(data2[0] , "neighbor")
     })
     .catch((error) =>{
        console.log(`${error}`)
        showError(`Something went wrong🔥🔥 . ${error.message}. Try again!!`)
        loaded  = true
     })
}
let input;
$(".button").click(function(){
    input = $(".text").val()
    if(loaded === true){
        loaded = false
        $('.card-2').remove()
    }
    getCountryData(input)
})
$(document).keydown( function (event){
    input = $(".text").val()
    if (event.key === 'Enter'){
        if(loaded === true){
            loaded = false
            $('.card-2').remove()
        }
        getCountryData(input)
    }
})