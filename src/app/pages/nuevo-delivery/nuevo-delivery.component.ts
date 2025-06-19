import { Component } from "@angular/core"
import { CommonModule } from "@angular/common"
import { Router, RouterLink } from "@angular/router"
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from "@angular/forms"

@Component({
  selector: "app-delivery-form",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: "./nuevo-delivery.component.html",
  styleUrls: ["./nuevo-delivery.component.css"],
})
export class DeliveryFormComponent {
  deliveryForm: FormGroup
  error = ""

  constructor(
    private router: Router,
    private fb: FormBuilder,
  ) {
    this.deliveryForm = this.fb.group({
      personaId: ["", [Validators.required, Validators.min(1)]],
      location: this.fb.group({
        latitude: ["", [Validators.required, Validators.min(-90), Validators.max(90)]],
        longitude: ["", [Validators.required, Validators.min(-180), Validators.max(180)]],
      }),
      radius: ["", [Validators.required, Validators.min(0.1)]],
    })
  }

  // Helper methods to access form controls easily
  get personaId() {
    return this.deliveryForm.get("personaId")
  }
  get location() {
    return this.deliveryForm.get("location")
  }
  get latitude() {
    return this.deliveryForm.get("location.latitude")
  }
  get longitude() {
    return this.deliveryForm.get("location.longitude")
  }
  get radius() {
    return this.deliveryForm.get("radius")
  }

  crearDelivery() {
    if (this.deliveryForm.invalid) {
      this.error = "Por favor, completa todos los campos correctamente."
      this.deliveryForm.markAllAsTouched()
      return
    }

    console.log("Datos del nuevo delivery a crear:", this.deliveryForm.value)
    // Aquí es donde harías la llamada a tu API para guardar los datos.
    this.router.navigate(["/delivery"])
  }

  cancelar() {
    this.router.navigate(["/delivery"])
  }
}
