export type IOrderData = {
  consumidor: {
    nome: string;
    telefone: string;
    endereco: string;
  };
  order: {
    id: string;
    items: [{
      id: string;
      name: string;
      price: string;
      optionals: [{
        id: string;
        name: string;
        price: string;
      }];
    }];
    observation: string;
  };
}
