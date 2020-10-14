export interface OrderDetails  {
    item_id?: string
    productName?:  string
    count?: number
    price?: number 
}

// export class OrderDetails  {
//     constructor(
//         public item_id?: string,
//         public productName?:  string,
//         public count?: number,
//         public price?: number 
//     )  {
//         this.count = 1;
//     }
// }

export class Order  {
    constructor(
    public customerId?: string,
    public serviceId?: string,
    public phoneNumber?: string,
    public firstName?: string,
    public orderDetails?: OrderDetails[],
    public totalAmount?: string,
    public status?: string,
    public email?:string,
    public country?: string,
    public city?: string,
    public street?:string,
    public shipmentOptions?: any
    )  {}
} 
