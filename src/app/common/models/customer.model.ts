export class Customer {
    
    static formatPostAPI(data: any) : Customer {
        return new Customer(
            data.firstName,
            data.lastName,
            data.email,
            data.phoneNumber,
            data.country,
            data.city,
            data.street
        )
    }

    constructor(
        public firstName : string,
        public lastName: string,
        public email: string,
        public phoneNumber: string,
        public country: string,
        public city: string,
        public street : string,
        public shopId?: string,
        public customerId?: string,
    )  {}
}