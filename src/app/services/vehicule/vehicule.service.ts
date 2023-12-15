import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppSettings } from '../../settings/app.settings';
import { Vehicule } from '../../models/vehicule/vehicule';

@Injectable({
  providedIn: 'root'
})
export class VehiculeService {

  constructor(private http:HttpClient) { }

  findAllVehicules(){
    return this.http.get(AppSettings.APP_URL+"vehicules");
  }

  saveVehicule(vehicule:Vehicule){
    return this.http.post(AppSettings.APP_URL+"vehicule/",vehicule);
  }
}
