import { Component } from '@angular/core';

import { MisPedidos } from '../../interfaces/mis-pedidos';
import { ServiciosApi } from '../../services/serviciosApi.service';
import { DatePipe } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-mis-pedidos',
  standalone: true,
  imports: [],
  templateUrl: './mis-pedidos.component.html',
  providers: [],
  styleUrl: './mis-pedidos.component.css'
})
export class MisPedidosComponent {

  listaPedidos: MisPedidos[] = [];
  datePipe!: DatePipe;
  constructor(private serviciosApi: ServiciosApi, private cookieService : CookieService) {
    this.datePipe = new DatePipe('en-US');
  }

  ngOnInit(): void {
    if (this.cookieService.check("jwt")){
      this.serviciosApi
      .getPedidosByToken()
      .subscribe(
        (api) => (this.listaPedidos = api.map(pedido => ({...pedido,
        fecha_pedido_formateada: this.datePipe.transform(new Date(pedido.fecha_pedido), 'dd/MM/yyyy')})))
      )

    }
  }

}
