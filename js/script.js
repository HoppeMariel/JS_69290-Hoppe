
const planes = ["A", "B", "C"];
const precios = [20000, 30000, 40000];
let cantidadMascotas = 0;
let planElegido = "";
let precioFinal = 0;

// function solicitarDatos() {
//   alert("Bienvenido a PetMed!\nTe invitamos a simular el plan veterinario ideal para tus mascotas");
    
//   planElegido = prompt("Ingresar el plan que desea contratar: \n A - Pardo $20.000 \n B - Polar $30.000 \n C - Panda $40.000").toUpperCase();
    
//   while (!planes.includes(planElegido)) {
//     planElegido = prompt("El plan elegido no es válido. Ingresar:\n A - Pardo $10.000 \n B - Polar $20.000 \n C - Panda $30.000").toUpperCase();
//   }

//   cantidadMascotas = parseInt(prompt("Ingresar la cantidad de mascotas"));

//   while (isNaN(cantidadMascotas) || cantidadMascotas < 1) {
//     cantidadMascotas = parseInt(prompt("El número ingresado no es válido.\nPor favor, ingresar como mínimo 1 mascota."));
//   }
// }

// function simularPlan(plan, cantidad) {
//   let indicePlan = planes.indexOf(plan);
//   let precioBase = precios[indicePlan];
//   let descuento = 0;

//   if (cantidad === 1) {
//     descuento = 0.05;
//   } else if (cantidad === 2) {
//     descuento = 0.10;
//   } else if (cantidad >= 3) {
//     descuento = 0.20;
//   }

//   let total = precioBase * cantidad;
//   let totalConDescuento = total - (total * descuento);

//   return {
//     totalSinDescuento: total,
//     descuentoAplicado: descuento,
//     totalFinal: totalConDescuento
//   };
// }

// function mostrarResultado(resultado) {
//   console.log("Resumen del plan médico para mascotas:");
//   console.log("Plan elegido: " + planElegido);
//   console.log("Cantidad de mascotas: " + cantidadMascotas);
//   console.log("Total sin descuento: $" + resultado.totalSinDescuento.toFixed(2));
//   console.log("Descuento aplicado: " + (resultado.descuentoAplicado * 100) + "%");
//   console.log("Total final a pagar: $" + resultado.totalFinal.toFixed(2));
//   alert("Por favor, revisá la consola para ver el detalle del plan.");
// }

// function iniciarSimulador() {
//   let continuar = true;

//   while (continuar) {
//     solicitarDatos();
//     let resultado = simularPlan(planElegido, cantidadMascotas);
//     mostrarResultado(resultado);
//     continuar = confirm("Desea realizar otra simulación?");
//   }

//   alert("Gracias por utilizar nuestro simulador de planes médicos para mascotas!");
// }

// iniciarSimulador();