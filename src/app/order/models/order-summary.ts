import { OrderDetails, Order} from './order-items';

class OrderItems  {
    
    static formatAPIArray(data: OrderDetails[]): OrderItems[]  {
        return data.map(OrderItems.formatAPI);
    }
    
    static formatAPI(data: any): OrderItems {
        return new OrderItems(
            data.count,
            data.item_id
        );
    }
    constructor(
        public quantity: number,
        public item_id: string 
    )  {}
    
}

export class OrderSummary  {
    
    static formatAPI(data: any): OrderSummary {

        return new OrderSummary(
            data.totalAmount,
            data.status,
            data.customerId,
            OrderItems.formatAPIArray(data.orderDetails)
        );
    }
    
    constructor(
    public totalAmount: string,
    public status: string,
    public customerId: string,
    public orderItems?: OrderItems[]
    )  {}
} 
