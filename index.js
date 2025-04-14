let ulList = document.querySelector('.url-list')

function empty() {
    localStorage.clear()
}

function searchLocal() {
    let list = localStorage.getItem('list')
    return list
}

function initialSearch() {
    console.log('initial')
    let list = localStorage.getItem('list')
}

function create() {
    let myUrl = document.URL
    //  let ref = myUrl.slice(7)
    //   ref = ref.split('/')[0];
    //   let txt = document.querySelector('#input-txt').value

    let list = searchLocal()
    list ? localStorage.setItem('list', myUrl) : localStorage.setItem('list', `${list}, ${myUrl}`)

}
initialSearch()