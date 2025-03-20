
$(".button").click(function(){
    const input = $(".text").val()
    countryData(input)
})

function countryData(country){
    const request = new XMLHttpRequest()
    request.open('GET', `https://restcountries.com/v3.1/name/${country}`)
    request.send()
    request.addEventListener('load', function(){
    const [data] = JSON.parse(this.responseText);
    console.log(data);
        const html = `
        <div class="card card-2">
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
})
}

