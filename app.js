document.querySelector('#inputFld').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        let inputFieldContent = document.getElementById('inputFld').value
        document.getElementById("loadingP").style.display = "block"
            countrySearch(inputFieldContent)
        
    }
});
document.body.style.background = "lightgrey"
function btnClk() {
    let inputFieldContent = document.getElementById('inputFld').value
        document.getElementById("loadingP").style.display = "block"
        
            
            countrySearch(inputFieldContent)
        
}
let counter = 0;

async function countrySearch(countryName) {
    try {
        const resolve = await fetch(`https://restcountries.com/v3.1/name/${countryName}?fields=name,capital,population,region,flags`)
        const data = await resolve.json()
        console.log(data)
        
        setTimeout(() => {
            document.getElementById("loadingP").style.display = "none"
            const line = document.createElement("hr")
            const rmBtn = document.createElement("button")
            const cardContainer = document.createElement("div")
            rmBtn.addEventListener("click", () => {
                cardContainer.remove()
                line.remove()
                rmBtn.remove()
            })
            cardContainer.setAttribute("id", "cardContainer")
            
            document.body.appendChild(cardContainer)
            document.body.appendChild(rmBtn)
            document.body.appendChild(line)


            cardContainer.style.display="flex"
            cardContainer.style.flexWrap="wrap"
            cardContainer.style.marginBottom="15px"
            line.style.width = "80%"
            line.style.height= "2px";
            line.style.background = "darkgrey"
            rmBtn.style.width = "auto"
            rmBtn.style.height = "auto"
            rmBtn.textContent = "Delete group"


            
            

           
            
            data.forEach(adat => {
                const card = document.createElement("div")
                
                counter++
                card.setAttribute("class", "card")
                
                
            card.addEventListener("click", () => {
                card.remove()
                
                counter--
                if(counter===0){
                    cardContainer.remove()
                    line.remove()
                    rmBtn.remove()
                }
            })
                cardContainer.appendChild(card)
                card.style.margin="10px"
                card.style.padding="23px"
                card.style.background="grey"
                card.style.width="8fr"
                card.style.color="white"
                card.style.border="3px solid lightgray"
                card.style.textAlign="justify"
                const name = document.createElement("p")
                name.style.fontSize = "20pt"
                name.textContent = adat.name.common
                card.appendChild(name)
            
                const flagSrc = document.createElement("img")
                flagSrc.style.width = "auto"
                flagSrc.style.height = "50px"
                flagSrc.src = adat.flags.png

                card.appendChild(flagSrc)
            

                const capitalName = document.createElement("p")
                capitalName.textContent = "Capital: "+ adat.capital
                card.appendChild(capitalName)


                const popName = document.createElement("p")
                popName.textContent = "Pop: "+ adat.population
                card.appendChild(popName)


                const regionName = document.createElement("p")
                regionName.textContent = "Region: "+ adat.region
                card.appendChild(regionName)
            
            card.addEventListener("mouseenter", (event) => { event.target.style.boxShadow="5px 5px 5px 5px grey", event.target.style.padding = "26px"})
            card.addEventListener("mouseleave", (event) => { event.target.style.boxShadow="none", event.target.style.padding = "23px"})
                
            });
            
            
            /*document.querySelector('.card').addEventListener('onmouseover', function(){
                card.style.boxShadow="10px 10px grey"
            })*/
        }, 3000);

        
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
