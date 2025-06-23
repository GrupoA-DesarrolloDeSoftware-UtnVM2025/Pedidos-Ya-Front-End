//importacion de librerias y modulos necesarios
import { Component } from "@angular/core"
import { CommonModule } from "@angular/common"
import { RouterLink, Router } from "@angular/router"
import { FormBuilder, type FormGroup, Validators, ReactiveFormsModule } from "@angular/forms"
import { AuthService } from "../../services/auth.service"

// Componente de inicio de sesión
@Component({
  selector: "app-login",
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
// Clase que maneja la lógica del componente de inicio de sesión
export class LoginComponent {
  loginForm: FormGroup
  showPassword = false
  error = ""
  isLoading = false

  // Constructor que inicializa el formulario y los servicios necesarios
  constructor(
      private fb: FormBuilder,
      private authService: AuthService,
      private router: Router,
  ) {
    this.loginForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(4)]],
    })
  }

  // Getters para acceder a los controles del formulario  
  get email() {
    return this.loginForm.get("email")
  }

  get password() {
    return this.loginForm.get("password")
  }
  // Método para alternar la visibilidad de la contraseña
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword
  }
  // Método para iniciar sesión
  async iniciarSesion(): Promise<void> {
    if (this.loginForm.invalid) {
      this.error = "Por favor, completa todos los campos correctamente."
      this.loginForm.markAllAsTouched()
      return
    }

    this.isLoading = true
    this.error = ""
    // Intentar iniciar sesión con las credenciales 
    try {
      const credentials = this.loginForm.value
      await this.authService.login(credentials)

      // Redirigir al dashboard después del login
      this.router.navigate(["/delivery"])
    } catch (error: any) {
      this.error = error.message || "Error al iniciar sesión"
    } finally {
      this.isLoading = false
    }
  }
}
