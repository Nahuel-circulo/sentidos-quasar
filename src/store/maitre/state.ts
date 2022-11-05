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

export interface MaitreStateInterface {
  reservas: Reservas[];
}

function state(): MaitreStateInterface {
  return {
    reservas: [],
  };
}

export default state;
