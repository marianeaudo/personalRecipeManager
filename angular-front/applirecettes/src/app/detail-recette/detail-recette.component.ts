import { Component, OnInit, Input } from '@angular/core';
import { Recette } from '../models/recette.model';

@Component({
  selector: 'app-detail-recette',
  templateUrl: './detail-recette.component.html',
  styleUrls: ['./detail-recette.component.scss']
})
export class DetailRecetteComponent implements OnInit {

  @Input() recette: Recette;

  

  constructor() { }

  ngOnInit() {
  }

}
