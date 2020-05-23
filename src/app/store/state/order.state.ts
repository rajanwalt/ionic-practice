export interface OrderDetails  {
    catalogueId : number
    productName :  string
    count : number
    price : number 
}

export class Order  {
    constructor(
    public customerId?: number,
    public OrderDetails?: OrderDetails[]
    )  {}
} 
