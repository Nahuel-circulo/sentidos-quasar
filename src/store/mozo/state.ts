export interface Reservas {
  id: number;
  user_id: number;
  nro_mesa: number;
  horario: string;
  fecha: String;
  confirmado: boolean;
  comensales: number;
  cancelado:boolean
}
export interface Producto {
  id:          string;
  name:        string;
  description: string;
  price:       string;
  image:       Image;
  delivery:    boolean;
  categoria:   Categoria;
  createdAt:   Date;
  updatedAt:   Date;
}

export interface Categoria {
  id:        string;
  name:      string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Image {
  id:        string;
  filename:  string;
  mimeType:  string;
  filesize:  number;
  width:     number;
  height:    number;
  sizes:     Sizes;
  createdAt: Date;
  updatedAt: Date;
  url:       string;
}

export interface Sizes {
  thumbnail: Thumbnail;
  card:      Card;
  tablet:    Card;
}

export interface Card {
}

export interface Thumbnail {
  width:    number;
  height:   number;
  mimeType: string;
  filesize: number;
  filename: string;
  url:      string;
}

export interface Pedido {
  id:            string;
  cantidad:      number;
  productos:     Producto;
  identificador: string;
  createdAt:     Date;
  updatedAt:     Date;
}


export interface MozoStateInterface {
  reservas: Reservas[];
  productos: Producto[];
  pedidos:Pedido[];
}

function state(): MozoStateInterface {
  return {
    reservas: [],
    productos:[],
    pedidos:[]
  };
}

export default state;
