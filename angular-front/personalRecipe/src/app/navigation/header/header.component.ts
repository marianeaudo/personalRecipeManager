import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Header } from 'src/app/shared/application.model';
import { ApplicationService } from 'src/app/shared/application.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  headers: Header[] = [];
  selectedHeader = this.applicationService.getHeaders()[0];
  selectedHeaderSubscription: Subscription;
  routerSubscription: Subscription;

  @Output() sidenavToggle = new EventEmitter<void>();

  constructor(private applicationService: ApplicationService, private router: Router) { }

  ngOnInit(): void {
    this.headers = this.applicationService.getHeaders();

    this.routerSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        console.log(event['url']);
        this.applicationService.setSelectedHeader(
            this.headers.find((header) => header.route === event['url'])
        );
      }
    });

    this.selectedHeaderSubscription = this.applicationService.selectedHeaderSubject.subscribe(
      (header: any) => {
        this.selectedHeader = header;
      }
    );
  }

  onToggleSidenav(): void {
    this.sidenavToggle.emit();
  }

  isSelected(header: Header): string {
    if (header.name === this.selectedHeader.name) {
      return 'selected';
    }
  }

  ngOnDestroy(): void {
    this.routerSubscription.unsubscribe();
    this.selectedHeaderSubscription.unsubscribe();
  }
}
