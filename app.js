document.querySelector('#inputFld').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        let inputFieldContent = document.getElementById('inputFld').value
        countrySearch(inputFieldContent)
    }
});

async function countrySearch(countryName) {


    let resolve = await fetch(`https://restcountries.com/v3.1/name/${countryName}`)
    
    
    const data = await resolve.json()
    console.log(data)
    
}
