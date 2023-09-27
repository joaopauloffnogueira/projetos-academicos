
const form = document.querySelector("#formulario")
const listaDeItens = document.querySelector("#lista")
const listStorage = JSON.parse(localStorage.getItem("chave")) || []



listStorage.forEach(element => {
    createElementWeb(element)
});

form.addEventListener("submit", (evento)=>{
    evento.preventDefault();
    const nome = evento.target.elements["nome"].value
    const quantidade = evento.target.elements["quantidade"].value

    saveLocalStorage(nome, quantidade)

    evento.target.elements["nome"].value = ""
    evento.target.elements["quantidade"].value = ""
})

function saveLocalStorage(nome, quantidade){
    id = 0
    while(listStorage.find(element => element.id === id)){
        id++
    }
    const itens ={
        "id": id,
        "nome": nome,
        "quantidade": quantidade
    }
    listStorage.push(itens)
    localStorage.setItem("chave", JSON.stringify(listStorage))
    createElementWeb(itens)
}

function createElementWeb(item){
    const li = document.createElement("li")

    const strong = document.createElement("strong")
    strong.classList.add("quantidade-item")
    strong.dataset.id = item.id
    strong.innerHTML = item.quantidade

    const div = document.createElement("div")
    div.classList.add("container-buttons")

    li.appendChild(strong)
    li.innerHTML += item.nome
    div.appendChild(buttonEditar(item.id))
    div.appendChild(buttonDelete(item.id))
    li.appendChild(div)

    listaDeItens.appendChild(li)
}

function buttonEditar(id){
    const buttonEditar = document.createElement("button")
    buttonEditar.classList.add("editar")
    buttonEditar.innerHTML = "Editar"

    return buttonEditar
}



function buttonDelete(id){
    const buttonExcluir = document.createElement("button")
    buttonExcluir.classList.add("excluir")
    buttonExcluir.innerHTML = "Excluir"

    buttonExcluir.addEventListener("click", (evento)=>{
        deleta(evento.target.parentNode.parentNode, id)
    })

    return buttonExcluir
}
function deleta(item, id){
    item.remove()
    const index = listStorage.findIndex(element => element.id === id)
    listStorage.splice(index, 1)
    localStorage.setItem("chave", JSON.stringify(listStorage))
}

