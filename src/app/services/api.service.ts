import { Injectable } from '@angular/core';
import { Person } from "../models/Person.model";

@Injectable()
export class ApiService {

  private people: Person[] = [
    { id: 1, name: "Володимир", surname: "Стахов" },
    { id: 2, name: "Тарас", surname: "Шевченко" },
    { id: 3, name: "Андрій", surname: "Миколенко" },
    { id: 4, name: "Сергій", surname: "Крутивус" },
    { id: 5, name: "Руслан", surname: "Гаврилюк" },
    { id: 6, name: "Георгій", surname: "Редич" }
  ];
  constructor() { }

  public getSuggestions(query: string): Person[] {
    return this.people
      .filter(person => {
        const name = person.name.toLowerCase();
        const surname = person.surname.toLowerCase();
        const search = query.toLowerCase();
        return name.startsWith(search) || surname.startsWith(search);
      })
      .slice(0, 5)
      .map(person => {
        person.fullName = `${person.surname} ${person.name}`;
        return person;
      });
  }
}
