import { Component, type OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from "@angular/forms"
import { Router, ActivatedRoute, RouterLink} from "@angular/router"

@Component({
  selector: "app-ubicacion-form",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: "./ubicacion.component.html",
  styleUrls: ["./ubicacion.component.css"],
})
export class UbicacionFormComponent implements OnInit {
  deliveryId: string | null = null
  ubicacionForm: FormGroup
  error = ""

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
  ) {
    this.ubicacionForm = this.fb.group({
      location: this.fb.group({
        latitude: ["", [Validators.required, Validators.min(-90), Validators.max(90)]],
        longitude: ["", [Validators.required, Validators.min(-180), Validators.max(180)]],
      }),
    })
  }

  // Helper methods to access form controls easily
  get location() {
    return this.ubicacionForm.get("location")
  }
  get latitude() {
    return this.ubicacionForm.get("location.latitude")
  }
  get longitude() {
    return this.ubicacionForm.get("location.longitude")
  }

  ngOnInit(): void {
    this.deliveryId = this.route.snapshot.paramMap.get("id")
    console.log("Editando ubicación para el ID:", this.deliveryId)
    // En una app real, usarías este ID para cargar la longitud y latitud actuales desde la API
  }

  actualizarUbicacion() {
    if (this.ubicacionForm.invalid) {
      this.error = "Por favor, completa todos los campos correctamente."
      this.ubicacionForm.markAllAsTouched()
      return
    }

    console.log(`Actualizando ubicación para ID: ${this.deliveryId} a`, this.ubicacionForm.value)
    // Aquí llamarías a la API para guardar los cambios
    this.router.navigate(["/delivery"])
  }

  cancelar() {
    this.router.navigate(["/delivery"])
  }
}
