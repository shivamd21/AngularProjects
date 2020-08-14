import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CountriedComponent } from './countried/countried.component';
import { HomeComponent } from './home/home.component';


const routes: Routes = [
  {path:"",component:HomeComponent},
  {path:"country",component:CountriedComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
