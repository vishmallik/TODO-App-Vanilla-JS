function main() {
  let allTodos = JSON.parse(localStorage.getItem("todos")) || [];
  let rootElm = document.querySelector(".rootelm");
  let inputText = document.querySelector(
    `input[placeholder="What needs to be done?"]`
  );
  let statusbar = document.querySelector(".status");
  let tab = document.querySelector(".tab");

  let all = document.querySelector(".all");
  let active = document.querySelector(".active");
  let completed = document.querySelector(".completed");
  let clear = document.querySelector(".clear");

  function handleDelete(event) {
    let id = event.target.dataset.id;
    allTodos.splice(id, 1);
    localStorage.setItem("todos", JSON.stringify(allTodos));
    createUI(allTodos, rootElm);

    if (rootElm.childElementCount === 0) {
      statusbar.style.display = "none";
    }
  }
  function handleToggle(event) {
    let id = event.target.dataset.id;
    allTodos[id].isDone = !allTodos[id].isDone;
    localStorage.setItem("todos", JSON.stringify(allTodos));
    createUI(allTodos, rootElm);
  }

  function createUI(data = allTodos, root) {
    let count = 0;

    root.innerHTML = "";
    data.forEach((todo, index) => {
      let li = document.createElement("li");

      let checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = todo.isDone;
      checkbox.setAttribute("data-id", index);
      checkbox.addEventListener("input", handleToggle);
      checkbox.style.visibility = "visible";

      let span = document.createElement("span");
      span.innerText = todo.name;

      if (todo.isDone) {
        span.style.textDecoration = "line-through";
        span.style.color = "lightgrey";
        statusbar.lastElementChild.style.visibility = "visible";
        if ((data = allTodos)) {
          count--;
        }
      }

      let i = document.createElement("i");
      i.classList.add("fa-solid");
      i.classList.add("fa-xmark");
      i.style.visibility = "visible";
      i.setAttribute("data-id", index);
      i.addEventListener("click", handleDelete);

      li.append(checkbox, span, i);

      root.append(li);
      count++;
      statusbar.style.display = "flex";
      statusbar.children[0].innerText = `${count} Item left`;
    });
  }

  createUI(allTodos, rootElm);

  function handleInput(event) {
    let value = event.target.value;
    if (event.keyCode === 13 && value !== "") {
      let todo = {
        name: value,
        isDone: false,
      };
      allTodos.push(todo);
      localStorage.setItem("todos", JSON.stringify(allTodos));
      event.target.value = "";
      createUI(allTodos, rootElm);
    }
  }

  clear.addEventListener("click", () => {
    allTodos = allTodos.filter((todo) => !todo.isDone);
    createUI(allTodos, rootElm);
    localStorage.setItem("todos", JSON.stringify(allTodos));

    if (rootElm.childElementCount === 0) {
      statusbar.style.display = "none";
    }
  });

  active.addEventListener("click", () => {
    let notCompleted = allTodos.filter((todo) => !todo.isDone);
    createUI(notCompleted, rootElm);
    updateActiveButton("active");
  });

  completed.addEventListener("click", () => {
    let completedTodo = allTodos.filter((todo) => todo.isDone);
    createUI(completedTodo, rootElm);
    updateActiveButton("completed");
  });

  all.addEventListener("click", () => {
    createUI(allTodos, rootElm);
    updateActiveButton("all");
  });

  updateActiveButton("all");

  function updateActiveButton(btn = "all") {
    all.classList.remove("selected");
    active.classList.remove("selected");
    completed.classList.remove("selected");

    if (btn === "all") {
      all.classList.add("selected");
    } else if (btn === "active") {
      active.classList.add("selected");
    } else if (btn === "completed") {
      completed.classList.add("selected");
    }
  }

  inputText.addEventListener("keyup", handleInput);
}

main();
