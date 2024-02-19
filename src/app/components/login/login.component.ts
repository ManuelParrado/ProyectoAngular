import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ServiciosApi } from '../../services/serviciosApi.service';
import { Login, Respuesta } from '../../interfaces/login';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  user : Login = { email: '', password: '' };
  respuesta : Respuesta = { jwt: '' };
  mensaje : String = '';

  constructor(private serviciosApi: ServiciosApi, private cookieService : CookieService, private router: Router){ }

  login(){
    this.serviciosApi.getToken(this.user).subscribe(
        (api) => {
            this.respuesta = api;
            if (this.respuesta.jwt == "fallo"){
                this.mensaje = 'Usuario incorrecto';
            } else {
                // Guardar el token JWT en las cookies
                this.cookieService.set('jwt', this.respuesta.jwt);
                window.location.href = "/";
            }
        }
    )
  }

}

