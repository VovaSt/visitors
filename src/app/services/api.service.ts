import { Injectable } from '@angular/core';
import { Person } from "../models/Person.model";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, catchError, map, Observable, of } from 'rxjs';
import {MessageService} from 'primeng/api';

const apiKey = "47YvDyZhHG2Bogw5RcR1Y7SHPTgJiAlb8tHu8ilZ";
const apiEndpoint = "https://n1i8imf9nd.execute-api.us-east-1.amazonaws.com/PROD";

@Injectable()
export class ApiService {

  private headers = new HttpHeaders({'x-api-key': apiKey });

  private visitors$: BehaviorSubject<Person[]> = new BehaviorSubject<Person[]>([]);
  private isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  public isLoading(): Observable<boolean> {
    return this.isLoading$.asObservable();
  }

  public getAllPeople(): Observable<Person[]> {
    return this.visitors$.asObservable();
  }

  public getPerson(id: string): Observable<Person> {
    return this.visitors$
      .asObservable()
      .pipe(map(d => d.find(p => p.id === id)));
  }

  public getSuggestions(query: string): Person[] {
    return this.visitors$.value
      .filter(person => {
        const name = person.firstName?.toLowerCase() || '';
        const surname = person.surname?.toLowerCase() || '';
        const middleName = person.middleName?.toLowerCase() || '';
        const search = query.toLowerCase();
        return name.startsWith(search) || surname.startsWith(search) || middleName.startsWith(search);
      })
      .slice(0, 5)
      .map(person => {
        person.fullName = `${person.surname || ''} ${person.firstName || ''} ${person.middleName || ''}`;
        return person;
      });
  }

  public fetchAllPeople() {
    this.isLoading$.next(true);
    this.http.get<any>(
      apiEndpoint, 
      { headers: this.headers }
    )
    .pipe(catchError(() => of({ statusCode: 400 })))
    .subscribe((data) => {
      const visitors: Person[] = JSON.parse(data);
      visitors.map(v => {
        v.visiting = v.visiting.map(d => new Date(d));
        v.lastVisit = v.lastVisit ? new Date(v.lastVisit) : undefined;
        return v;
      })
      this.visitors$.next(visitors);
      this.isLoading$.next(false);
    });
  }

  public addNewPerson(newPerson: Person): Observable<boolean> {
    const request = {...newPerson} as any;
    request.lastVisit = newPerson.lastVisit || '';
    return this.http.post<any>(
      apiEndpoint, 
      request, 
      { headers: this.headers }
    ).pipe(
      catchError(() => of({ statusCode: 400 })),
      map((data) => {
        if (data.statusCode >= 200 && data.statusCode < 300) {
          const visitors = this.visitors$.value;
          visitors.push(newPerson);
          this.visitors$.next(visitors);
          return true;
        } else {
          this.messageService.add({severity:'error', summary:'Помилка'});
          return false;
        }
      })
    );
  }

  public editPerson(person: Person): Observable<boolean> {
    const request = {...person} as any;
    request.lastVisit = person.lastVisit || '';
    return this.http.put<any>(
      apiEndpoint, 
      request,
      { headers: this.headers }
    ).pipe(
      catchError(() => of({ statusCode: 400 })),
      map((data) => {
        if (data.statusCode >= 200 && data.statusCode < 300) {
          const visitors = this.visitors$.value;
          const index = visitors.findIndex(p => p.id === person.id);
          visitors[index] = person;
          this.visitors$.next(visitors);
          this.messageService.add({severity:'success', summary:'Збережено'});
          return true;
        } else {
          this.messageService.add({severity:'error', summary:'Помилка'});
          return false;
        }
      })
    );
  }

  public deletePerson(id: string): Observable<boolean>  {
    return this.http.delete<any>(
      apiEndpoint, 
      { 
        headers: this.headers,
        body: { id }
      }
    ).pipe(
      catchError(() => of({ statusCode: 400 })),
      map((data) => {
        if (data.statusCode >= 200 && data.statusCode < 300) {
          const visitors = this.visitors$.value.filter(v => v.id !== id);
          this.visitors$.next(visitors);
          this.messageService.add({severity:'success', summary:'Видалено'});
          return true;
        } else {
          this.messageService.add({severity:'error', summary:'Помилка'});
          return false;
        }
      })
    );
  }
}
