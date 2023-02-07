const newName = document.getElementById("in_name");
const btn_add = document.getElementById("add");
const list = document.getElementById("list__content");

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
    // if (n > 0) {
    for (let i = 0; i < names.length; i++) {
      showNames(names, i);
    }
    // } else
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
  const h4 = document.createElement("h4");
  const content = document.createTextNode(names[i]);
  h4.appendChild(content);

  const btn = document.createElement("button");
  const btnContent = document.createTextNode("Delete");
  btn.appendChild(btnContent);
  btn.onclick = () => {
    del(i);
  };

  div.appendChild(h4);
  div.appendChild(btn);

  list.appendChild(div);
}

// Delete an item in localstorage
function del(i) {
  var names = JSON.parse(localStorage.getItem("name_list")) || [];
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
