import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddRecipeComponent } from './add-recipe/add-recipe.component';
import { FindRecipeComponent } from './find-recipe/find-recipe.component';

const routes: Routes = [
  { path: '', component: FindRecipeComponent},
  { path: 'ajout', component: AddRecipeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
