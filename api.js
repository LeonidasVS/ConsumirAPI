const API_URL = "https://localhost:7198";
var editar = false;
let botonActualizarExiste=document.getElementById("btnActualizar");

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
      }</td><td>${"$" + data[i].precio}</td><td>${data[i].stock}</td>
      <td><button type="button" class="btn btn-danger btnEliminar ">Eliminar</button></td>
      <td><a href="#"><button id="update" class="btn btn-primary btnEditar" type="button">Editar</button></a></td>
      </tr>
      `;
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
    }</td><td>${data.stock}</td>
     <td><button type="button" class="btn btn-danger btnEliminar">Eliminar</button></td>
      <td><a href="#"><button id="update" class="btn btn-primary btnEditar" type="button">Editar</button></a></td>
      </tr>`;

    document.getElementById("datos").innerHTML = body;
  };
}

if(botonActualizarExiste){
  document.getElementById("btnActualizar").addEventListener('click', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");
  
    const nombrepro = document.getElementById("nombreProducto").value;
    const preciopro = document.getElementById("precioProducto").value;
    const stockpro = document.getElementById("stockProducto").value;
  
    fetch(`${API_URL}/api/Actualizar`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        idProducto: id,
        nombre: nombrepro,
        precio: preciopro,
        stock: stockpro,
      }),
    })
      .then((response) => {
        if (response.ok) {
          alert("Producto actualizado");
          ObtenerListado();
          window.location.replace("http://127.0.0.1:5501/index.html#");
        } else {
          throw new Error("Error al insertar");
        }
      })
      .catch((error) => {
        alert(error);
      });
  });
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
          window.location.reload();
        } else {
          throw new Error("Error al insertar");
        }
      })
      .catch((error) => {
        alert(error);
      });
  }
}

//Eliminar Producto

function eliminarProducto(id) {
  if (confirm("¿Seguro que quiere eliminar este producto?")) {
    fetch(`${API_URL}/api/Eliminar/${id}`, {
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

//Obtener id producto
document.addEventListener("DOMContentLoaded", function () {
  let tabla = document.getElementById("tabla");

  tabla.addEventListener("click", function (event) {
    let botonID = event.target;
    let fila = botonID.closest("tr");
    let idProducto = fila.cells[0].textContent;
    if (event.target.classList.contains("btnEliminar")) {
      eliminarProducto(idProducto);
    } else if (event.target.classList.contains("btnEditar")) {
      editar = true;
      window.location.href = `http://127.0.0.1:5501/index2.html?id=${idProducto}&editar=${editar}`;
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const idProducto = urlParams.get("id");
  const poderEditar = urlParams.get("editar");

  if (idProducto && poderEditar) {
    document.getElementById("btnInsertar").style.display = "none";
    document.getElementById("btnActualizar").style.display = "block";
    fetch(`${API_URL}/api/Obtenerporid/${idProducto}`)
      .then((response) => response.json())
      .then((producto) => {
        document.getElementById("nombreProducto").value = producto.nombre;
        document.getElementById("precioProducto").value = producto.precio;
        document.getElementById("stockProducto").value = producto.stock;
      })
      .catch((error) => console.error("Error al buscar el producto:", error));
  }
});

ObtenerListado();
validarPorID();
