import { Component } from '@angular/core';
import { ServiciosApi } from '../../services/serviciosApi.service';
import { CookieService } from 'ngx-cookie-service';
import { RespuestaDelete, User } from '../../interfaces/user';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-administracion',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './administracion.component.html',
  styleUrl: './administracion.component.css'
})
export class AdministracionComponent {

  users! : User[] ;
  userAdministrar!: User;

  respuesta!: RespuestaDelete;
  mensaje! : string;

  constructor(private serviciosApi: ServiciosApi, private cookieService: CookieService) {}

  ngOnInit(): void {

    this.serviciosApi.getAllUsers().subscribe(
      (api) => {this.users = api}
    )

  }

  delete(email : string){

    this.serviciosApi.deleteByEmail(email).subscribe(
      (api) => {this.respuesta = api;

        if (this.respuesta.resultado = "ok"){
          console.log("Usuario borrado correctamente")
          window.location.href = "/administracion";
        } else {
          console.log("Error");
        }

      }
    )
  }

}
