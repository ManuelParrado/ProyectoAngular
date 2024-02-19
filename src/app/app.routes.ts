import { Routes } from '@angular/router';
import { ProductosComponent } from './components/productos/productos.component';
import { LoginComponent } from './components/login/login.component';
import { MisPedidosComponent } from './components/mis-pedidos/mis-pedidos.component';
import { CarritoComponent } from './components/carrito/carrito.component';

export const routes: Routes = [
  {
    path: '',
    title: 'Productos',
    component: ProductosComponent,
  },
  {
    path: 'login',
    title: 'Login',
    component: LoginComponent,
  },
  {
    path: 'mispedidos',
    title: 'Mis Pedidos',
    component: MisPedidosComponent,
  },
  {
    path: 'carrito',
    title: 'Carrito',
    component: CarritoComponent,
  }

];
