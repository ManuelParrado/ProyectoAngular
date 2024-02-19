import { Component } from '@angular/core';

import { Producto } from '../../interfaces/producto';
import { ServiciosApi } from '../../services/serviciosApi.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css'
})
export class ProductosComponent {

  listaProductos: Producto[] = [];
  autenticado: boolean = false;
  carrito: number[] = [];

  constructor(private serviciosApi : ServiciosApi, private cookieService :  CookieService) { }

  ngOnInit(): void {
    this.serviciosApi
    .getProductos()
    .subscribe(
      (api) => (this.listaProductos = api)
    )

    if(this.cookieService.check("jwt")){
      this.autenticado = true;
    }

  }

  addProductoAlCarrito(id: number){
     // Primero, comprueba si ya existe la cookie "carrito".
    if(this.cookieService.check("carrito")){
      let carritoString = this.cookieService.get("carrito");
      this.carrito = JSON.parse(carritoString);
    }

    this.carrito.push(id);

    let carritoString = JSON.stringify(this.carrito);
    this.cookieService.set("carrito", carritoString);
  }





}
