import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  logout() {
    // Aquí debes eliminar el token de autenticación y cualquier otra información de sesión.
    localStorage.removeItem('token');
    this.router.navigate(['/login']); // Redirige al usuario a la página de login.
  }
}
