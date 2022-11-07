export interface Factura {
  id: string;
  total: string;
  pedidos: Array<PedidoClass | string>;
  usuario: Usuario;
  createdAt: Date;
  updatedAt: Date;
  metodo_de_pago?: MetodoDePago;
}

export interface MetodoDePago {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface PedidoClass {
  id: string;
  cantidad: number;
  productos?: string;
  identificador: string;
  createdAt: Date;
  updatedAt: Date;
  producto: Producto;
}

export interface Producto {
  id: string;
  name: string;
  description: string;
  price: string;
  image: string;
  delivery: boolean;
  categoria: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Usuario {
  id: string;
  name: string;
  gender: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}



export interface CajaStateInterface {
  facturas: Factura[] ;
  metodos: MetodoDePago[];
  facturaActiva?: Factura
}

function state(): CajaStateInterface {
  return {
    facturas: [],
    metodos: [],
    facturaActiva: undefined
  };
}

export default state;
