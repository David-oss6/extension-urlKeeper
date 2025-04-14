let ulList = document.querySelector('.url-list')

function empty() {
    localStorage.clear()
}

function searchLocal() {
    let list = localStorage.getItem('list')
    list ? list = JSON.parse(list) : []
    return list
}

function printList(list) {
    ulList.innerHTML = '';
    list.forEach(element => {
        let li = document.createElement('li');
        let ref = document.createElement('h2')
        let url = document.createElement('p')
        let txt = document.createElement('p')
        let delBtn = document.createElement('button')
        ref.textContent(element.ref)
        url.textContent(element.url)
        txt.textContent(element.text)
        li.appendChild(ref, url, p2, delBtn)
        ulList.appendChild(li);
    });
    list.forEach(element => {
        let li = document.createElement('li');
        li.textContent = url;
        ulList.appendChild(li);
    });
}

function initialSearch() {
    let list = searchLocal()
    list ? printList(list) : ""
}

function create() {
    let list = searchLocal()

    let myUrl = document.URL
    let ref = myUrl.slice(7)
    ref = ref.split('.')[0];
    let txt = document.querySelector('#input-txt').value
    if (!txt) { txt = "" }

    let merch = {
        url: myUrl,
        ref: ref,
        text: txt,
    }
    console.log(merch)
    merch = JSON.stringify(merch)

    console.log(merch)
    console.log(JSON.parse(merch))

    printList(list)


}
initialSearch()