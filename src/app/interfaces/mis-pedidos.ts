export interface MisPedidos {
  id: number;
  //Pedido
  id_pedido: number,
  fecha_pedido: Date,
  fecha_pedido_formateada?: string | null,
  //Producto
  id_producto: number,
  nombre_producto: string,
  categoria: string,
  precio: number,
  imagen: string,
  descripcion: string
}
