import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Header } from 'src/app/shared/application.model';
import { ApplicationService } from 'src/app/shared/application.service';
import { RecipeService } from 'src/app/shared/recipe.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  headers: Header[] = [];

  @Output() sidenavToggle = new EventEmitter<void>();

  constructor(private applicationService: ApplicationService, private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.headers = this.applicationService.getHeaders();
  }

  onToggle(): void {
    this.sidenavToggle.emit();
  }

}
