import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { ApiService } from 'src/app/services/api.service';
import { Person } from "../../models/Person.model";

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {

  id: string;
  person: Person;
  visitValue: Date = new Date();
  visiting: Date[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService,
    private confirmationService: ConfirmationService  
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.person = this.apiService.getPerson(this.id);
    this.visiting = this.person?.visiting || [];
  }

  deleteVisit(event: Event, visit: Date) {
    this.confirmationService.confirm({
      target: event.target,
      message: 'Ви дійсно хочете видалити цей візит?',
      accept: () => {
        const index = this.person.visiting.indexOf(visit);
        this.person.visiting.splice(index, 1);
        this.recalculateVisiting();
      }
    });
  }

  addVisit() {
    this.visiting.push(this.visitValue);
    this.recalculateVisiting();
  }

  editPerson() {
    this.router.navigate(["edit", this.person.id]);
  }

  deletePerson() {
    this.confirmationService.confirm({
      target: event.target,
      message: 'Ви дійсно хочете видалити цей обліковий запис?',
      accept: () => this.router.navigate(["/"])
    });
  }

  recalculateVisiting() {
    this.person.visiting = this.visiting;
    this.person.lastVisit = this.visiting
      .reduce((a, b) => a.getTime() > b.getTime() ? a : b);
    this.apiService.editPerson(this.person);
  }
}
