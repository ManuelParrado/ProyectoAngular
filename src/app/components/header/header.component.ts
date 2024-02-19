import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ServiciosApi } from '../../services/serviciosApi.service';
import { CookieService } from 'ngx-cookie-service';
import { UsuarioAutenticado } from '../../interfaces/login';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  autenticado: Boolean = false;
  carrito: number[] = [];

  usuario: UsuarioAutenticado = {
    resultado: '',
    nombre: '',
    apellidos: '',
    email: '',
    rol: ''
  }

  constructor(private serviciosApi: ServiciosApi, private cookieService: CookieService, private router : Router) {}

  ngOnInit(): void {
    if (this.cookieService.check("jwt")){
      this.serviciosApi.getUser().subscribe(
        (api) => {
          this.usuario = api;
          if(this.usuario.resultado == "null"){
            this.autenticado = false;
          } else if (this.usuario.resultado == "ok"){
            this.autenticado = true;
          }
        }
      )
    }

    this.carrito.forEach(id => {
      console.log(`id: ${id}`);
    });

    if(this.cookieService.check("carrito")){
      let carritoString = this.cookieService.get("carrito");
      this.carrito = JSON.parse(carritoString);
    }

  }

  logout(){
    this.cookieService.delete("jwt");
    this.cookieService.delete("carrito");
    window.location.href = "/";
  }

}
