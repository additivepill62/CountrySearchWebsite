document.body.style.background = "lightgrey"
let counter = 0;
let hoverTimer;

const overlay = document.createElement("div")
overlay.style.position = "fixed"
overlay.style.top = "0"
overlay.style.left = "0"
overlay.style.width = "100vw"
overlay.style.height = "100vh"
overlay.style.backgroundColor = "rgba(0,0,0,0.5)" // elsötétítés
overlay.style.display = "none"
overlay.style.justifyContent = "center"
overlay.style.alignItems = "center"
overlay.style.zIndex = "9999"

const asd = document.createElement("div")
asd.style.backgroundColor = "lightgray"
asd.style.padding="23px"
asd.style.width="8fr"

overlay.appendChild(asd)
document.body.appendChild(overlay)

const contentContainer = document.createElement("div")
contentContainer.style.marginLeft = "auto"
contentContainer.style.marginRight = "auto"
contentContainer.style.width = "30vw"

const text = document.createElement("p")
text.textContent = "Use the input field to search"

const loadingP=document.createElement("p")
loadingP.textContent = "Loading..."
loadingP.style.display = "none"

const inputFld=document.createElement("input")
inputFld.setAttribute("type", "text")
inputFld.setAttribute("id", "inputFld")

const searchBtn=document.createElement("button")
searchBtn.setAttribute("id","btn")
searchBtn.textContent ="Search"
searchBtn.addEventListener("click", ()=>{
        let inputFieldContent = document.getElementById('inputFld').value
        document.getElementById("loadingP").style.display = "block"
        countrySearch(inputFieldContent)
})

document.body.appendChild(contentContainer)
contentContainer.appendChild(text)
contentContainer.appendChild(loadingP)
contentContainer.appendChild(inputFld)
contentContainer.appendChild(searchBtn)

document.querySelector('#inputFld').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        let inputFieldContent = document.getElementById('inputFld').value
        loadingP.style.display = "block"
            countrySearch(inputFieldContent)
        
    }
});

async function countrySearch(countryName) {
    try {
        const resolve = await fetch(`https://restcountries.com/v3.1/name/${countryName}?fields=name,capital,population,region,flags,area,timezones,continents`)
        const data = await resolve.json()
        console.log(data)
        
        setTimeout(() => {
            loadingP.style.display = "none"
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
                clearTimeout(hoverTimer)
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

                card.addEventListener("mouseenter", (event) => {
                const el = event.target
            
                el.style.boxShadow = "5px 5px 5px 5px grey"
                el.style.padding = "26px"
            
                hoverTimer = setTimeout(() => {
                    console.log("5 másodperc hover után!")

                    overlay.style.display = "flex"

                    const name = document.createElement("p")
                    name.style.fontSize = "20pt"
                    name.textContent = adat.name.common
                    asd.appendChild(name)
                    
                    const flagSrc = document.createElement("img")
                    flagSrc.style.width = "auto"
                    flagSrc.style.height = "50px"
                    flagSrc.src = adat.flags.png
                    asd.appendChild(flagSrc)
                    
                    const capitalName = document.createElement("p")
                    capitalName.textContent = "Capital: "+ adat.capital
                    asd.appendChild(capitalName)

                    const popName = document.createElement("p")
                    popName.textContent = "Pop: "+ adat.population
                    asd.appendChild(popName)

                    const regionName = document.createElement("p")
                    regionName.textContent = "Region: "+ adat.region
                    asd.appendChild(regionName)

                    const areaName = document.createElement("p")
                    areaName.textContent = "Area: "+ adat.area
                    asd.appendChild(areaName)

                    const timezonesName = document.createElement("p")
                    timezonesName.textContent = "Timezones: "+ adat.timezones
                    asd.appendChild(timezonesName)

                    const continentsName = document.createElement("p")
                    continentsName.textContent = "Continents: "+ adat.continents
                    asd.appendChild(continentsName)
                    
                    overlay.addEventListener("click", (e) => {
                        if (e.target === overlay) {
                            overlay.style.display = "none"
                            asd.removeChild(name)
                            asd.removeChild(flagSrc)
                            asd.removeChild(capitalName)
                            asd.removeChild(popName)
                            asd.removeChild(regionName)
                            asd.removeChild(areaName)
                            asd.removeChild(timezonesName)
                            asd.removeChild(continentsName)
                        }
                    })
                }, 2000)
            })
            
            card.addEventListener("mouseleave", (event) => {
                const el = event.target
            
                el.style.boxShadow = "none"
                el.style.padding = "23px"
            
                clearTimeout(hoverTimer)
            })
            });
            
        }, 3000);

    } catch (error) {
        console.log(error)
        alert("A keresett ország nem található")
        document.getElementById("inputFld").value = ""
        
    } 
}
