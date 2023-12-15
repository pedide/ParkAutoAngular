export class Vehicule {
    anneeModel: number;
    modelVehicule: string;
    imageVehicule: string;
    prix: number;
    descriptif:number;

    constructor(
    anneeModel: number,
    modelVehicule: string,
    imageVehicule: string,
    prix: number,
    descriptif:number
    ){
        this.anneeModel = anneeModel;
        this.imageVehicule = imageVehicule;
        this.modelVehicule = modelVehicule;
        this.prix = prix;
        this.descriptif = descriptif;

    }
    
}
