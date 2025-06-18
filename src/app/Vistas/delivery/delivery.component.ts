import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
// AÑADE ESTAS IMPORTACIONES
import { RouterLink, RouterLinkActive } from '@angular/router'; 
@Component({
  selector: 'app-delivery',
  standalone: true,
  // AÑADE RouterLink y RouterLinkActive AQUÍ
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.css']
})
export class DeliveryComponent {

  // Datos de ejemplo para poblar la tabla
  deliveries = [
    { id: 1, longitud: -58.417, latitud: -34.611, radio: '5 km', estado: 'Activo', nombreZona: 'Varela' },
    { id: 2, longitud: -70.669, latitud: -33.448, radio: '8 km', estado: 'Disponible', nombreZona: 'Tigre' },
    { id: 3, longitud: -74.072, latitud: 4.710, radio: '10 km', estado: 'Activo', nombreZona: 'La Matanza' }
  ];

  constructor() { }

  // Funciones para los botones de acción (por ahora solo muestran un mensaje)
  editarUbicacion(id: number) {
    console.log(`Editar ubicación para el ID: ${id}`);
  }

  editarEstado(id: number) {
    console.log(`Editar estado para el ID: ${id}`);
  }

  borrar(id: number) {
    console.log(`Borrar elemento con ID: ${id}`);
  }

  nuevoDelivery() {
    console.log('Crear nuevo delivery');
  }
}
