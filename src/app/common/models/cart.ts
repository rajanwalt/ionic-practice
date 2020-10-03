export class OrderDetailsModel  {

    static formatAPIArray(data: Array<any>) : OrderDetailsModel[] {
        return data.map(OrderDetailsModel.formatAPI)
    }
    
    static formatAPI(data: any) :OrderDetailsModel  {
     
        return new OrderDetailsModel(
            data.item_id,
            data.item.productName,
            data.quantity,
            data.item.price
        )
    }

    constructor(
        public item_id: any,
        public productName:  string,
        public count: number,
        public price: any 
    ) {}
}

export class Cart  {
 
    static formatAPI(data : any): Cart  {
        console.log("data", data);
        
        return new Cart(
            data.id,
            OrderDetailsModel.formatAPIArray(data.orderItems),
            data.customer,
            data.service,
            data.deliveryMethod,
            data.paymentType
        )
    }
    
    constructor(
        public orderId :string,
        public orderDetails,
        public customer,
        public service,
        public deliveryMethod : any,
        public paymentType : any
    )  {}
}