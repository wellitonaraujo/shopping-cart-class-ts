type CartItem = { name: string; price: number };
type OrderStatus = 'open' | 'closed';

export class ShoppingCart {
  private readonly _items: CartItem[] = [];
  private _orderStatus: OrderStatus = 'open';

  addItem(item: CartItem): void {
    this._items.push(item);
  }

  removeItem(index: number): void {
    this._items.splice(index, 1);
  }

  get items(): Readonly<CartItem[]> {
    return this._items;
  }

  get orderStatus(): OrderStatus {
    return this._orderStatus;
  }

  total(): number {
    return +this._items.reduce((ac, next) => ac + next.price, 0).toFixed(2);
  }

  checkout(): void {
    if(this.isEmpty()) {
      console.log('Seu carrinho está vazio.');
      return;
    }

    this._orderStatus = 'closed';
    this.sendMessage(`Seu pedido com total de ${this.total()} foi recebido.`);
    this.saveOrder();
    this.clear();
  }

  // Verica se há produtos no carrinho
  isEmpty(): boolean {
    return this._items.length === 0;
  }

  // Enviando mensagem
  sendMessage(msg: string): void {
    console.log('Mensagem enviada: ' + msg);
  }

  // Salvando ordens
  saveOrder(): void {
    console.log('Pedido salvo com sucesso.');
  }

  // Limpa o carrinho
  clear(): void {
    console.log('Carrinho de compras limpo.');
    this._items.length = 0;
  }
}

const shoppingCart = new ShoppingCart();
shoppingCart.addItem({ name: 'Bike', price: 32.11 });
shoppingCart.addItem({ name: 'Camiseta', price: 12.19 });
shoppingCart.addItem({ name: 'Caneta', price: 42.41 });

console.log(shoppingCart.items);
console.log(shoppingCart.total());
console.log(shoppingCart.orderStatus);
shoppingCart.checkout();
console.log(shoppingCart.orderStatus);
