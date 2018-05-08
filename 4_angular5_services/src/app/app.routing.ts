import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { InfoPokemonComponent } from './info-pokemon/info-pokemon.component';

const appRoutes: Routes = [
    { path:'', component:HomeComponent },
    { path:'home', component:HomeComponent },
    { path:'pokemon', component:InfoPokemonComponent },
    { path:'pokemon/:ident', component:InfoPokemonComponent },    
];

export const appRoutingProviders: any = [];
export const routing: ModuleWithProviders = RouterModule.forRoot (appRoutes);