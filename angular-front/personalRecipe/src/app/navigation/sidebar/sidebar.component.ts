import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  headers = [
    {name: 'Trouver une recette', icon: 'book', route: ''},
    {name: 'Ajouter une recette', icon: 'add', route: 'ajout'}
  ];

  @Output() sidenavToggle = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

  onToggle(): void {
    this.sidenavToggle.emit();
  }

}
