import { Component, OnInit } from '@angular/core';
import { PeticionService } from '../services/peticion.service'

@Component({
  selector: 'app-info-pokemon',
  templateUrl: './info-pokemon.component.html',
  styleUrls: ['./info-pokemon.component.scss'],
  providers: [PeticionService]
})
export class InfoPokemonComponent implements OnInit {
  
  public pokemones;

  constructor(private _peticionService: PeticionService) { }

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
