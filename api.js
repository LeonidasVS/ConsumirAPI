const API_URL = "https://localhost:7198";

//Obtener todos los productos

function ObtenerListado() {
  fetch(`${API_URL}/api/Listarproducto`)
    .then((response) => response.json())
    .then((data) => mostrarData(data))
    .catch((error) => console.log(error));

  const mostrarData = (data) => {
    console.log(data);
    let body = "";
    for (let i = 0; i < data.length; i++) {
      body += `<tr><td>${data[i].idProducto}</td><td>${
        data[i].nombre
      }</td><td>${"$" + data[i].precio}</td><td>${data[i].stock}</td></tr>`;
    }

    document.getElementById("datos").innerHTML = body;
  };

  document.getElementById("tabla").addEventListener("click", function (event) {
    let fila = event.target.parentNode;
    let idProducto = fila.cells[0].innerText;
    alert("ID obtenido es " + idProducto);
  });
}

//Buscar Por ID
function buscarProducto() {
  let id = document.getElementById("Productoid").value;

  fetch(`${API_URL}/api/Obtenerporid/${id}`)
    .then((response) => response.json())
    .then((data) => mostrarData(data))
    .catch((error) => alert("El ID no existe"));

  const mostrarData = (data) => {
    console.log(data);
    let body = "";
    body += `<tr><td>${data.idProducto}</td><td>${data.nombre}</td><td>${
      "$" + data.precio
    }</td><td>${data.stock}</td></tr>`;

    document.getElementById("datos").innerHTML = body;
  };
}


function ValidarInput() {
  const input = document.getElementById("Productoid");
  input.addEventListener("input", function () {
    if (input.value.trim() == "") {
      ObtenerListado();
    } else {
    console.log("Esta llleno")
    }
  });
}

ObtenerListado();
ValidarInput();