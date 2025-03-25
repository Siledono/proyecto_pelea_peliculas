//65904a8a API KEY 

const fetchData = async(searchTerm) => {
    const response = await axios.get("https://omdbapi.com/",{
        params: {
        apikey:"65904a8a",
        s: "avengers"
        }
    })
    if(response.data.Error){
        return[]
    }
    console.log(response.data.Search)
}
//fetchData()

const root = document.querySelector('.autocomplete')
root.innerHTML = `
    <label><b> Busqueda de Peliculas </b></label>
    <input class = "input" />
    <div class = "dropdown">
        <div class = "dropdown-menu">
            <div class = "dropdown-content results"></div>
        </div>
    </div>
`
const input = document.querySelector("inputs")
const dropdown = document.querySelector(".dropdown")
const resultsWeapper = document.querySelector(".results")

const debonce = (func, delay = 1000) => {
    let timeoutId
    return(...arg) => {
        clearTimeout(timeoutId)
        timeoutId = setTimeout(() => {
            func.apply(null, arg)
        }, delay)
    }
}

const onInput = async(event) => {
    const movies = await fetchData(event.target.values)
    console.log("MOVIES: ",movies)
    
    if(!movies.length){
        dropdown.classList.remove('is-activate')
        return
    }
    resultsWeapper.innerHTML = ''
    dropdown.classList.add('is-activate')

    for (let movie of movies){
        const option = document.createElement('a')
        const imgSrc = movie.Poster === "N/A" ? '': movie.Poster

        option.classList.add('dropdown-item')
        option.innerHTML = `
            <img src="${imgSrc}" />
            ${movie.Title}
        `
        option.addEventListener('click', () => {
            dropdown.classList.remove('is-activate')
            input.value = movie.Title
            onMoviesSelect(movie)
        })
        resultsWeapper.appendChild(option)
    }
}

input.addEventListener('input', debonce(onInput, 1000))

document.addEventListener('click', event => {
    if(!root.contains(event.target)){
        dropdown.classList.remove('is-activate')
    }
})

const onMoviesSelect = async(movie) => {
    const response = await axios.get('http://www.omdbapi.com/', {
        params: {
            apikey: '65904a8a',
            i: movie.imbID
        }
    })

    console.log(response.data)
    document.querySelector('summary').innerHTML = movieTemplate(response.data)
}

const movieTemplate = (movieData1) => {
    return `
        <articule class="media">
            <figure class="media-left">
                <p class="image">
                    <img src="${movieData1.Poster}" />
                </p>
            </figure>
            <div class = ""media-content">
                <div class="content">
                    <h1>${movieData1.Title}</h1>
                    <h4>${movieData1.Genre}</h4>
                    <p>${movieData1.Plot}</p> 
                </div>
            </div>    
        </articule>
    
    `
}