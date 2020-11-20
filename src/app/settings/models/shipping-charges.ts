
export class ShippingCharges {

    static formatAPIArray(data: Array<any>) : ShippingCharges[] {
        return data.map(ShippingCharges.formatAPI)
    }

    static formatAPI(data:any) : ShippingCharges  {
        return new ShippingCharges(
            data.id,
            data.city,
            data.charge
        )
    }
    constructor(
        public id,
        public city,
        public charge
    ) {}
}