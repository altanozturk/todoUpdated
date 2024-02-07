
loadTodos();
eventListener();



function loadTodos() {

    var todos = getTodosFromLocalStorage();
    todos.forEach(element => {

        var newDiv = document.createElement("div");
        var newUl = document.createElement("ul");
        var newLi = document.createElement("li");
        var newBtn = document.createElement("button");
        var content = document.createTextNode(element);
        var btnContent = document.createTextNode("Delete");

        newBtn.appendChild(btnContent);
        newLi.appendChild(content);
        newUl.appendChild(newLi);
        newDiv.appendChild(newUl);
        newLi.appendChild(newBtn);

        document.body.appendChild(newDiv);

        newDiv.className = "card";
        newUl.className = "list-group list-group-flush";
        newLi.className = "list-group-item";
        newBtn.className = "btn btn-danger privBtn";

        newBtn.setAttribute("type", "button");
        newBtn.setAttribute("id", "deleteBtn");
        newBtn.addEventListener("click", deleteTodo);

    });
}

function eventListener() {
    document.getElementById("addBtn").addEventListener("click", addTodo);
    document.getElementById("deleteAllBtn").addEventListener("click", deleteAllTodo);
}


function addTodo() {

    value = document.getElementById("todoInput").value;
    if (!value) {
        alert("Lütfen geçerli bir değer girin..")
    }
    else {
        console.log(value);
        addTodoToLocalStorage(value);

    }


}

function deleteTodo(e) {

    var deleteElement = e.target.parentElement;
    var todoName = e.target.parentElement.innerText.split('Delete')[0].trim();

    

    var todos = getTodosFromLocalStorage();
    if (confirm(`Are you sure you want to delete ${todoName}?`)) {
        todos.forEach((item, index) => {
            if (item === todoName) {
                todos.splice(index, 1);
            }

        });

        localStorage.setItem("todos", JSON.stringify(todos));
        deleteElement.remove();

    }


}

function getTodosFromLocalStorage() {

    var todos = JSON.parse(localStorage.getItem("todos")) || []; // todos anahtarın bulunmuyor yani boş ise [] döndür
    return todos;

};

function addTodoToLocalStorage(value) {

    var todos = getTodosFromLocalStorage();
    todos.push(value);
    console.log(todos);
    localStorage.setItem("todos", JSON.stringify(todos));

}

function deleteAllTodo() {
    if (confirm("Are you sure you want to delete all todos?")) {
        localStorage.clear();
        console.log("All todos deleted!");
    }
}


