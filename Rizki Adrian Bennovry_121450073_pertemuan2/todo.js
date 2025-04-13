document.addEventListener("DOMContentLoaded", function () {
  const addBtn = document.getElementById("add-todo");
  const todoInput = document.getElementById("todo-input");
  const datetimeInput = document.getElementById("todo-datetime");
  const todoList = document.getElementById("todo-list");

  // Event untuk tombol tambah
  addBtn.addEventListener("click", function () {
    const task = todoInput.value.trim();
    const datetimeValue = datetimeInput.value;

    if (task === "" || datetimeValue === "") {
      alert("Harap isi tugas dan waktu deadline!");
      return;
    }

    const date = new Date(datetimeValue);

    if (isNaN(date)) {
      alert("Format waktu tidak valid!");
      return;
    }

    const formattedDate = date.toLocaleString("id-ID", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    });

    const todoItem = document.createElement("div");
    todoItem.className = "list-group-item d-flex justify-content-between align-items-center mt-2";

    const text = document.createElement("span");
    text.innerHTML = `<strong>${task}</strong> - ${formattedDate}`;

    const editBtn = document.createElement("button");
    deleteBtn.className = "btn btn-danger btn-sm";
    deleteBtn.textContent = "Hapus";
    deleteBtn.addEventListener("click", function () {
      todoItem.remove();
    });

    editBtn.className = "btn btn-warning btn-sm";
    editBtn.textContent = "Edit";
    editBtn.addEventListener("click", function () {
      todoInput.value = task; // Set the input to the current task
      datetimeInput.value = datetimeValue; // Set the datetime input to the current datetime
      todoItem.remove(); // Remove the item from the list for now
    });

    todoItem.appendChild(text);
    todoItem.appendChild(editBtn);
    todoItem.appendChild(deleteBtn);
    todoList.appendChild(todoItem);

    // Reset input
    todoInput.value = "";
    datetimeInput.value = "";
  });
});
