import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {MenuItem} from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';
import { primeNgTranslations } from "./const/primeng-translations";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  items: MenuItem[] = [];

  constructor(
    private router: Router,
    private config: PrimeNGConfig
  ) { }

  ngOnInit() {
    this.config.setTranslation(primeNgTranslations);

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
