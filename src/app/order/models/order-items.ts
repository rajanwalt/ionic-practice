export interface OrderDetails  {
    item_id?: string
    productName?:  string
    count?: number
    price?: number 
}

export class Order  {
    constructor(
    public customerId?: string,
    public serviceId?: string,
    public phoneNumber?: string,
    public firstName?: string,
    public orderDetails?: OrderDetails[],
    public totalAmount?: string,
    public status?: string
    )  {}
} 
