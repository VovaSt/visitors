import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Person } from 'src/app/models/Person.model';
import { ApiService } from 'src/app/services/api.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-add-or-edit-page',
  templateUrl: './add-or-edit-page.component.html',
  styleUrls: ['./add-or-edit-page.component.scss']
})
export class AddOrEditPageComponent implements OnInit {

  title = " ";

  surname: string;
  name: string;
  middleName: string;

  id: string;
  person: Person;

  constructor(
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    
    if (this.id) {
      this.person = this.apiService.getPerson(this.id);
      
      if (this.person) {
        this.title = "Редагування профілю";
        this.surname = this.person.surname;
        this.name = this.person.name;
        this.middleName = this.person.middleName;
      }
    } else {
      this.title = "Додавання профілю";
    }
  }

  addProfile() {
    const request: Person = {
      id: this.person?.id || uuidv4(),
      surname: this.surname,
      name: this.name,
      middleName: this.middleName,
      visiting: this.person?.visiting || [],
      lastVisit: this.person?.lastVisit || undefined
    };

    if (this.id) {
      this.apiService.editPerson(request);
    } else {
      this.apiService.addNewPerson(request);
    }
    
    this.router.navigate(["profile", request.id]);
  }
}
