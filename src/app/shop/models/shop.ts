export class Shop  {
    constructor(
        public shopName: string,
        public email: string,
        public shopdetails?: string,
        public country?: string,
        public city?: string,
        public  street?: string,
        public serviceId?: string,
    )  {}
}