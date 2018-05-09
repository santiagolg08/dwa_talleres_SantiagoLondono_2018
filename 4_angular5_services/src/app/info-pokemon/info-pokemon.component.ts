import { Component, OnInit } from '@angular/core';
import { PeticionService } from '../services/peticion.service'
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-info-pokemon',
  templateUrl: './info-pokemon.component.html',
  styleUrls: ['./info-pokemon.component.scss'],
  providers: [PeticionService]
})
export class InfoPokemonComponent implements OnInit {
  
  public pokemones;
  public idPokemon: string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
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
        this._route.params.forEach((params:Params) => {
          this.idPokemon = params['ident'];
          console.log(params);
        });
  }

  public subirLike(event) {
    let lblLikes = document.getElementById("contLikes");
    let contLikes = parseInt(lblLikes.innerText);
    contLikes++;
    lblLikes.innerText = String(contLikes);
  }

  public bajarLike(event) {
    let lblLikes = document.getElementById("contLikes");
    let contLikes = parseInt(lblLikes.innerText);
    if (contLikes > 0) {
      contLikes--;
      lblLikes.innerText = String(contLikes);
    }
  }
}
