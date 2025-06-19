import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink} from '@angular/router';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {


  showPassword = false;

  constructor() { }


  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }


  iniciarSesion(): void {

    console.log("Intentando iniciar sesión...");

  }
}
