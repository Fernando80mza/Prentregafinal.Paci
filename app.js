document.addEventListener("DOMContentLoaded", function() {
   
    let reservas = [];
  
    
    function generarInterfazReservas() {
      const listaReservas = document.getElementById("lista-reservas");
      listaReservas.innerHTML = ""; 
  
      reservas.forEach(reserva => {
        const itemReserva = document.createElement("li");
        itemReserva.textContent = `Cliente: ${reserva.nombreCliente}, Habitación: ${reserva.tipoHabitacion}, Fechas: ${reserva.fechaCheckIn} - ${reserva.fechaCheckOut}`;
  
        listaReservas.appendChild(itemReserva);
      });
    }
  
    
    const formularioReserva = document.getElementById("formulario-reserva");
    formularioReserva.addEventListener("submit", function(event) {
      event.preventDefault(); 
  
      
      const nombreCliente = document.getElementById("nombre-cliente").value;
      const fechaCheckIn = document.getElementById("fecha-check-in").value;
      const fechaCheckOut = document.getElementById("fecha-check-out").value;
      const tipoHabitacion = document.getElementById("tipo-habitacion").value; 

      if (reservas.length >= 5) {
        alert("No hay lugar disponible para realizar más reservas.");
        return; 
      }
     
      const nuevaReserva = {
        nombreCliente,
        fechaCheckIn,
        fechaCheckOut,
        tipoHabitacion,
      };
  
     
      reservas.push(nuevaReserva);
      generarInterfazReservas();
  
      
      formularioReserva.reset();
    });
  
    
    const formularioBuscar = document.getElementById("formulario-buscar");
    formularioBuscar.addEventListener("submit", function(event) {
      event.preventDefault(); 
     
      const nombreCliente = document.getElementById("nombre-cliente-buscar").value;
  
     
      const reservaEncontrada = buscarReservaPorCliente(nombreCliente);
  
     
      if (reservaEncontrada) {
        alert(`Reserva encontrada:\nCliente: ${reservaEncontrada.nombreCliente}, Habitación: ${reservaEncontrada.tipoHabitacion}, Fechas: ${reservaEncontrada.fechaCheckIn} - ${reservaEncontrada.fechaCheckOut}`);
      } else {
        alert("No se encontró ninguna reserva para ese cliente.");
      }
  
      
      formularioBuscar.reset();
    });
  
   
    function buscarReservaPorCliente(nombre) {
      return reservas.find(reserva => reserva.nombreCliente === nombre);
    }
  
    
    function cargarReservasDesdeJSON(url) {
      fetch(url)
        .then(response => response.json())
        .then(data => {
          reservas = data;
          generarInterfazReservas();
        })
        .catch(error => {
          console.error("Error al cargar las reservas:", error);
        });
    }
  
   
    cargarReservasDesdeJSON("reservas.json");
  
   
    function limpiarReservas() {
      reservas = []; 
      generarInterfazReservas(); 
      guardarReservasEnStorage(); 
    }
  
   
    const botonLimpiarReservas = document.getElementById("boton-limpiar-reservas");
  
    
    botonLimpiarReservas.addEventListener("click", function(event) {
      event.preventDefault();
      limpiarReservas();
    });
  });
  