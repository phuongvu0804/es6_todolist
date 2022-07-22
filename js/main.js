const getEle = id => document.getElementById(id)

const dateField = getEle('currentDate')
const addBtn = getEle('addItem')
let inputValue = ''
const todoField = getEle('todo')
const completedField = getEle('completed')

let todoArray = []
let completedArray = []

// Get current date
let today = new Date()
const dd = String(today.getDate()).padStart(2, '0')
var mm = String(today.getMonth() + 1).padStart(2, '0');
var yyyy = today.getFullYear()

today = dd + '/' + mm + '/' + yyyy
dateField.innerHTML = today

const render = (array, field) => {
    let htmls = array.map(job => 
        `<li value=${job} class="task">
            ${job}
            <div>
                <button class="list-btn remove" onclick="deleteTask(this)">
                    <i class="far fa-trash-alt"></i>
                </button>
                <button class="list-btn complete" onclick="checkTask(this)">
                    <i class="far fa-check-circle"></i>
                </button>
            </div>
        </li>` 
    ).join('')
    
    field.innerHTML = htmls
}


const saveLocalStorage = (job, key) => {
    const JSONjob = JSON.stringify(job)
    localStorage.setItem(key, JSONjob);

}

const getLocalStorage = () => {
    const todoStorage = localStorage.getItem('todo')
    const prevTodoList = JSON.parse(todoStorage) 

    const completedStorage = localStorage.getItem('completed')
    const prevcompletedList = JSON.parse(completedStorage) 

    prevTodoList ? todoArray = prevTodoList : []
    prevcompletedList? completedArray = prevcompletedList : []

}

getLocalStorage()

if (todoArray) {
    render(todoArray, todoField)
} 

if (completedArray) {
    render(completedArray, completedField)
}

//Add task
addBtn.addEventListener('click', () => {
    inputValue = getEle('newTask').value
    if(inputValue.trim() !== '') {
        todoArray.push(inputValue)
        getEle('newTask').value = ''
    }

    render(todoArray, todoField)
    saveLocalStorage(todoArray, 'todo')
})

//Check task
const checkTask = (value) => {
    const checkedTask = value.closest('.task')

    const checkedTaskValue = checkedTask.innerText.trim()
    
    todoArray= todoArray.filter( todo => todo !== checkedTaskValue)
    render(todoArray, todoField)
    saveLocalStorage(todoArray, 'todo')


    completedArray.push(checkedTaskValue)
    render(completedArray, completedField)
    saveLocalStorage(completedArray, 'completed')
}

// Delete task
const deleteTask = (value) => {
    const checkedTask = value.closest('.task')
    const checkedTaskValue = checkedTask.innerText.trim()

    const ulID = value.closest('.todo').getAttribute('id')

    if (ulID === 'todo') {
        todoArray = todoArray.filter( task => task !== checkedTaskValue)
        saveLocalStorage(todoArray, 'todo')
    } else {
        completedArray = completedArray.filter( task => task !== checkedTaskValue)
        saveLocalStorage(completedArray, 'completed') 
    }

    
    getEle(ulID).removeChild(checkedTask)
}

//Organize A -> Z
const filterA_Z = getEle('two')
filterA_Z.onclick = () => {
    todoArray = todoArray.sort()
    completedArray = completedArray.sort()

    render(todoArray, todoField)
    render(completedArray, completedField)

    saveLocalStorage(todoArray, 'todo')
    saveLocalStorage(completedArray, 'completed') 

}

//Organize Z -> A
const filterZ_A = getEle('three')
filterZ_A.onclick = () => {
    todoArray = todoArray.reverse()
    completedArray = completedArray.reverse()

    render(todoArray, todoField)
    render(completedArray, completedField)

    saveLocalStorage(todoArray, 'todo')
    saveLocalStorage(completedArray, 'completed') 

}

