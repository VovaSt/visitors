import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { Person } from "../../models/Person.model";

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.scss']
})
export class ListPageComponent implements OnInit {

  people$: Observable<Person[]>;

  constructor(
    private apiService: ApiService,
    private router: Router  
  ) { }

  ngOnInit(): void {
    this.people$ = this.apiService.getAllPeople();
  }

  getLastVisit(visiting: string[]) {
    return visiting[0];
  }

  redirect(id: number) {
    this.router.navigate(['profile', id]);
  }
}
