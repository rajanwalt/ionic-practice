export class Catalogue {
    
    static formatPostAPI(data: any) : Catalogue {
        return new Catalogue(
            data.productName,
            data.price,
            data.additionalDetails,
            data.delivery,
            data.dimension,
            data.dimensionDetails.weight,
            data.dimensionDetails.length,
            data.dimensionDetails.width,
            data.dimensionDetails.height
        )
    }

    constructor(
        public productName : string,
        public price: string,
        public additionalDetails: string,
        public delivery: string,
        public dimension: string,
        public weight: string,
        public length : string,
        public width : string,
        public height : string,
        public shopId?: string,
        public itemId?:number
    )  {}
}