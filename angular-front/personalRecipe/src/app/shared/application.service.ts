import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Header} from './application.model';

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
}
