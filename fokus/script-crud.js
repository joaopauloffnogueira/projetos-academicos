
// Referencias/Elementos do HTML

const elementHtml = {
    // Elementos do formulario
    buttonOpenForm: document.querySelector(".app__button--add-task"),
    form: document.querySelector(".app__form-add-task"),
    formLabel: document.querySelector(".app__form-label"),
    formTextarea: document.querySelector(".app__form-textarea"),
    buttonCancelForm: document.querySelector(".app__form-footer__button--cancel"),
    buttonDeleteForm: document.querySelector(".app__form-footer__button--delete"),
    buttonDeletTasksCompleted: document.querySelector('#btn-remover-concluidas'),
    buttonDeletTasksAll: document.querySelector('#btn-remover-todas'),

    // Elemento da lista UL de tarefas
    listTask: document.querySelector(".app__section-task-list"),

    // Elemento do paragrafo que exibe a tarefa do momento
    taskMomentActive: document.querySelector(".app__section-active-task-description")
}

// Array para armazenar tarefas no localStorage
let listTaskStorage = JSON.parse(localStorage.getItem("key")) || []

let taskSelect = null // Variavel para tarefa selecionada
let taskitemSelect = null

let editTask = null
let paragraphEdit = null

let iconCheckCompleted = null

// ================================================================================================================

// Criação de tarefas
function createTask(task) {
    const li = document.createElement("li")
    li.classList.add("app__section-task-list-item")

    const iconCheck = document.createElement("i")
    iconCheck.classList.add("ri-check-line")

    if (task.completed) {
        li.classList.add('app__section-task-list-item-complete');
        iconCheck.classList.add("icon-completed");
    }

    const paragraph = document.createElement("p")
    paragraph.classList.add("app__section-task-list-item-description")
    paragraph.textContent = task.description

    const iconEdit = document.createElement("i")
    iconEdit.classList.add("ri-edit-2-fill")

    iconCheck.addEventListener("click", () => {
        taskCompleted(iconCheck, li, task)
    })
    li.addEventListener("click", () => {
        selectTask(li, task, iconCheck)
    })
    iconEdit.addEventListener("click", () => {
        taskEdit(task, paragraph)
    })

    li.appendChild(iconCheck)
    li.appendChild(paragraph)
    li.appendChild(iconEdit)

    elementHtml["listTask"].appendChild(li)
}

// ================================================================================================================

// Salvar/Enviar para o localStorage
function updateLocalStorage() {
    localStorage.setItem("key", JSON.stringify(listTaskStorage))
}

// ================================================================================================================

// Limpar Formulario
function clearForm() {
    editTask = null
    paragraphEdit = null
    elementHtml["formTextarea"].value = " "
    elementHtml["form"].classList.add("hidden")
}

// ================================================================================================================

// Selecionar Tarefa

function selectTask(li, task, iconCheck) {
    iconCheckCompleted = iconCheck
    if(task.completed){
        li.classList.remove("app__section-task-list-item-active")
        return
    }
    const tasks = document.querySelectorAll(".app__section-task-list-item")
    tasks.forEach(element => {
        element.classList.remove("app__section-task-list-item-active")
    });

    if (taskSelect === task) {
        elementHtml["taskMomentActive"].textContent = null
        taskSelect = null
        taskitemSelect = null
    } else {
        taskSelect = task
        taskitemSelect = li
        elementHtml["taskMomentActive"].textContent = task.description
        li.classList.add("app__section-task-list-item-active")
    }
}

// ================================================================================================================

// Editar Tarefa

function taskEdit(task, paragraph) {

    if (editTask === task) {
        clearForm()
        return
    }

    elementHtml["form"].classList.remove("hidden")
    elementHtml["formLabel"].textContent = "Editando Tarefa"
    elementHtml["formTextarea"].value = task.description

    editTask = task
    paragraphEdit = paragraph
}

// ================================================================================================================

// Completar Tarefa
let taskComplet = null
function taskCompleted(iconCheck, li, task) {
    if(task === taskSelect){
        li.classList.add('app__section-task-list-item-complete')
        iconCheck.classList.add("icon-completed")
        taskSelect.completed = true
        updateLocalStorage()
    } else{
        li.classList.add('app__section-task-list-item-complete')
        iconCheck.classList.add("icon-completed")
    }
}

// ================================================================================================================

// Exibir as tarefas na pagina
listTaskStorage.forEach(element => {
    createTask(element)
    
});

// ================================================================================================================

// Abrir formulario
elementHtml["buttonOpenForm"].addEventListener("click", () => {
    clearForm()
    elementHtml["formLabel"].textContent = "Adicionando Tarefa"
    elementHtml["form"].classList.remove("hidden")
    elementHtml["formTextarea"].value = " "
})



// ================================================================================================================

// Cancelar formulario
elementHtml["buttonCancelForm"].addEventListener("click", () => {
    clearForm()
})

// ================================================================================================================

// Deletar tarefa selecionada
elementHtml["buttonDeleteForm"].addEventListener("click", ()=>{
    if(taskSelect){
        const index = listTaskStorage.indexOf(taskSelect)
        if(index !== -1){
            listTaskStorage.splice(index, 1)
        }
        taskitemSelect.remove()
        listTaskStorage.filter(t=> t!= taskSelect)
        taskitemSelect = null
        taskSelect = null
    }
    updateLocalStorage()
    clearForm()
})

// ================================================================================================================

// Deletar tarefas concluidas e todas as tarefas
function deletTasksCompleted(somenteConcluidas){
    const selector = somenteConcluidas ? '.app__section-task-list-item-complete' : '.app__section-task-list-item'
    document.querySelectorAll(selector).forEach((element) => {
        element.remove()
    });
    listTaskStorage = somenteConcluidas ? listTaskStorage.filter(t => !t.completed) : []
    updateLocalStorage()
}

elementHtml["buttonDeletTasksCompleted"].addEventListener('click', () => deletTasksCompleted(true))
elementHtml["buttonDeletTasksAll"].addEventListener('click', () => deletTasksCompleted(false))


// ================================================================================================================

// Formulario
elementHtml["form"].addEventListener("submit", (event) => {
    event.preventDefault()
    if (editTask) {
        editTask.description = elementHtml["formTextarea"].value
        paragraphEdit.textContent = elementHtml["formTextarea"].value
    } else {
        const task = {
            description: elementHtml["formTextarea"].value,
            completed: false
        }
        listTaskStorage.push(task)
        createTask(task)
    }

    updateLocalStorage()
    clearForm()
})

document.addEventListener("taskFinish", (e)=>{
    if(taskSelect){
        taskSelect.completed = true
        taskitemSelect.classList.add("app__section-task-list-item-complete")
        iconCheckCompleted.classList.add("icon-completed")
        selectTask(taskitemSelect, taskSelect)
        updateLocalStorage()
    }
})





