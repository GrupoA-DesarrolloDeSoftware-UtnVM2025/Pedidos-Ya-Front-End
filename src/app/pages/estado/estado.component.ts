import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-estado-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, RouterLinkActive],
  templateUrl: './estado.component.html',
  styleUrls: ['./estado.component.css']
})
export class EstadoFormComponent implements OnInit {
  
  deliveryId: string | null = null;
  estado = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute // ActivatedRoute nos permite leer la URL
  ) { }

  ngOnInit(): void {
    // Leemos el parámetro 'id' de la URL cuando el componente se carga
    this.deliveryId = this.route.snapshot.paramMap.get('id');
    console.log('Editando estado para el ID:', this.deliveryId);
    // En una aplicación real, usarías este ID para cargar los datos actuales del delivery desde la API.
    // Por ahora, lo dejamos vacío para que el usuario lo llene.
  }

  actualizarEstado() {
    console.log(`Actualizando estado para ID: ${this.deliveryId} a "${this.estado}"`);
    // Aquí llamarías a la API para guardar el nuevo estado.
    this.router.navigate(['/delivery']); // Navegamos de vuelta a la lista.
  }

  cancelar() {
    this.router.navigate(['/delivery']); // Navegamos de vuelta a la lista.
  }
}