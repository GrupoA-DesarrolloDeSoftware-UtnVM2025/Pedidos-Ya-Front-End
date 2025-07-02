//importacion de los modulos necesarios
import { Component } from "@angular/core"
import { CommonModule } from "@angular/common"
import { RouterLink, Router } from "@angular/router"
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from "@angular/forms"
import { AuthService } from "../../services/auth.service"

//Componente de registro de inicio de sesion
@Component({
  selector: "app-register",
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"],
})
// Clase que maneja la lógica del componente de registro
export class RegisterComponent {
  registerForm: FormGroup
  showPassword = false
  error = ""
  isLoading = false

  // Constructor que inicializa el formulario y los servicios necesarios
  constructor(
      private fb: FormBuilder,
      private authService: AuthService,
      private router: Router,
  ) {
    this.registerForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(4)]],
    })
  }

  // Getters para acceder a los controles del formulario
  get email() {
    return this.registerForm.get("email")
  }

  get password() {
    return this.registerForm.get("password")
  }
  // Método para alternar la visibilidad de la contraseña
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword
  }
  // Método para crear una nueva cuenta de usuario
  async registerUser(): Promise<void> {
    if (this.registerForm.invalid) {
      this.error = "Por favor, completa todos los campos correctamente."
      this.registerForm.markAllAsTouched()
      return
    }

    this.isLoading = true
    this.error = ""
    // Intentar registrar al usuario con los datos del formulario
    try {
      const userData = this.registerForm.value
      await this.authService.register(userData)

      // Redirigir al login después del registro
      this.router.navigate(["/login"])
    } catch (error: any) {
      this.error = error.message || "Error al crear la cuenta"
    } finally {
      this.isLoading = false
    }
  }
}
