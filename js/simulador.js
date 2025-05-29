let prestaciones = [];
let planes = [];

function formatearPrecio(valor) {
  return `$${valor.toLocaleString('es-AR')}`;
}

function cargarTablaPrestaciones() {
  const cuerpo = document.querySelector('#tablaPrestaciones tbody');
  cuerpo.innerHTML = '';

  const campos = [
    { key: 'consultas', label: 'Consultas (de 10 a 19hs)' },
    { key: 'controles', label: 'Controles (de 10 a 19hs)' },
    { key: 'urgencias', label: 'Urgencias (de 19hs a 10hs)' },
    { key: 'estudios', label: 'Estudios de baja complejidad: Laboratorio, ecografía, radiología' },
    { key: 'internaciones', label: 'Internaciones' },
    { key: 'descuentoMedicacion', label: 'Descuento en medicación ambulatoria' },
    { key: 'descuentoArticulos', label: 'Descuento en artículos de nuestra tienda' },
  ];

  campos.forEach(campo => {
    const fila = document.createElement('tr');
    const celdaTitulo = document.createElement('td');
    celdaTitulo.textContent = campo.label;
    fila.appendChild(celdaTitulo);

    prestaciones.forEach(plan => {
      const celda = document.createElement('td');
      celda.textContent = plan[campo.key];
      fila.appendChild(celda);
    });

    cuerpo.appendChild(fila);
  });
}

function cargarTablaPlanes() {
  const cuerpo = document.querySelector('#tablaDatosSimulador tbody');
  cuerpo.innerHTML = '';

  const cantidadesGuardadas = JSON.parse(localStorage.getItem('cantidadesPlanes')) || {};

  planes.forEach((item) => {
    const fila = document.createElement('tr');

    const celdaPlan = document.createElement('td');
    celdaPlan.textContent = item.plan;
    fila.appendChild(celdaPlan);

    const celdaPrecio = document.createElement('td');
    celdaPrecio.textContent = formatearPrecio(item.precio);
    fila.appendChild(celdaPrecio);

    const cantidadActual = cantidadesGuardadas[item.plan] || 0;

    const celdaCantidad = document.createElement('td');
    celdaCantidad.innerHTML = `
      <button onclick="cambiarCantidad('${item.plan}', -1)">-</button>
      <span id="${item.plan}-cantidad">${cantidadActual}</span>
      <button onclick="cambiarCantidad('${item.plan}', 1)">+</button>
    `;
    fila.appendChild(celdaCantidad);

    cuerpo.appendChild(fila);
  });
}

function cambiarCantidad(plan, delta) {
  const spanCantidad = document.getElementById(`${plan}-cantidad`);
  let cantidadActual = parseInt(spanCantidad.textContent);
  let nuevaCantidad = cantidadActual + delta;
  if (nuevaCantidad < 0) nuevaCantidad = 0;
  spanCantidad.textContent = nuevaCantidad;

  const cantidadesGuardadas = JSON.parse(localStorage.getItem('cantidadesPlanes')) || {};
  cantidadesGuardadas[plan] = nuevaCantidad;
  localStorage.setItem('cantidadesPlanes', JSON.stringify(cantidadesGuardadas));
}

function simularPlan(precioBase, cantidad, totalMascotas) {
  let descuento = 0;
  if (totalMascotas === 2) descuento = 0.10;
  else if (totalMascotas >= 3) descuento = 0.20;

  const total = precioBase * cantidad;
  const totalConDescuento = total - total * descuento;

  return {
    totalSinDescuento: total,
    descuentoAplicado: descuento,
    totalFinal: totalConDescuento,
  };
}

document.getElementById('simular').addEventListener('click', () => {
  const cuerpoResultado = document.querySelector('#resultado tbody');
  cuerpoResultado.innerHTML = '';

  let totalMascotas = 0;
  const cantidadesPorPlan = planes.map(item => {
    const cantidad = parseInt(document.getElementById(`${item.plan}-cantidad`).textContent);
    totalMascotas += cantidad;
    return cantidad;
  });

  planes.forEach((item, index) => {
    const cantidad = cantidadesPorPlan[index];
    if (cantidad > 0) {
      const { totalSinDescuento, descuentoAplicado, totalFinal } = simularPlan(item.precio, cantidad, totalMascotas);

      const fila = document.createElement('tr');
      fila.innerHTML = `
        <td>${item.plan}</td>
        <td>${formatearPrecio(item.precio)}</td>
        <td>${cantidad}</td>
        <td>${(descuentoAplicado * 100).toFixed(0)}%</td>
        <td>${formatearPrecio(totalFinal)}</td>
      `;
      cuerpoResultado.appendChild(fila);
    }
  });
});

document.getElementById('contratar').addEventListener('click', () => {
  const datos = {
    nombre: document.getElementById('nombre').value,
    apellido: document.getElementById('apellido').value,
    documento: document.getElementById('documento').value,
    domicilio: document.getElementById('domicilio').value,
    telefono: document.getElementById('telefono').value,
    email: document.getElementById('email').value,
  };
  localStorage.setItem('datosPropietario', JSON.stringify(datos));
  Swal.fire("Sabemos que amás a tus mascotas.<br>uchas gracias por confiar en PETMED!");
});

function cargarDatosPropietario() {
  const datosGuardados = JSON.parse(localStorage.getItem('datosPropietario'));
  if (datosGuardados) {
    document.getElementById('nombre').value = datosGuardados.nombre || '';
    document.getElementById('apellido').value = datosGuardados.apellido || '';
    document.getElementById('documento').value = datosGuardados.documento || '';
    document.getElementById('domicilio').value = datosGuardados.domicilio || '';
    document.getElementById('telefono').value = datosGuardados.telefono || '';
    document.getElementById('email').value = datosGuardados.email || '';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  fetch('../db/data.json')
    .then(response => response.json())
    .then(data => {
      prestaciones = data.prestaciones;
      planes = data.planes;
      cargarTablaPrestaciones();
      cargarTablaPlanes();
      cargarDatosPropietario();
    })
    .catch(error => {
      console.error('Error al cargar los datos:', error);
    });
});
