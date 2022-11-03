import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';

import { MenubarModule } from 'primeng/menubar';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { AccordionModule } from 'primeng/accordion';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ConfirmationService } from 'primeng/api';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';

import { ApiService } from "./services/api.service";

import { AppComponent } from './app.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { AddOrEditPageComponent } from './pages/add-or-edit-page/add-or-edit-page.component';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';

import { registerLocaleData } from '@angular/common';
import localeUk from '@angular/common/locales/uk';
import { SortDatesPipe } from './pipes/sort-dates.pipe';
registerLocaleData(localeUk);

@NgModule({
  declarations: [
    AppComponent,
    SearchPageComponent,
    AddOrEditPageComponent,
    ListPageComponent,
    ProfilePageComponent,
    SortDatesPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    MenubarModule,
    AutoCompleteModule,
    TableModule,
    ButtonModule,
    CardModule,
    AccordionModule,
    ConfirmPopupModule,
    CalendarModule,
    InputTextModule
  ],
  providers: [
    ApiService,
    ConfirmationService,
    { provide: LOCALE_ID, useValue: "uk" }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
