document.querySelector('#inputFld').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        let inputFieldContent = document.getElementById('inputFld').value
        document.getElementById("loadingP").style.display = "block"
        setTimeout(() => {
            document.getElementById("loadingP").style.display = "none"
            countrySearch(inputFieldContent)
        }, 3000);
        
    }
});

function btnClk() {
    let inputFieldContent = document.getElementById('inputFld').value
        document.getElementById("loadingP").style.display = "block"
        setTimeout(() => {
            document.getElementById("loadingP").style.display = "none"
            countrySearch(inputFieldContent)
        }, 3000);
}


async function countrySearch(countryName) {


    try {
        const resolve = await fetch(`https://restcountries.com/v3.1/name/${countryName}?fields=name,capital,population,region,flags`)
        const data = await resolve.json()
        console.log(data)
    
    
        const cardContainer = document.createElement("div")
        cardContainer.setAttribute("id", "cardContainer")
        cardContainer.style.display="flex"
        cardContainer.style.flexWrap="wrap"
        cardContainer.style.marginBottom="100px"
        document.body.appendChild(cardContainer)
        
    
        data.forEach(adat => {
            const card = document.createElement("div")
            card.setAttribute("class", "card")
            cardContainer.appendChild(card)
            card.style.margin="10px"
            card.style.padding="10px"
            card.style.background="grey"
            card.style.width="400px"
            card.style.color="white"
            card.style.border="3px solid lightgray"
            card.style.textAlign="justify"
            card.style.boxShadow="10px 10px grey"
            
            
            
            
            const name = document.createElement("h1")
            name.textContent = adat.name.common
            card.appendChild(name)
    
            const flagSrc = document.createElement("img")
                  
            flagSrc.src = adat.flags.png
            
            card.appendChild(flagSrc)
           

            const capitalName = document.createElement("h2")
            capitalName.textContent = adat.capital
            card.appendChild(capitalName)


            const popName = document.createElement("h2")
            popName.textContent = adat.population
            card.appendChild(popName)


            const regionName = document.createElement("h2")
            regionName.textContent = adat.region
            card.appendChild(regionName)
    
            
    
            
            
        });
    } catch (error) {
        console.log(error)
        alert("A keresett ország nem található")
        document.getElementById("inputFld").value = ""
        
    }









    /*



    let link = ``
    
    

    let resolve = await fetch(link)
    
    
    const data = await resolve.json()
    console.log(data)*/
    
}
