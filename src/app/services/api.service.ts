import { Injectable } from '@angular/core';
import { Person } from "../models/Person.model";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

const apiKey = "47YvDyZhHG2Bogw5RcR1Y7SHPTgJiAlb8tHu8ilZ";
const apiEndpoint = "https://n1i8imf9nd.execute-api.us-east-1.amazonaws.com/PROD";

@Injectable()
export class ApiService {

  private httpOptions = {
    headers: new HttpHeaders({
      'x-api-key': apiKey
    })
  }

  private visitors$: BehaviorSubject<Person[]> = new BehaviorSubject<Person[]>([]);
  private isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  // private people: Person[] = [
  //   { id: "1", name: "Володимир", surname: "Стахов", middleName: "Петрович",
  //     visiting: [], 
  //     lastVisit: undefined 
  //   },
  //   { id: "2", name: "Тарас", surname: "Шевченко", middleName: "Васильович",
  //     visiting: [new Date("11/04/2022"), new Date("05/05/2022")], 
  //     lastVisit: new Date("11/04/2022")
  //   },
  //   { id: "3", name: "Андрій", surname: "Миколенко",  middleName: "Миколайович",
  //     visiting: [new Date("04/07/2022")], 
  //     lastVisit: new Date("04/07/2022") 
  //   },
  //   { id: "4", name: "Сергій", surname: "Крутивус",  middleName: "Генадієвич",
  //     visiting: [new Date("12/04/2022"), new Date("05/05/2022"), new Date("05/25/2022")], 
  //     lastVisit:  new Date("04/12/2022")
  //   },
  //   { id: "5", name: "Руслан", surname: "Гаврилюк",  middleName: "Андрійович",
  //     visiting: [new Date("03/04/2022"), new Date("05/05/2022"), new Date("12/04/2022"), new Date("05/09/2022"), new Date("01/05/2022")], 
  //     lastVisit: new Date("04/03/2022")
  //   },
  //   { id: "6", name: "Георгій", surname: "Редич",  middleName: "Богданович",
  //     visiting: [new Date("04/04/2022"), new Date("05/05/2022")], 
  //     lastVisit: new Date("04/04/2022") 
  //   }
  // ];

  constructor(private http: HttpClient) { }

  public isLoading() {
    return this.isLoading$.asObservable();
  }

  public getSuggestions(query: string): Person[] {
    return this.visitors$.value
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

  public fetchAllPeople() {
    this.isLoading$.next(true);
    this.http.get<any>(apiEndpoint, this.httpOptions)
      .subscribe((data) => {
        this.visitors$.next(JSON.parse(data));
        this.isLoading$.next(false);
      });
  }

  public getAllPeople() {
    return this.visitors$;
  }

  public getPerson(id: string) {
    return this.visitors$.value.find(p => p.id === id);
  }

  public addNewPerson(newPerson: Person) {
    this.http.post<Person[]>(apiEndpoint, newPerson, this.httpOptions)
      .subscribe(data => {
        const visitors = this.visitors$.value;
        visitors.push(newPerson);
        this.visitors$.next(visitors);
      });
  }

  public editPerson(person: Person) {
    const visitors = this.visitors$.value;
    const index = visitors.findIndex(p => p.id === person.id);
    visitors[index] = person;
    this.visitors$.next(visitors);
  }
}
