export class ListOfOrders  {

    static formatAPIArray(data: Array<any>) : ListOfOrders[] {
        return data.map(ListOfOrders.formatAPI)
    }
    
    static formatAPI(data: any) :ListOfOrders  {
        return new ListOfOrders(
            data.id,
            data.customer.firstname + " " + data.customer.lastname,
            data.totalAmount,
            "Card Payment",
            data.paymentstatus,
            data.status,
            data.createdAt,
            data.orderItems
        )
    }

    constructor(
        public id,
        public name,
        public orderTotal ,
        public paymentType,
        public paymentStatus ,
        public orderStatus ,
        public orderDate,
        public orderItems 
    )  {}
}