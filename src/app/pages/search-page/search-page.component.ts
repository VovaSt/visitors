import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { ApiService } from '../../services/api.service';
import { Person } from "../../models/Person.model";
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements OnInit {
  text: string = "";
  results$: BehaviorSubject<Person[]> = new BehaviorSubject<Person[]>([]);

  constructor(
    private apiService: ApiService,
    private router: Router
  ) { }

  ngOnInit(): void { }

  search(event: any) {
    const results = this.apiService.getSuggestions(event.query);
    this.results$.next(results);
  }

  select(result: Person) {
    this.router.navigate(["profile", result.id]);
  }
}
