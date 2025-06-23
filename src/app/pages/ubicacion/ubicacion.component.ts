import { Component, OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from "@angular/forms"
import { Router, ActivatedRoute} from "@angular/router"
import { DeliveryService, UpdateDeliveryLocationDto } from "../../services/api.service"

@Component({
  selector: "app-ubicacion-form",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule ],
  templateUrl: "./ubicacion.component.html",
  styleUrls: ["./ubicacion.component.css"],
})
export class UbicacionFormComponent implements OnInit {
  deliveryId: string | null = null
  ubicacionForm: FormGroup
  error = ""
  isLoading = false

  constructor(
      private router: Router,
      private route: ActivatedRoute,
      private fb: FormBuilder,
      private deliveryService: DeliveryService,
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

  async ngOnInit(): Promise<void> {
    this.deliveryId = this.route.snapshot.paramMap.get("id")
    if (this.deliveryId) {
      await this.loadDeliveryData()
    }
  }

  async loadDeliveryData() {
    if (!this.deliveryId) return

    try {
      const delivery = await this.deliveryService.getDeliveryById(Number(this.deliveryId))
      this.ubicacionForm.patchValue({
        location: {
          latitude: delivery.location.latitude,
          longitude: delivery.location.longitude,
        },
      })
    } catch (error: any) {
      this.error = error.message
    }
  }

  async updateLocation() {
    if (this.ubicacionForm.invalid) {
      this.error = "Por favor, completa todos los campos correctamente."
      this.ubicacionForm.markAllAsTouched()
      return
    }

    if (!this.deliveryId) {
      this.error = "ID de delivery no válido."
      return
    }

    this.isLoading = true
    this.error = ""

    try {
      const formValue = this.ubicacionForm.value
      const locationData: UpdateDeliveryLocationDto = {
        location: {
          latitude: Number(formValue.location.latitude),
          longitude: Number(formValue.location.longitude),
        },
      }

      await this.deliveryService.updateLocation(Number(this.deliveryId), locationData)
      this.router.navigate(["/delivery"])
    } catch (error: any) {
      this.error = error.message
    } finally {
      this.isLoading = false
    }
  }

  cancel() {
    this.router.navigate(["/delivery"])
  }
}
