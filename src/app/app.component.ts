import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private router: Router) { }

  items: MenuItem[] = [
    {
      label: 'Пошук',
      icon: 'pi pi-fw pi-search',
      routerLink: ['/'],
      command: (event) => {
        this.router.navigate(event.item.routerLink);
      }
    },
    {
      label: 'Додати',
      icon: 'pi pi-fw pi-plus',
      routerLink: ['/add'],
      command: (event) => {
        this.router.navigate(event.item.routerLink);
      }
    },
    {
      label: 'Список',
      icon: 'pi pi-fw pi-list',
      routerLink: ['/list'],
      command: (event) => {
        this.router.navigate(event.item.routerLink);
      }
    }
  ];

  goTo(event: any) {
    let node;
    if (event.target.tagName === "A") {
      node = event.target;
    } else {
      node = event.target.parentNode;
    }
    let menuitem = document.getElementsByClassName("ui-menuitem-link");
    for (let i = 0; i < menuitem.length; i++) {
      menuitem[i].classList.remove("active");
    }
    node.classList.add("active")
  }
}
