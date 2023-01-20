const form = document.getElementById("form");
const input = document.getElementById("input")
const listTasks = document.getElementById("list-tasks");
const template = document.getElementById("template").content;
const fragment = document.createDocumentFragment()
let tasks = {}

document.addEventListener("DOMContentLoaded", () =>{
   if(localStorage.getItem("tasks")){
    tasks = JSON.parse(localStorage.getItem("tasks"))
   }
   printTasks()
})

listTasks.addEventListener("click", e=>{btnAccion(e)})

form.addEventListener("submit", e =>{
    e.preventDefault()//para detener el comportamiento de que no se vea
    setTask(e)
})

const setTask = e =>{
const text = e.target.querySelector("input").value

if (text.trim() === "" ){
    console.log("empty")
    return
}
    const task = {
        id: Date.now(),
        text: text,
        state:false
    }

tasks[task.id] = task
printTasks()

form.reset();
e.target.querySelector("input").focus()
}

const printTasks = () =>{

    localStorage.setItem("tasks", JSON.stringify(tasks))

    if(Object.values(tasks).length === 0){
        listTasks.innerHTML = `
        <div class="alert alert-dark text-center">
            There are no pending tasks
        </div>
        `
        return
    }

    listTasks.innerHTML = ""
    Object.values(tasks).forEach(task =>{
        const clone = template.cloneNode(true)
        clone.querySelector("p").textContent = task.text

        if(task.state){
            clone.querySelector(".alert").classList.replace("alert-warning", "alert-primary");
            clone.querySelectorAll(".fas")[0].classList.replace("fa-check-circle", "fa-undo-alt")
            clone.querySelector("p").style.textDecoration = "line-through"
        }

        clone.querySelectorAll(".fas")[0].dataset.id = task.id
        clone.querySelectorAll(".fas")[1].dataset.id = task.id
        fragment.appendChild(clone)
    })
    listTasks.appendChild(fragment)
}

const btnAccion = e =>{
    if(e.target.classList.contains("fa-check-circle")){
        tasks[e.target.dataset.id].state = true
        printTasks()
    }

    if(e.target.classList.contains("fa-minus-circle")){
        delete tasks[e.target.dataset.id]
        printTasks()
    }

    if(e.target.classList.contains("fa-undo-alt")){
        tasks[e.target.dataset.id].state = false
        printTasks() 
    }


    e.stopPropagation()
}