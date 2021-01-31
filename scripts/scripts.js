const Modal = {
  toggle(className) {
    document.querySelector(className).classList.contains("active")
      ? document.querySelector(className).classList.remove("active")
      : document.querySelector(className).classList.add("active");
  },
};
const Storage = {
  get() {
    return JSON.parse(localStorage.getItem("ToDoApp:Tasks")) || [];
  },
  set(tasks) {
    localStorage.setItem("ToDoApp:Tasks", JSON.stringify(tasks));
  },
};
const Form = {
  description: document.querySelector("input#description"),
  getValue() {
    return { description: Form.description.value, status: "undone" };
  },
  validateFields() {
    const task = Form.getValue();
    if (task.description.trim() === "") {
      throw new Error("Preencha o campo");
    }
  },
  saveTask(task) {
    Task.add(task);
  },
  clearFields() {
    Form.description.value = "";
  },
  submit(event) {
    try {
      event.preventDefault();
      Form.validateFields();
      Form.saveTask(Form.getValue());
      Form.clearFields();
      Modal.toggle(".modalOverlay");
    } catch (error) {
      alert(error.message);
    }
  },
};
const Task = {
  all: Storage.get(),
  add(task) {
    Task.all.push(task);
    task.index = Task.all.indexOf(task);
    App.reload();
  },
  remove(index) {
    Task.all.splice(index, 1);
    App.reload();
  },
};
const DOM = {
  dataTable: document.querySelector("#dataTable"),

  htmlTask(task, index) {
    return `
        <p>${task.description}</p>
        <div>
          <span onclick="Task.remove(${index})"><img src="images/removeButton.svg" alt="Remover Tarefa"/></span
          >
          <span onclick="DOM.changeStatus(${index})">
          <img src="images/doneButton.svg" alt="Completar Tarefa"/>
          </span>
        </div>
      `;
  },
  addTaskInnerHTML(task, index) {
    const li = document.createElement("li");

    li.classList.add("listItem");

    li.innerHTML = DOM.htmlTask(task, index);

    DOM.dataTable.appendChild(li);
  },
  clearDataTable() {
    dataTable.innerHTML = "";
  },
  changeStatus(index) {
    Task.all[index].status = "done";
    console.log(Task.all[index], Task.all[index].status);
    DOM.changeColor(index);
  },
  changeColor(index) {
    if (Task.all[index].status == "done") {
      dataTable.children[index].classList.add("complete");
    }
  },
};
const App = {
  init() {
    Task.all.forEach((task, index) => {
      DOM.addTaskInnerHTML(task, index);
      DOM.changeColor(index);

      Storage.set(Task.all);
    });
  },
  reload() {
    DOM.clearDataTable();
    this.init();
  },
};
App.init();
