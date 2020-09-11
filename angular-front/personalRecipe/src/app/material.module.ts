import { NgModule } from '@angular/core';

import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  imports: [
    MatSidenavModule,
    MatIconModule,
    MatToolbarModule,
    MatListModule,
    MatSnackBarModule
    ],
  exports: [
    MatSidenavModule,
    MatIconModule,
    MatToolbarModule,
    MatListModule,
    MatSnackBarModule
    ]
})

export class MaterialModule {

}
