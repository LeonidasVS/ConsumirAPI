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

    body = `<tr><td>${data.idProducto}</td><td>${data.nombre}</td><td>${
      "$" + data.precio
    }</td><td>${data.stock}</td></tr>`;

    document.getElementById("datos").innerHTML = body;
  };
}

//Eliminar Producto
function eliminarProducto() {
  let ideliminado = document.getElementById("Productoid").value;

  if (ideliminado.length > 0) {
    if (confirm("¿Seguro que quiere eliminar este producto?")) {
      fetch(`${API_URL}/api/Eliminar/${ideliminado}`, {
        method: "DELETE",
      }).then((response) => {
        if (response.ok) {
          alert("Producto Eliminado");
          ObtenerListado();
        } else {
          alert("El producto es inexistente");
        }
      });
    } else {
      alert("Ok entiendo!");
    }
  } else {
    alert("Ingresa un ID a eliminar");
  }
}

//Insertar Producto
function insertarProducto() {
  const nombrepro = document.getElementById("nombreProducto").value;
  const preciopro = document.getElementById("precioProducto").value;
  const stockpro = document.getElementById("stockProducto").value;

  if (
    nombrepro == "" ||
    preciopro == "" ||
    preciopro <= 0 ||
    stockpro == "" ||
    stockpro <= 0
  ) {
    alert("Hay campos que no cumplen");
  } else {
    fetch(`${API_URL}/api/Insertar`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nombre: nombrepro,
        precio: preciopro,
        stock: stockpro,
      }),
    })
      .then((response) => {
        if (response.ok) {
          alert("Producto insertado");
          ObtenerListado();
        } else {
          throw new Error("Error al insertar");
        }
      })
      .catch((error) => {
        alert(error);
      });
  }
}


//Validar buscador de ID
function validarPorID() {
  const input = document.getElementById("Productoid");
  input.addEventListener("input", function () {
    if (input.value.trim() == "") {
      ObtenerListado();
    } else {
      console.log("Esta llleno");
    }
  });
}

ObtenerListado();
validarPorID();
