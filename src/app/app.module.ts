import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';

import { MenubarModule } from 'primeng/menubar';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';

import { ApiService } from "./services/api.service";

import { AppComponent } from './app.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { AddPageComponent } from './pages/add-page/add-page.component';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';

import { registerLocaleData } from '@angular/common';
import localeUk from '@angular/common/locales/uk';
registerLocaleData(localeUk);

@NgModule({
  declarations: [
    AppComponent,
    SearchPageComponent,
    AddPageComponent,
    ListPageComponent,
    ProfilePageComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    MenubarModule,
    AutoCompleteModule,
    TableModule,
    ButtonModule
  ],
  providers: [
    ApiService,
    { provide: LOCALE_ID, useValue: "uk" }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
