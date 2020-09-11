import { HttpClientModule } from '@angular/common/http';
import { FormsModule} from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { DetailRecetteComponent } from './detail-recette/detail-recette.component';
import { RecettesService } from './service/recettes.service';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { HomeComponent } from './home/home.component';
import { AjoutRecetteComponent } from './ajout-recette/ajout-recette.component';
import { Routes, RouterModule } from '@angular/router';


registerLocaleData(localeFr, 'fr');

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'ajoutRecette', component: AjoutRecetteComponent }
];


@NgModule({
  declarations: [
    AppComponent,
    DetailRecetteComponent,
    HomeComponent,
    AjoutRecetteComponent,

  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    FormsModule,
    AngularFontAwesomeModule,
    RouterModule.forRoot(appRoutes)

  ],
  providers: [RecettesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
