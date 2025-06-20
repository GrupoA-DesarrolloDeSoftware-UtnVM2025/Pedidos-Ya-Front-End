import { Component, type OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from "@angular/forms"
import { Router, ActivatedRoute } from "@angular/router"

@Component({
  selector: "app-estado-form",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: "./estado.component.html",
  styleUrls: ["./estado.component.css"],
})
export class EstadoFormComponent implements OnInit {
  deliveryId: string | null = null
  estadoForm: FormGroup
  error = ""

  // Add the status options
  statusOptions = ["Disponible", "En ruta"]

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
  ) {
    this.estadoForm = this.fb.group({
      status: ["", [Validators.required]],
    })
  }

  // Helper method to access form control easily
  get status() {
    return this.estadoForm.get("status")
  }

  ngOnInit(): void {
    this.deliveryId = this.route.snapshot.paramMap.get("id")
    console.log("Editando estado para el ID:", this.deliveryId)
    // En una aplicación real, usarías este ID para cargar los datos actuales del delivery desde la API.
  }

  actualizarEstado() {
    if (this.estadoForm.invalid) {
      this.error = "Por favor, selecciona un estado válido."
      this.estadoForm.markAllAsTouched()
      return
    }

    console.log(`Actualizando estado para ID: ${this.deliveryId} a "${this.estadoForm.value.status}"`)
    // Aquí llamarías a la API para guardar el nuevo estado.
    this.router.navigate(["/delivery"])
  }

  cancelar() {
    this.router.navigate(["/delivery"])
  }
}
