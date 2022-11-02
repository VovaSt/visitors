import { Injectable } from '@angular/core';
import { Person } from "../models/Person.model";

@Injectable()
export class ApiService {

  private people: Person[] = [
    { id: 1, name: "Володимир", surname: "Стахов", middleName: "Петрович",
      visiting: [], 
      lastVisit: undefined 
    },
    { id: 2, name: "Тарас", surname: "Шевченко", middleName: "Васильович",
      visiting: [new Date("11/04/2022"), new Date("05/05/2022")], 
      lastVisit: new Date("11/04/2022")
    },
    { id: 3, name: "Андрій", surname: "Миколенко",  middleName: "Миколайович",
      visiting: [new Date("04/07/2022")], 
      lastVisit: new Date("04/07/2022") 
    },
    { id: 4, name: "Сергій", surname: "Крутивус",  middleName: "Генадієвич",
      visiting: [new Date("12/04/2022"), new Date("05/05/2022"), new Date("05/25/2022")], 
      lastVisit:  new Date("04/12/2022")
    },
    { id: 5, name: "Руслан", surname: "Гаврилюк",  middleName: "Андрійович",
      visiting: [new Date("03/04/2022"), new Date("05/05/2022"), new Date("12/04/2022"), new Date("05/09/2022"), new Date("01/05/2022")], 
      lastVisit: new Date("04/03/2022")
    },
    { id: 6, name: "Георгій", surname: "Редич",  middleName: "Богданович",
      visiting: [new Date("04/04/2022"), new Date("05/05/2022")], 
      lastVisit: new Date("04/04/2022") 
    }
  ];
  constructor() { }

  public getSuggestions(query: string): Person[] {
    return this.people
      .filter(person => {
        const name = person.name.toLowerCase();
        const surname = person.surname.toLowerCase();
        const middleName = person.middleName.toLowerCase();
        const search = query.toLowerCase();
        return name.startsWith(search) || surname.startsWith(search) || middleName.startsWith(search);
      })
      .slice(0, 5)
      .map(person => {
        person.fullName = `${person.surname} ${person.name} ${person.middleName}`;
        return person;
      });
  }

  public getAllPeople() {
    return this.people;
  }

  public getPerson(id: number) {
    return this.people.find(p => p.id === id);
  }
}
