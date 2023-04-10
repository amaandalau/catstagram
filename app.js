const catName = document.querySelector(`.cat-name`)
const catDesc = document.querySelector(`.cat-desc`)
const gallery = document.querySelector(`.gallery`)
const profile = document.querySelector(`.cat-profile-btn`)
const searchInput = document.querySelector(`#meow-search`)
const usernameText = document.querySelector(`#profile-text`)

let API = `https://api.thecatapi.com/v1/breeds`
let cats
let username

async function getCats () { // ✅
    const response = await fetch (API)
    const data = await response.json()

    // displayCats(data) // pass the data to the displayCats function

    return data
}

function displayCats(cats) { // ✅
    console.log(`displayCats:`, cats)
    for (let i=0; i<cats.length; i++) {
        gallery.innerHTML += ` 
        <div class="card-container">
        <div class="img-container">
        <img class="cat-img" src="https://cdn2.thecatapi.com/images/${cats[i].reference_image_id}.jpg" alt="${cats[i].name}" onerror="this.onerror=null; this.src='./missing-cat.jpg'">
        </div>
            <div class="meow-div">
                <h2 class="cat-name">${cats[i].name}</h2>
                <p class="cat-desc">${cats[i].description}</p>
            </div>
        </div>
        `
    }

    if(cats.length == 0) {
        alert(`No such cats found`)
        return
    }
}

function searchCats() { // ✅
    console.log(`cats:`, cats)
    const searchTerm = searchInput.value.toLowerCase()

    const filteredCats = cats.filter(cat => {
        return cat.name.toLowerCase().includes(searchTerm)
      })

      console.log(filteredCats)

    gallery.innerHTML = `` //Clear gallery display before displaying filteredCats
    displayCats(filteredCats)
}

function saveUser(username) { // ✅
    localStorage.setItem('username', username)
}

function getUser() { // ✅
    username = localStorage.getItem('username')
    // console.log(`getUser:`, username)

    if (username) {
        return username
    } else {
        return null
    }
}

function displayUsername(username) { // ✅
    username = getUser()

    if (username) {
        usernameText.innerText = `Meow, ${username}`
    } 
}

window.addEventListener('load', async ()=> {
    cats = await getCats()
    displayCats(cats)

    if (!username) {
        const input = prompt('Meow! Please enter your name so I can meowcome you 😹 ')
        saveUser(input)
        getUser()
        displayUsername(input)
    }
})

searchInput.addEventListener('input', searchCats)
