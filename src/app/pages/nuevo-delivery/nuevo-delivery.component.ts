// Importacion de decoradores, funcionalidades principales de Angular, navegacion, formularios, servicios, etc
import { Component } from "@angular/core"
import { CommonModule } from "@angular/common"
import { Router } from "@angular/router"
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from "@angular/forms"
import { DeliveryService, CreateDeliveryDto } from "../../services/api.service"

// Decorador que define los metadatos del componente
@Component({
  selector: "app-delivery-form", // Selector HTML para usar el componente
  standalone: true,              // Indica que es un componente independiente (no requiere módulo)
  imports: [CommonModule, ReactiveFormsModule], // Módulos necesarios para la plantilla y formularios reactivos
  templateUrl: "./nuevo-delivery.component.html", // Ruta a la plantilla HTML
  styleUrls: ["./nuevo-delivery.component.css"],  // Ruta a los estilos CSS
})

export class DeliveryFormComponent {
  // Formulario reactivo que contiene todos los campos del delivery
  deliveryForm: FormGroup
  // Variables de estado
  error = ""
  isLoading = false

  // Constructor que inyecta servicios necesarios
  constructor(
      private router: Router,                 // Para navegar a otra ruta
      private fb: FormBuilder,               // Para construir el formulario
      private deliveryService: DeliveryService // Para realizar llamadas a la API
  ) {
    // Inicialización del formulario con sus validadores
    this.deliveryForm = this.fb.group({
      personId: ["", [Validators.required, Validators.min(1)]], // Campo obligatorio con mínimo 1
      location: this.fb.group({ // Subgrupo para la ubicación
        latitude: ["", [Validators.required, Validators.min(-90), Validators.max(90)]], // Latitud válida
        longitude: ["", [Validators.required, Validators.min(-180), Validators.max(180)]], // Longitud válida
      }),
      radius: ["", [Validators.required, Validators.min(0.1)]], // Radio mínimo 0.1 obligatorio
    })
  }

  // Métodos auxiliares para acceder fácilmente a los controles del formulario
  get personId() {
    return this.deliveryForm.get("personId")
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

  // Método que se ejecuta al enviar el formulario para crear un nuevo delivery
  async crearDelivery() {
    // Si el formulario es inválido, se muestra un mensaje de error
    if (this.deliveryForm.invalid) {
      this.error = "Por favor, completa todos los campos correctamente."
      this.deliveryForm.markAllAsTouched() // Marca todos los campos como tocados para mostrar errores
      return
    }

    this.isLoading = true
    this.error = ""

    try {
      // Se obtiene el valor actual del formulario
      const formValue = this.deliveryForm.value

      // Se transforma el valor a un objeto del tipo CreateDeliveryDto
      const deliveryData: CreateDeliveryDto = {
        personId: Number(formValue.personId),
        location: {
          latitude: Number(formValue.location.latitude),
          longitude: Number(formValue.location.longitude),
        },
        radius: Number(formValue.radius),
      }

      // Se llama al servicio para crear el nuevo delivery
      await this.deliveryService.createDelivery(deliveryData)

      // Navega a la página de listado de deliveries si la creación fue exitosa
      this.router.navigate(["/delivery"])
    } catch (error: any) {
      // Si ocurre un error, se muestra el mensaje
      this.error = error.message || "Error desconocido al crear el delivery"
    } finally {
      // Se finaliza el estado de carga
      this.isLoading = false
    }
  }

  // Método para cancelar y volver al listado sin guardar
  cancelar() {
    this.router.navigate(["/delivery"])
  }
}
