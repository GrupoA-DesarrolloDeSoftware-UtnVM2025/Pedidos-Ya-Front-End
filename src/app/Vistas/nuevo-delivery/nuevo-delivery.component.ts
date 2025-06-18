import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { FormsModule } from '@angular/forms'; // Importamos FormsModule para usar ngModel

@Component({
  selector: 'app-delivery-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, RouterLinkActive],
  templateUrl: './nuevo-delivery.component.html',
  styleUrls: ['./nuevo-delivery.component.css']
})
export class DeliveryFormComponent {
  // Objeto para almacenar los datos del formulario
  deliveryData = {
    personaId: '',
    longitud: '',
    latitud: '',
    radio: ''
  };

  constructor(private router: Router) { }

  // Función para el botón "Crear"
  crearDelivery() {
    console.log('Datos del nuevo delivery a crear:', this.deliveryData);
    // Aquí es donde harías la llamada a tu API para guardar los datos.
    // Después de guardar, navegamos de vuelta a la lista de delivery.
    this.router.navigate(['/delivery']);
  }

  // Función para el botón "Cancelar"
  cancelar() {
    // Simplemente navegamos de vuelta a la lista sin guardar nada.
    this.router.navigate(['/delivery']);
  }
}