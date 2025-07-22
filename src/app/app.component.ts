/* Declara el componente principal de app Angular
Lo configura como standalone
Le indica que usará rutas (RouterOutlet)
Carga su HTML y estilos asociados
Tiene una propiedad title llamada "pedidos-ya"
*/
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'pedidos-ya';
}