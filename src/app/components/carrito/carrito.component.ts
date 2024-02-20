import { Component } from '@angular/core';

import { ServiciosApi } from '../../services/serviciosApi.service';
import { CookieService } from 'ngx-cookie-service';
import { Producto } from '../../interfaces/producto';
import { RespuestaCarrito } from '../../interfaces/carrito';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [],
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.css'
})
export class CarritoComponent {

  respuesta : RespuestaCarrito = { resultado: '' };
  total: number = 0;
  productosEnCarrito : Producto[] = [];
  mensaje: String = '';

  constructor(private serviciosApi : ServiciosApi, private cookieService :  CookieService) { }

  ngOnInit(): void {
    if(this.cookieService.check("carrito")){
      this.serviciosApi.getProdutosById().subscribe(
        (api) => {
          this.productosEnCarrito = api;

          this.productosEnCarrito.forEach(p => {
            this.total += p.precio;
          });
          this.total = parseFloat(this.total.toFixed(2));
        }
      )
    }
  }

  hacerPedido(){
    this.serviciosApi.insertPedido(this.productosEnCarrito).subscribe(
      (api) => {
        this.respuesta = api;
        if (this.respuesta.resultado == 'ok'){
          this.mensaje = 'Pedido hecho correctamente';
          this.cookieService.delete('carrito');
        } else {
          this.mensaje = 'Ha ocurrido un error';
        }
      }
    );
  }



}
