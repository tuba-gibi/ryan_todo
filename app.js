//! ******* ELEMENTS *******

const todoInput = document.getElementById("todo-input"); //? en hızlı getElementById çalışır !! ıd varsa tercih etmelisin !!! IQ
const addBtn = document.querySelector("#todo-button");
const todoUl = document.getElementById("todo-ul");

let todoList = JSON.parse(localStorage.getItem("todoList")) || [];

window.addEventListener("load", () => {
  getTodoListFromLocalStorage();
});

addBtn.addEventListener("click", (e) => {
  //*adds new todo to todo list
  e.preventDefault(); //? şimdilik formu submit etme, default unu prevent ediyorum .. button click gibi çalış ..
  if (todoInput.value.trim() == "") {
    alert("Please enter something");
    return;
  }
  // *   else { return u yapınca else e gerek kalmadı ( continue ya)
  //     alert("continue");
  //   }
  const newTodo = {
    id: new Date().getTime(), //*unique e yakın bir id oluyor(miliseconds)
    completed: false, //?ilk yazdıgımda yapılmamış olması lazım
    text: todoInput.value.trim(),
  };
  createTodo(newTodo);
  todoList.push(newTodo);
  //?localStorage todoList Update
  //?localStorage vs. SessionStorage vs. Cookies
  //!!!!!!!!stringify!!!!!!!!!
  localStorage.setItem("todoList", JSON.stringify(todoList));
  e.target.closest("form").reset();
});
//! ******************** FUNCTIONS *****************

const getTodoListFromLocalStorage = () => {
  //*gets todo list from local storage and add UI
  todoList.forEach((todo) => {
    createTodo(todo);
  });
};
const createTodo = (newTodo) => {
  //*adds new todo to todo list
  const { id, completed, text } = newTodo;
  const li = document.createElement("li");
  li.setAttribute("id", id);
  completed ? li.classList.add("checked") : "";
  li.classList.remove("checked");
  const icon = document.createElement("i");
  icon.setAttribute("class", "fas fa-check");

  li.appendChild(icon);
  const p = document.createElement("p");
  p.innerText = text;
  li.appendChild(p);

  const removeIcon = document.createElement("i");
  removeIcon.setAttribute("class", "fas fa-trash")
 li.appendChild(removeIcon);
  todoUl.prepend(li);
};


todoUl.addEventListener("click", (e) =>{
    const idAttr = e.target.closest("li").getAttribute("id")
    if(e.target.classList.contains("fa-check")){
        e.target.parentElement.classList.toggle("checked")
        todoList.forEach((todo) => {
            if(todo.id == isAttr){
                todo.completed =!todo.completed
            }
        })
        localStorage.setItem("todoList", JSON.stringify(todoList))
    }else if(e.target.classList.contains("fa-trash")){
        // alert("remove clicked")
        e.target.parentElement.remove() //?removed from UI , but still exists in the array !
        todoList = todoList.filter((todo) => todo.id != idAttr) //?remove from the array.id si silinmeyenleri ! filtreledi , silinen gitmiş oldu. !== desen yemiyorrr !
        localStorage.setItem("todoList", JSON.stringify(todoList))
    }else{
        alert("other element clicked")
    }
    console.log(todoList)

}
)