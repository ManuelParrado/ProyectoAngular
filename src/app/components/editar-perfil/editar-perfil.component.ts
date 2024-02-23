import { Component } from '@angular/core';
import { ServiciosApi } from '../../services/serviciosApi.service';
import { CookieService } from 'ngx-cookie-service';
import { FormsModule } from '@angular/forms';
import { UsuarioAutenticado } from '../../interfaces/login';
import { RespuestaDelete, UserUpdate } from '../../interfaces/user';
import { window } from 'rxjs';

@Component({
  selector: 'app-editar-perfil',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './editar-perfil.component.html',
  styleUrl: './editar-perfil.component.css'
})
export class EditarPerfilComponent {

  usuario! : UsuarioAutenticado;

  userUpdate! : UserUpdate;

  respuesta! : RespuestaDelete;

  mensajeCorreo : string = '';
  mensajePasswordValida : string = '';
  repite_password : string = '';
  mensajePasswordCoinciden : string = '';
  mensaje : string = '';

  constructor(private serviciosApi: ServiciosApi, private cookieService: CookieService) {}

  ngOnInit(): void {
    this.serviciosApi.getUser().subscribe(
      (api) =>
      {
        this.usuario = api;
        this.userUpdate = {
          id: this.usuario.id,
          email: this.usuario.email,
          nombre: this.usuario.nombre,
          apellidos: this.usuario.apellidos,
          password: null
        };
      }
    )
  }

  updateUser(){

    this.mensaje = '';
    this.mensajeCorreo = '';
    this.mensajePasswordCoinciden = '';
    this.mensajePasswordValida = '';

    if (this.userUpdate.email != null){
      if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(this.userUpdate.email)) {
        this.mensajeCorreo = 'Por favor, introduce un correo electrónico válido';
        return;
      } else {
        this.mensajeCorreo = '';
      }
    }

    if(this.userUpdate.password != null){
      if (!/^(?=.*[A-Z])(?=.*\d).{8,}$/.test(this.userUpdate.password)) {
        this.mensajePasswordValida = 'La contraseña debe tener al menos una letra mayúscula, un dígito y al menos 8 caracteres';
        return;
      } else {
        this.mensajePasswordValida = '';
      }

      if (this.userUpdate.password != this.repite_password) {
        console.log(this.userUpdate.password)
        console.log(this.repite_password)
        this.mensajePasswordCoinciden = 'Las contraseñas no coinciden';
        return;
      } else {
        this.mensajePasswordCoinciden = '';
      }
    }

    this.serviciosApi.updateUser(this.userUpdate).subscribe(
      (api) =>
      {
        this.respuesta = api;
        if (this.respuesta.resultado == 'ok'){
          this.mensaje = 'Usuario editado correctamente'
        } else {
          this.mensaje = 'Ha ocurrido un error'
        }
      }
    )
  }





}
