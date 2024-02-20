import { Component } from '@angular/core';
import { Registro, RespuestaRegistro } from '../../interfaces/registro';
import { FormsModule} from '@angular/forms';
import { ServiciosApi } from '../../services/serviciosApi.service';
import { CookieService } from 'ngx-cookie-service';
import { Respuesta } from '../../interfaces/login';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {

  user: Registro = {
    email: '',
    nombre: '',
    apellidos: '',
    password: '',
    rol: 'u',
    imagen: null
  };

  repite_password: string = '';

  mensajeCorreo: string = '';
  mensajeExiste : string = '';
  mensajeObligatorios : string = '';
  mensajePasswordCoinciden : string = '';
  mensajePasswordValida : string = '';

  respuestaRegistro: RespuestaRegistro = { resultado: '' }
  respuestaLogin : Respuesta = { jwt : '' };

  constructor(private serviciosApi: ServiciosApi, private cookieService : CookieService){ }

  registro(){

    if (!this.user.email || !this.user.nombre || !this.user.apellidos || !this.user.password || !this.repite_password) {
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

    if (!/^(?=.*[A-Z])(?=.*\d).{8,}$/.test(this.user.password)) {
      this.mensajePasswordValida = 'La contraseña debe tener al menos una letra mayúscula, un dígito y al menos 8 caracteres';
      return;
    } else {
      this.mensajePasswordValida = '';
    }

    if (this.user.password !== this.repite_password) {
      this.mensajePasswordCoinciden = 'Las contraseñas no coinciden';
      return;
    } else {
      this.mensajePasswordCoinciden = '';
    }

    this.serviciosApi.insertUser(this.user).subscribe(
      (api) => {
        this.respuestaRegistro = api;
        if (this.respuestaRegistro.resultado == "existe"){
          this.mensajeExiste = 'El correo electrónico pertenece a otra cuenta';

        } else if (this.respuestaRegistro.resultado == "error"){
          this.mensajeExiste = 'Error en la base de datos';

        } else {

          this.serviciosApi.getToken(this.user).subscribe(
            (api) => {
                this.respuestaLogin = api;
                this.cookieService.set('jwt', this.respuestaLogin.jwt);
                window.location.href = "/";
            }
          )
        }
      }
    )

  }
}
