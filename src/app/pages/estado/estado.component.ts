// Importaciones necesarias de Angular y servicios
import { Component,  OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from "@angular/forms"
import {  Router, ActivatedRoute} from "@angular/router"
import { DeliveryService, UpdateDeliveryStatusDto } from "../../services/api.service"

//Importar componente del estado del delivery
@Component({
  selector: "app-estado-form",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule ],
  templateUrl: "./estado.component.html",
  styleUrls: ["./estado.component.css"],
})

//Clase para obtener el estado actual de un delivery
export class EstadoFormComponent implements OnInit {
  deliveryId: string | null = null
  estadoForm: FormGroup
  error = ""
  isLoading = false

  //Estados disponibles
  statusOptions = ["available", "in route", "occupied", "disconnected"]

  //Constructor para navegar entre rutas y crear el formulario de cambio de estado
  constructor(
      private router: Router,
      private route: ActivatedRoute,
      private fb: FormBuilder,
      private deliveryService: DeliveryService,

    //Creacion del formulario con el campo "status"
  ) {
    this.estadoForm = this.fb.group({
      status: ["", [Validators.required]],
    })
  }

  //Metodo para acceder facilmente al formulario
  get status() {
    return this.estadoForm.get("status")
  }
  //Metodo para obtener el id del delivery y cargar los datos actuales del mismo
  async ngOnInit(): Promise<void> {
    this.deliveryId = this.route.snapshot.paramMap.get("id")
    if (this.deliveryId) {
      await this.loadDeliveryData()
    }
  }
  //Se obtiene el id del delivery y se le establece el valor status
  async loadDeliveryData() {
    if (!this.deliveryId) return

    try {
      const delivery = await this.deliveryService.getDeliveryById(Number(this.deliveryId))
      this.estadoForm.patchValue({
        status: delivery.status,
      })
    } catch (error: any) {
      this.error = error.message
    }
  }
  //Si el estado seleccionado no es valido se muestra un error y se solicita seleccione uno nuevo
  async updateDeliveryStatus() {
    if (this.estadoForm.invalid) {
      this.error = "Por favor, selecciona un estado válido."
      this.estadoForm.markAllAsTouched()
      return
    }

    if (!this.deliveryId) {
      this.error = "ID de delivery no válido."
      return
    }

    this.isLoading = true
    this.error = ""

    try {
      const statusData: UpdateDeliveryStatusDto = {
        status: this.estadoForm.value.status,
      }

      await this.deliveryService.updateStatus(Number(this.deliveryId), statusData)
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
