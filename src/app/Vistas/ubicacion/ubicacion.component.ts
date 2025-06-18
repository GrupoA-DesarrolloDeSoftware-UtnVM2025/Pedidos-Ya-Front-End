import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-ubicacion-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, RouterLinkActive],
  templateUrl: './ubicacion.component.html',
  styleUrls: ['./ubicacion.component.css']
})
export class UbicacionFormComponent implements OnInit {

  deliveryId: string | null = null;
  ubicacion = {
    longitud: '',
    latitud: ''
  };

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.deliveryId = this.route.snapshot.paramMap.get('id');
    console.log('Editando ubicación para el ID:', this.deliveryId);
    // En una app real, usarías este ID para cargar la longitud y latitud actuales desde la API
  }

  actualizarUbicacion() {
    console.log(`Actualizando ubicación para ID: ${this.deliveryId} a`, this.ubicacion);
    // Aquí llamarías a la API para guardar los cambios
    this.router.navigate(['/delivery']);
  }

  cancelar() {
    this.router.navigate(['/delivery']);
  }
}