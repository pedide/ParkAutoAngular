import { Component } from '@angular/core';
import { VehiculeService } from '../../services/vehicule/vehicule.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vehicule',
  templateUrl: './vehicule.component.html',
  styleUrl: './vehicule.component.css'
})
export class VehiculeComponent {
  vehicules: any;
constructor(private vehiculeService:VehiculeService, private router:Router){}

ngOnInit(){

  this.getVehicules();
}
  getVehicules() {
    this.vehiculeService.findAllVehicules().subscribe(
      data =>{
        console.log(data);
        this.vehicules=data;
      }
    );
  }

}
