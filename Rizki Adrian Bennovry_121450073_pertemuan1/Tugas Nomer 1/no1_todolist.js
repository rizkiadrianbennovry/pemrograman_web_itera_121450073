document.addEventListener("DOMContentLoaded", function() {
    const todoList = document.getElementById("todo-list");
    const todoInput = document.getElementById("todo-input");
    const todoAddButton = document.getElementById("todo-add");

    // Load data dari localStorage saat halaman dimuat
    if (localStorage.getItem("todos")) {
        todoList.innerHTML = localStorage.getItem("todos");
        addEventListeners();
    }

    todoAddButton.addEventListener("click", function() {
        const text = todoInput.value.trim();
        if (text === "") return;

        const li = document.createElement("li");
        li.innerHTML = `
            <span class="todo-text">${text}</span>
            <div>
                <button class="btn-selesai">✔</button>
                <button class="btn-hapus">❌</button>
            </div>
        `;
        todoList.appendChild(li);
        addEventListeners();
        simpanTodo();
        todoInput.value = "";
    });

    function addEventListeners() {
        document.querySelectorAll(".btn-selesai").forEach(button => {
            button.onclick = function() {
                const itemText = this.parentElement.parentElement.querySelector(".todo-text");
                itemText.classList.toggle("done");
                simpanTodo();
            };
        });

        document.querySelectorAll(".btn-hapus").forEach(button => {
            button.onclick = function() {
                this.parentElement.parentElement.remove();
                simpanTodo();
            };
        });
    }

    function simpanTodo() {
        localStorage.setItem("todos", todoList.innerHTML);
    }
});