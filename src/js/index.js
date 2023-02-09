const newName = document.getElementById("in_name");
const btn_add = document.getElementById("add");
const list = document.getElementById("list__content");
const control = document.getElementById("controller");

// Create local storage
document.addEventListener("DOMContentLoaded", function () {
  //localstorage
  const names = JSON.parse(localStorage.getItem("name_list"));

  // Validate if localstorage is empty
  if (!names || names <= 0) {
    const p = document.createElement("p");
    const content = document.createTextNode("Without names to show.");
    p.appendChild(content);
    list.appendChild(p);
  } else {
    for (let i = 0; i < names.length; i++) {
      showNames(names, i);
    }
  }

  // Add new name to local storage
  btn_add.addEventListener("click", function () {
    const names = JSON.parse(localStorage.getItem("name_list")) || [];
    const newItem = newName.value;

    // Validate if the input is empty
    if (newItem) {
      names.push(newItem);
      localStorage.setItem("name_list", JSON.stringify(names));

      newName.value = "";
      list.innerHTML = "";

      for (let i = 0; i < names.length; i++) {
        showNames(names, i);
      }
    } else {
      alert("Ups, You need to enter a name");
    }
  });
});

// Show names in local storage
function showNames(names, i) {
  const div = document.createElement("div");
  const btnContainer = document.createElement("div");
  const h4 = document.createElement("h4");
  const content = document.createTextNode(names[i]);
  h4.appendChild(content);

  // Create delete button
  const btnDel = document.createElement("button");
  const btnDelContent = document.createTextNode("Delete");
  btnDel.appendChild(btnDelContent);
  btnDel.classList.add("btn__delete");
  btnDel.onclick = () => {
    del(i);
  };

  // Create update button
  const btnUp = document.createElement("button");
  const btnUpContent = document.createTextNode("Update");
  btnUp.appendChild(btnUpContent);
  btnUp.classList.add("btn__update");

  // Add buttons to item container
  btnContainer.appendChild(btnUp);
  btnContainer.appendChild(btnDel);
  btnContainer.classList.add("btn__container");

  div.appendChild(h4);
  div.appendChild(btnContainer);

  list.appendChild(div);

  btnUp.onclick = () => {
    btnDel.style.backgroundColor = "gray";
    btnDel.style.color = "initial";
    btnDel.disabled = true;
    btnUp.style.backgroundColor = "gray";
    btnUp.style.color = "initial";
    btnUp.disabled = true;
    upd(i);
  };
}

// Delete an item in localstorage
function del(i) {
  let names = JSON.parse(localStorage.getItem("name_list")) || [];
  names.splice(i, 1);

  localStorage.setItem("name_list", JSON.stringify(names));

  //   Validate if localstorage is empty
  !names || names <= 0
    ? (list.innerHTML = "Without names to show.")
    : (list.innerHTML = "");

  for (let j = 0; j < names.length; j++) {
    showNames(names, j);
  }
}

// Update an item in localstorage
function upd(i) {
  let names = JSON.parse(localStorage.getItem("name_list")) || [];
  newName.value = names[i];
  btn_add.style.display = "none";

  // Create update button in controller section
  const btna = document.createElement("button");
  const btnaContent = document.createTextNode("Update");
  btna.appendChild(btnaContent);
  btna.classList.add("controller__btnUpdate");
  control.appendChild(btna);

  // Updating item in localstorage
  btna.onclick = () => {
    if (newName.value != "") {
      names[i] = newName.value;

      localStorage.setItem("name_list", JSON.stringify(names));

      list.innerHTML = "";

      for (let j = 0; j < names.length; j++) {
        showNames(names, j);
      }

      newName.value = "";
      btna.remove();
      btn_add.style.display = "initial";
    } else {
      alert("Ups, You need to enter a name");
    }
  };
}
