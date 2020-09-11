import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddRecipeComponent } from './add-recipe/add-recipe.component';
import { FindRecipeComponent } from './find-recipe/find-recipe.component';
import { HeaderComponent } from './navigation/header/header.component';
import { SidebarComponent } from './navigation/sidebar/sidebar.component';
import { MaterialModule } from './material.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    AddRecipeComponent,
    FindRecipeComponent,
    HeaderComponent,
    SidebarComponent
    ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule
  ],
  providers: [
    {
      provide: LOCALE_ID, useValue: 'fr'
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
