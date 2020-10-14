export class Dimentions  {

    static fromAPI(weight, width, length, height) : Dimentions {
        return new Dimentions(weight, width, length, height)
    }

    constructor(
        public weight : any,
        public width : any,
        public length : any,
        public height : any
    ) {}
}

export class CatalogueModel  {
    
    static fromAPI(data: any) : CatalogueModel  {
        return new CatalogueModel(
            data.id,
            data.productName,
            data.price,
            data.additionalDetails,
            data.delivery,
            data.dimension,
            Dimentions.fromAPI(data.weight, data.width, data.length, data.height)
        )
    }

    constructor(
        public id : any,
        public productName : string,
        public price : any,
        public additionalDetails: any,
        public delivery : any,
        public dimension : any,
        public dimensionDetails : Dimentions
    ) {}
}