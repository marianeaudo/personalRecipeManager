import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Subject } from 'rxjs';
import { Header, Recipe} from './application.model';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  headers: Header[] = [
    {name: 'Trouver une recette', icon: 'book', route: '/'},
    {name: 'Ajouter une recette', icon: 'add', route: '/ajout'}
  ];

  private selectedHeader: Header;
  selectedHeaderSubject = new Subject<Header>();

  constructor(private http: HttpClient) { }

  getHeaders(): Header[] {
    return [...this.headers];
  }

  setSelectedHeader(header: Header): void {
    this.selectedHeader = header;
    this.selectedHeaderSubject.next({...this.selectedHeader});
  }

  translateMatPaginator(paginator: MatPaginator): void {
    paginator._intl.firstPageLabel = 'Première page';
    paginator._intl.itemsPerPageLabel = 'Recettes par page';
    paginator._intl.lastPageLabel = 'Dernière page';
    paginator._intl.nextPageLabel = 'Page suivante';
    paginator._intl.previousPageLabel = 'Page précédente';
  }
}
