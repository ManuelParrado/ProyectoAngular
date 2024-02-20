import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ServiciosApi } from '../../services/serviciosApi.service';
import { Login, Respuesta } from '../../interfaces/login';
import { CookieService } from 'ngx-cookie-service';

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

  mensajeObligatorios : string = '';
  mensajeUserValido : string = '';
  mensajeCorreo : string = '';

  constructor(private serviciosApi: ServiciosApi, private cookieService : CookieService){ }

  login(){

    if (!this.user.email || !this.user.password) {
      this.mensajeObligatorios = 'Rellene todos los campos';
      return;
    }  else {
      this.mensajeObligatorios = '';
    }

    if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(this.user.email)) {
      this.mensajeCorreo = 'Por favor, introduce un correo electrónico válido';
      return;
    } else {
      this.mensajeCorreo = '';
    }

    this.serviciosApi.getToken(this.user).subscribe(
        (api) => {
            this.respuesta = api;
            if (this.respuesta.jwt == "fallo"){
                this.mensajeUserValido = 'Usuario incorrecto';
            } else {
                // Guardar el token JWT en las cookies
                this.cookieService.set('jwt', this.respuesta.jwt);
                window.location.href = "/";
            }
        }
    )
  }

}

