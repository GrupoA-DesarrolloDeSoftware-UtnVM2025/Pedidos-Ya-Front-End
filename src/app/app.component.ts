import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router'; // <-- 1. IMPORTA RouterOutlet

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet], // <-- 2. AÑÁDELO a la lista de IMPORTS
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'pedidos-ya';
}