/* Es un archivo TypeScript que:

-Declara el componente Angular
-Define las propiedades (variables) que el HTML puede usar
-Contiene métodos (funciones) que responden a eventos (clicks, cambios, formularios)
-Se comunica con servicios, APIs, formularios, rutas, etc
*/
/* Importacion de decoradores y funcionalidades principales de Angular entre otras cosas */
import { Component, OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { RouterLink } from "@angular/router"
import { DeliveryService } from "../../services/api.service"
import {DeliveryDisplayItem, PaginatedDeliveryResponse} from '../../interfaces/delivery.dto';

/* Define el componente Angular con su configuración*/
@Component({
  selector: "app-delivery", // Selector HTML para usar el componente
  standalone: true,         // Indica que es un componente independiente (no parte de un módulo)
  imports: [CommonModule, RouterLink], // Módulos que el componente necesita
  templateUrl: "./delivery.component.html", // Ruta al archivo de plantilla HTML
  styleUrls: ["./delivery.component.css"],   // Ruta al archivo de estilos CSS
})

export class DeliveryComponent implements OnInit {
  /* Array para almacenar las entregas recibidas del servicio*/
  deliveries: DeliveryDisplayItem[] = []

  /* Estado de carga y errores*/
  isLoading = false
  error = ""

  // Propiedades de paginación
  currentPage = 1         // Página actual
  totalPages = 1          // Total de páginas
  limit = 5               // Cantidad de registros por página
  total = 0               // Total de registros en el sistema
  offset = 0              // Desplazamiento de registros

  // Constructor que inyecta el servicio de entregas
  constructor(private deliveryService: DeliveryService) {
  }

  // Método que se ejecuta al inicializar el componente
  async ngOnInit() {
    await this.loadDeliveries() // Carga inicial de entregas
  }

  // Método para cargar entregas con paginación
  async loadDeliveries(page = 1) {
    this.isLoading = true
    this.error = ""

    try {
      // Calcula el offset según la página seleccionada
      this.currentPage = page
      this.offset = (page - 1) * this.limit

      // Llama al servicio para obtener los datos paginados
      const response: PaginatedDeliveryResponse = await this.deliveryService.getDeliveries({
        limit: this.limit,
        offset: this.offset,
      })

      // Asigna los datos recibidos al array de entregas
      this.deliveries = response.data || []
      this.total = response.total || 0
      this.totalPages = Math.max(1, Math.ceil(this.total / this.limit)) // Calcula total de páginas

      // Asegura que la página actual esté dentro de los límites válidos
      if (this.currentPage > this.totalPages) {
        this.currentPage = this.totalPages
      }

    } catch (error: any) {
      // Manejo de errores
      console.error("Error in loadDeliveries:", error)
      this.error = error.message
      this.deliveries = [] // Vacía la lista en caso de error
    } finally {
      // Finaliza el estado de carga
      this.isLoading = false
    }
  }

  // Método para eliminar un delivery
  async deleteDelivery(id: number) {
    // Confirma la acción con el usuario
    if (!confirm("¿Estás seguro de que quieres eliminar este delivery?")) {
      return
    }

    try {
      // Llama al servicio para eliminar el registro
      await this.deliveryService.deleteDelivery(id)

      // Verifica si es necesario retroceder una página luego de borrar
      const remainingItems = this.deliveries.length - 1
      if (remainingItems === 0 && this.currentPage > 1) {
        // Si fue el último elemento de la página, va a la anterior
        await this.loadDeliveries(this.currentPage - 1)
      } else {
        // Si no, recarga la página actual
        await this.loadDeliveries(this.currentPage)
      }
    } catch (error: any) {
      this.error = error.message
      console.error("Error deleting delivery:", error)
    }
  }

  // Método para ir a una página específica
  async goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages && page !== this.currentPage) {
      await this.loadDeliveries(page)
    }
  }

  // Método para ir a la página anterior
  async previousPage() {
    if (this.currentPage > 1) {
      await this.loadDeliveries(this.currentPage - 1)
    }
  }

  // Método para ir a la siguiente página
  async nextPage() {
    if (this.currentPage < this.totalPages) {
      await this.loadDeliveries(this.currentPage + 1)
    }
  }

  // Método para cambiar la cantidad de elementos por página
  async onPageSizeChange(event: Event) {
    const target = event.target as HTMLSelectElement
    //const newLimit = Number.parseInt(target.value)

    this.limit = Number.parseInt(target.value)
    await this.loadDeliveries(1) // Reinicia en la primera página
  }

  // Método auxiliar para generar números de página visibles
  getPageNumbers(): number[] {
    const pages: number[] = []
    const maxPagesToShow = 5
    let startPage = Math.max(1, this.currentPage - Math.floor(maxPagesToShow / 2))
    const endPage = Math.min(this.totalPages, startPage + maxPagesToShow - 1)

    // Ajusta el inicio si se acerca al final del listado
    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1)
    }

    // Llena el arreglo de páginas
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i)
    }

    return pages
  }

  // Propiedad computada: primer registro mostrado
  get startRecord(): number {
    return this.total === 0 ? 0 : this.offset + 1
  }

  // Propiedad computada: último registro mostrado
  get endRecord(): number {
    return Math.min(this.offset + this.limit, this.total)
  }

  // Propiedad computada: ¿hay página anterior?
  get hasPreviousPage(): boolean {
    return this.currentPage > 1
  }

  // Propiedad computada: ¿hay página siguiente?
  get hasNextPage(): boolean {
    return this.currentPage < this.totalPages
  }
}
