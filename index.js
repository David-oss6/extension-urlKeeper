let ulList = document.querySelector('.url-list')

function empty() {
    localStorage.clear()
}

function searchLocal() {
    let list = localStorage.getItem('list')
    if (list) {
        JSON.parse(list)
    } else {
        list = []
    }

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
        ref.textContent = element.ref
        url.textContent = element.url
        txt.textContent = element.text
        delBtn.addEventListener('click', () => {
            let updatedList = searchLocal().filter(item => item.url !== element.url);
            localStorage.setItem('list', JSON.stringify(updatedList));
            printList(updatedList);
        });
        li.appendChild(ref);
        li.appendChild(url);
        li.appendChild(txt);
        li.appendChild(delBtn);
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
    list.push(merch)
    localStorage.setItem('list', JSON.stringify(list))
    printList(list)
    document.querySelector('#input-txt').value = ""

}
initialSearch()