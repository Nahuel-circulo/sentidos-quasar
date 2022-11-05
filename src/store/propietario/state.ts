export interface Factura {
  id:               string;
  total:            string;
  metodo_de_pago: MetodoDePago;
  pedidos:          string[];
  usuario:          Usuario;
  createdAt:        Date;
  updatedAt:        Date;
}

export interface MetodoDePago {
  id:        string;
  name:      string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Usuario {
  id:        string;
  name:      string;
  gender:    string;
  email:     string;
  createdAt: Date;
  updatedAt: Date;
}

export interface PropietarioStateInterface {
  facturas: Factura[];
}

function state(): PropietarioStateInterface {
  return {
    facturas: [],
  };
}

export default state;
