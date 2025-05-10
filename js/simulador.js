const prestaciones = [
  {
    plan: 'Plan Pardo 🐻',
    consultas: '2',
    controles: '6',
    urgencias: '2',
    estudios: '2',
    internaciones: '1',
    descuentoMedicacion: '30%',
    descuentoArticulos: '10%',
  },
  {
    plan: 'Plan Polar 🐻‍❄️',
    consultas: '4',
    controles: '12',
    urgencias: '4',
    estudios: '3',
    internaciones: '1',
    descuentoMedicacion: '30%',
    descuentoArticulos: '10%',
  },
  {
    plan: 'Plan Panda 🐼',
    consultas: 'Sin tope',
    controles: 'Sin tope',
    urgencias: 'Sin tope',
    estudios: '6',
    internaciones: '1',
    descuentoMedicacion: '30%',
    descuentoArticulos: '10%',
  },
];

const precios = [20000, 30000, 40000];
const planes = ['Pardo 🐻', 'Polar 🐻‍❄️', 'Panda 🐼'];

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

  for (let i = 0; i < planes.length; i++) {
    const fila = document.createElement('tr');

    const celdaPlan = document.createElement('td');
    celdaPlan.textContent = planes[i];
    fila.appendChild(celdaPlan);

    const celdaPrecio = document.createElement('td');
    celdaPrecio.textContent = formatearPrecio(precios[i]);
    fila.appendChild(celdaPrecio);

    const celdaCantidad = document.createElement('td');
    celdaCantidad.innerHTML = `
      <button onclick="cambiarCantidad('${planes[i]}', -1)">-</button>
      <span id="${planes[i]}-cantidad">0</span>
      <button onclick="cambiarCantidad('${planes[i]}', 1)">+</button>
    `;
    fila.appendChild(celdaCantidad);

    cuerpo.appendChild(fila);
  }
}

function cambiarCantidad(plan, delta) {
  const spanCantidad = document.getElementById(`${plan}-cantidad`);
  let cantidadActual = parseInt(spanCantidad.textContent);
  let nuevaCantidad = cantidadActual + delta;

  if (nuevaCantidad < 0) nuevaCantidad = 0;
  spanCantidad.textContent = nuevaCantidad;
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
  const cantidadesPorPlan = planes.map(plan => {
    const cantidad = parseInt(document.getElementById(`${plan}-cantidad`).textContent);
    totalMascotas += cantidad;
    return cantidad;
  });

  planes.forEach((plan, index) => {
    const cantidad = cantidadesPorPlan[index];
    if (cantidad > 0) {
      const { totalSinDescuento, descuentoAplicado, totalFinal } = simularPlan(precios[index], cantidad, totalMascotas);

      const fila = document.createElement('tr');
      fila.innerHTML = `
        <td>${plan}</td>
        <td>${formatearPrecio(precios[index])}</td>
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
});

document.addEventListener('DOMContentLoaded', () => {
  cargarTablaPrestaciones();
  cargarTablaPlanes();
});