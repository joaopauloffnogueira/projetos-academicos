 
/* ==================================== Código JS do Formulario ==================================== */


// ===================== Variaveis do JS =====================

const buttonAddTask = document.querySelector(".app__button--add-task")
const formTask = document.querySelector(".app__form-add-task")
const formButtonCancel = document.querySelector(".app__form-footer__button--cancel")
const titleForm = document.querySelector(".app__form-label")



const listTask = document.querySelector(".app__section-task-list")
const listLocalStorage = JSON.parse(localStorage.getItem("key")) || []



/* ================================================================================================ */

/* ==================================== Eventos do JS ==================================== */

// ===================== Exibir Tarefas do LocalStorage na Web =====================

listLocalStorage.forEach(element => {
    createTaskWeb(element)
});

// ===================== Abrir Formulario Pegar dados do Formulario =====================

buttonAddTask.addEventListener("click", ()=>{
    formTask.classList.remove("hidden")
    titleForm.textContent = "Adicionando tarefa"

    formTask.addEventListener("submit", (evento)=>{
        evento.preventDefault()
        const taskName = evento.target.elements["form-textarea"]
        createObjectTask(taskName.value)
        taskName.value = " "
    })
})

// ===================== Botao de Cancelar/Fechar Formulario =====================

formButtonCancel.addEventListener("click", ()=>{
    formTask.classList.add("hidden")
})

/* ================================================================================================ */

/* ==================================== Funções do JS ==================================== */

// ===================== Criando Objeto da Tarefa =====================

function createObjectTask(taskName){
    let id = 0
    while(listLocalStorage.find(element => element.id === id)){
        id++
    }
    const task = {
        id: id,
        name: taskName,
        completed: false
    }
    saveLocalStorage(task)
    createTaskWeb(task)
}

// ===================== Salvar e Enviar para o LocalStorage =====================

function saveLocalStorage(task){
    listLocalStorage.push(task)
    localStorage.setItem("key", JSON.stringify(listLocalStorage))
}

// ===================== Exibir no Site a Tarefa =====================

function createTaskWeb(task) {
    const li = document.createElement("li")
    li.classList.add("app__section-task-list-item")

    const iconCheck = document.createElement("i")
    iconCheck.classList.add("ri-check-line")

    const iconEdit = document.createElement("i")
    iconEdit.classList.add("ri-pencil-fill")

    const paragraph = document.createElement("p")
    paragraph.classList.add("app__section-task-list-item-description")
    paragraph.textContent = task.name

    selectTask(li, task)
    completedTask(iconCheck, li, task)
    editTask(iconEdit, task, li)

    li.appendChild(iconCheck)
    li.appendChild(paragraph)
    li.appendChild(iconEdit)

    listTask.appendChild(li)
}

// ===================== Selecionar  Tarefa =====================

function selectTask(li, task){
    
    li.addEventListener("click", (evento)=>{
        const tasks = document.querySelectorAll(".app__section-task-list-item")
        tasks.forEach(element => {
            element.classList.remove("app__section-task-list-item-active")
        });

        li.classList.add("app__section-task-list-item-active")
        const taskInProgress = document.querySelector(".app__section-active-task-description")
        taskInProgress.textContent = task.name
    })
}

// ===================== Completar Tarefa =====================

function completedTask(iconCheck, li, task) {
    iconCheck.addEventListener("click", ()=>{

        li.classList.toggle("app__section-task-list-item-complete")
        iconCheck.classList.toggle("icon-completed")
        
        const taskSearch = listLocalStorage.find(element => element.name === task.name)
        if(taskSearch){
            if(task.completed === false){
                task.completed = true
            } else {
                task.completed = false
            }
            localStorage.setItem("key", JSON.stringify(listLocalStorage))
        }
    })
}

// ===================== Editar Tarefa =====================

function editTask(iconEdit, task, li) {
    iconEdit.addEventListener("click", ()=>{
        formTask.classList.remove("hidden")
        titleForm.textContent = "Editando tarefa"
        const taskName = formTask.elements["form-textarea"]
        taskName.value = task.name

        formTask.onsubmit = (evento)=>{
            evento.preventDefault()
            const taskSearch = listLocalStorage.find(element => element.name === task.name)
            if(taskSearch){
                taskSearch.name = taskName.value
                localStorage.setItem("key", JSON.stringify(listLocalStorage))
                const paragraph = li.querySelector(".app__section-task-list-item-description")
                paragraph.textContent = taskName.value
            }
            formTask.classList.add("hidden")
            formTask.onsubmit = null
        }
    })
}