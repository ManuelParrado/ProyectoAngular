import { Routes } from '@angular/router';
import { ProductosComponent } from './components/productos/productos.component';
import { LoginComponent } from './components/login/login.component';
import { MisPedidosComponent } from './components/mis-pedidos/mis-pedidos.component';
import { CarritoComponent } from './components/carrito/carrito.component';
import { RegistroComponent } from './components/registro/registro.component';
import { AdministracionComponent } from './components/administracion/administracion.component';
import { EditarPerfilComponent } from './components/editar-perfil/editar-perfil.component';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';

export const routes: Routes = [
  {
    path: '',
    title: 'Productos',
    component: ProductosComponent,
  },
  {
    path: 'login',
    title: 'Inicio Sesión',
    component: LoginComponent,
  }
  ,
  {
    path: 'registro',
    title: 'Registro',
    component: RegistroComponent,
  },
  {
    path: 'mispedidos',
    title: 'Mis Pedidos',
    canActivate: [AuthGuard],
    component: MisPedidosComponent,

  },
  {
    path: 'carrito',
    title: 'Carrito',
    canActivate: [AuthGuard],
    component: CarritoComponent,
  },
  {
    path: 'administracion',
    title: 'Administracion',
    canActivate: [AuthGuard, AdminGuard],
    component: AdministracionComponent,
  },
  {
    path: 'editarPerfil',
    title: 'Editar Perfil',
    canActivate: [AuthGuard],
    component: EditarPerfilComponent,
  }

];
