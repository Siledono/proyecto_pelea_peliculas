const createAutocomplete = ({root, rederOption, onOptionSelect, inputValue, fetchData}) => {
    
    root.innerHTML = `
        <label><b>Busqueda</b></label>
        <input class="input"/>
        <div class = "dropdown">
            <div class = "dropdown-menu">
                <div class = "dropdown-content results"></div>
            </div>
        </div>
    `  
     
}

const input = root.querySelector('input')
const dropdown = root.querySelector('.dropdown')
const resultwrapper = root.querySelector('.results')

const debonce = (func, delay = 1000) => {
    let timeoutId
    return(...arg) => {
        clearTimeout(timeoutId)
        timeoutId = setTimeout(() => {
            func.apply(null, arg)
        }, delay)
    }
}

const onInput = async event => {
    const items = await fetchData(event.target.values)
    console.log("Movies", items)
 
    if(!items.length){
        dropdown.classList.remove('is-active')
        return
    }

    resultwrapper.innerHTML = ''
    dropdown.classList.add('is-active')
    for (let item of items) {
        const option = document.createElement('a')

        option.classList.add('dropdown-item')
        option.innerHTML = renderOption(item)
        option.addEventListener('click', () => {
            dropdown.classList.remove('is-activate')
            input.value = inputValue(item)
            onOptionSelect(item)
            console.log("onMovieSelect")
    })
    resultsWeapper.appendChild(option)

    
    }
    input.addEventListener('input', debounce(oninput,1000))
    
    document.addEventListener('click', event => {
        if(!root.contains(event.target)){
            dropdown.classList.remove('is-activate')
        }
    })

}


