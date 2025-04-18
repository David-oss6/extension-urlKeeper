let ulList = document.querySelector('.url-list')
let createBtn = document.querySelector('#btn-create')
let searchRef = document.querySelector('#input-search')
document.querySelector('#input-url').focus()

function searchLocal() {
    let list = localStorage.getItem('list')
    if (list) {
        list = JSON.parse(list)
    } else {
        list = []
    }
    return list
}

async function clipboardHandler() {
    if (!document.querySelector('#input-url').value) {
        const clipboardText = await navigator.clipboard.readText();
        if (clipboardText && clipboardText[0] === 'h' && clipboardText && clipboardText[1] === 't') {
            document.querySelector('#input-url').value = clipboardText
        }
    }
}

searchRef.addEventListener('input', () => {
    const list = searchLocal()
    let refValue = searchRef.value
    if (refValue === "") { printList(list) }
    const newList = list.filter(saved =>
        saved.ref.toLowerCase().startsWith(refValue)
    );
    printList(newList)
})

function printList(list) {
    ulList.innerHTML = '';
    list.forEach(element => {
        let li = document.createElement('li');
        let ref = document.createElement('h3')
        let url = document.createElement('a')
        let txt = document.createElement('p')
        let delBtn = document.createElement('button')
        ref.textContent = element.ref
        url.textContent = element.url
        txt.textContent = element.text
        delBtn.setAttribute('class', 'del-btn')
        ref.setAttribute('class', 'ref')
        url.setAttribute('class', 'url')
        url.setAttribute('href', element.url)
        url.setAttribute("target", '_blank')
        txt.setAttribute('class', 'txt')
        delBtn.textContent = 'X'
        li.appendChild(ref);
        li.appendChild(url);
        li.appendChild(txt);
        li.appendChild(delBtn);
        ulList.appendChild(li);

        delBtn.addEventListener('click', () => {
            const newList = list.filter(elem => elem.url !== element.url);
            printList(newList);
            localStorage.clear()
            localStorage.setItem('list', JSON.stringify(newList))
        });
    });
}

function initialSearch() {
    let list = searchLocal()
    list ? printList(list) : ""
    clipboardHandler()
}

async function create() {
    let newList = false
    let list = searchLocal()
    let myUrl = document.querySelector('#input-url').value

    if (myUrl !== "" || myUrl[0] === "h" || myUrl[0] !== " ") {
        let sliceto = myUrl.indexOf(':')
        let ref = myUrl.slice(sliceto + 3)
        let end = ref[ref.indexOf('.') + 1]
        switch (end) {
            case 'p':
                ref = ref.split('.')[0];
                ref = `${ref}_sv_pt`
                break;
            case 'i':
                ref = ref.split('.')[0];
                ref = `${ref}_sv_it`
                break;
            case 'f':
                ref = ref.split('.')[0];
                ref = `${ref}_sv_fr`
                break;
            default:
                ref = ref.split('.')[0];
                break;
        }

        let txt = document.querySelector('#input-txt').value
        if (!txt) { txt = "" }

        list.forEach((element) => {
            if (element.ref === ref) {
                newList = list.filter(elem => elem.url !== element.url);
                localStorage.clear()
            }
        })

        let merch = {
            url: myUrl,
            ref: ref,
            text: txt,
        }

        if (newList) {
            newList.push(merch)
            localStorage.setItem('list', JSON.stringify(newList))
            printList(newList)
        } else {
            list.push(merch)
            localStorage.setItem('list', JSON.stringify(list))
            printList(list)
        }


    }
    document.querySelector('#input-txt').value = ""
    document.querySelector('#input-url').value = ""
    document.querySelector('#input-url').focus()
}

createBtn.addEventListener('click', () => {
    document.querySelector('#input-url').value ? create() : ""
})

document.onkeyup = (event) => {
    if (event.key === "Enter") {
        create();
    }
};

initialSearch()