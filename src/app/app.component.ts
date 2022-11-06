import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {MenuItem} from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';
import { Observable } from 'rxjs';
import { primeNgTranslations } from "./const/primeng-translations";
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  items: MenuItem[] = [];
  isLoading$: Observable<boolean>;
  isInnerLoading$: Observable<boolean>;

  constructor(
    private router: Router,
    private config: PrimeNGConfig,
    private apiService: ApiService
  ) { 
    this.isLoading$ = this.apiService.isLoading();
    this.isInnerLoading$ = this.apiService.isInnerLoading();
  }

  ngOnInit() {
    this.config.setTranslation(primeNgTranslations);
    this.apiService.fetchAllPeople();

    this.items = [
      {
        label: 'Пошук',
        icon: 'pi pi-fw pi-search',
        routerLink: ['/'],
        command: (event) => this.router.navigate(event.item.routerLink)
      },
      {
        label: 'Додати',
        icon: 'pi pi-fw pi-plus',
        routerLink: ['/add'],
        command: (event) => this.router.navigate(event.item.routerLink)
      },
      {
        label: 'Список',
        icon: 'pi pi-fw pi-list',
        routerLink: ['/list'],
        command: (event) => this.router.navigate(event.item.routerLink)
      }
    ];
  }
}
