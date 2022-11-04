import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Person } from 'src/app/models/Person.model';
import { ApiService } from 'src/app/services/api.service';
import { v4 as uuidv4 } from 'uuid';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-add-or-edit-page',
  templateUrl: './add-or-edit-page.component.html',
  styleUrls: ['./add-or-edit-page.component.scss']
})
export class AddOrEditPageComponent implements OnInit {

  title = " ";

  surname: string;
  firstName: string;
  middleName: string;

  id: string;
  person$: Observable<Person>;
  person: Person;

  constructor(
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    
    if (this.id) {
      this.person$ = this.apiService.getPerson(this.id);
      
      this.person$
        .pipe(untilDestroyed(this))
        .subscribe(person => {
          if (person) {
            this.title = "Редагування профілю";
            this.surname = person.surname;
            this.firstName = person.firstName;
            this.middleName = person.middleName;
            this.person = person;
          }
        });
    } else {
      this.title = "Додавання профілю";
    }
  }

  addProfile() {
    const request: Person = {
      id: this.person?.id || uuidv4(),
      surname: this.surname,
      firstName: this.firstName,
      middleName: this.middleName,
      visiting: this.person?.visiting || [],
      lastVisit: this.person?.lastVisit || undefined
    };

    if (this.id) {
      this.apiService.editPerson(request)
        .subscribe((response) => response && this.router.navigate(["profile", request.id]));
    } else {
      this.apiService.addNewPerson(request)
        .subscribe((response) => response && this.router.navigate(["profile", request.id]));
    }
  }
}
