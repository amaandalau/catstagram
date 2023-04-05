const catName = document.querySelector(`.cat-name`)
const catDesc = document.querySelector(`.cat-desc`)
const gallery = document.querySelector(`.gallery`)
const profile = document.querySelector(`.cat-profile-btn`)

let API = `https://api.thecatapi.com/v1/breeds`

async function getCats () {
    const response = await fetch (API)
    const data = await response.json()

    displayCats(data) // pass the data to the displayCats function
    goCatProfile(data)

    return data
}

function displayCats(cats) {
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
}



window.addEventListener('load', async ()=> {
    const cats = await getCats()
    displayCats(cats)
})

// profile.addEventListener('click', )