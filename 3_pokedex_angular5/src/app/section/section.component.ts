import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss']
})
export class SectionComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  public subirLike(event){
    let lblLikes = document.getElementById("contLikes");
    let contLikes = parseInt(lblLikes.innerText); 
    contLikes ++;
    lblLikes.innerText = String(contLikes);  
  }

  public bajarLike(event){
    let lblLikes = document.getElementById("contLikes");
    let contLikes = parseInt(lblLikes.innerText); 
    if(contLikes > 0){
      contLikes --;
      lblLikes.innerText = String(contLikes);  
    }

  }
}
