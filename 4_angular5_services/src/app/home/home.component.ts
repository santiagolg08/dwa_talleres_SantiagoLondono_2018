import { Component, OnInit } from '@angular/core';
import { PeticionService } from '../services/peticion.service'
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [PeticionService]
})
export class HomeComponent implements OnInit {

  public pokemones;

  constructor(
    private _router:Router,
    private _peticionService: PeticionService
  ) { }

  ngOnInit() {
    // Llamando al servicio _peticionService 
    this._peticionService.getArticulos().subscribe(
      result => {
        console.log(result);
        this.pokemones = result;

      },
      error => {
        var errorMsj = <any>error;
        console.log(errorMsj);
      }
    );
  }

  verInfoPokemon(_index){
    this._router.navigate(['/pokemon/'+_index]);
  }

}
