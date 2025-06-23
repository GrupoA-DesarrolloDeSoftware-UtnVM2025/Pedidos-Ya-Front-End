import { Component } from "@angular/core"
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from "@angular/router"
import { GlobalStatusService } from "../../services/global-status.service"
import { CommonModule } from "@angular/common"
import { AuthService } from "../../services/auth.service"

@Component({
  selector: "app-template",
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  templateUrl: "./template.component.html",
  styleUrl: "./template.component.css",
})
export class TemplateComponent {
  constructor(
    private globalStatusService: GlobalStatusService,
    private authService: AuthService,
    private router: Router,
  ) {}

  isLoading(): boolean {
    return this.globalStatusService.isLoading()
  }

  logout(): void {
    this.authService.logout()
    this.router.navigate(["/login"])
  }

  getUserEmail(): string {
    const user = this.authService.getUserFromToken()
    return user?.email || "Usuario"
  }
}
