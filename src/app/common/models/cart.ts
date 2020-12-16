export class OrderDetailsModel  {

    static formatAPIArray(data: Array<any>) : OrderDetailsModel[] {
        return data.map(OrderDetailsModel.formatAPI)
    }
    
    static formatAPI(data: any) :OrderDetailsModel  {
     
        return new OrderDetailsModel(
            data.item_id,
            data.item.productName,
            data.quantity,
            data.item.price,
            data.item.images
        )
    }

    constructor(
        public item_id: any,
        public productName:  string,
        public count: number,
        public price: any ,
        public images: any
    ) {}
}

export class Cart  {
 
    static formatAPI(data : any): Cart  {
        
        return new Cart(
            data.id,
            OrderDetailsModel.formatAPIArray(data.orderItems),
            data.customer,
            data.service,
            data.shippingcharge,
            data.vat,
            data.deliveryMethod,
            data.paymentType
        )
    }
    
    constructor(
        public orderId :string,
        public orderDetails,
        public customer,
        public service,
        public shippingcharge,
        public vat,
        public deliveryMethod : any,
        public paymentType : any
    )  {}
}