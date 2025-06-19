import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router'; // Importa RouterLink para la navegación

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterLink], // Añade RouterLink a los imports
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  // Variable para controlar si la contraseña se muestra o no
  showPassword = false;

  constructor() { }

  // Función para alternar la visibilidad de la contraseña
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  // Función que se ejecuta al enviar el formulario
  crearCuenta(): void {
    // Aquí irá la lógica para registrar al usuario
    console.log("Intentando crear cuenta...");
  }
}