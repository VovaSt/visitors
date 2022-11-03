import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchPageComponent } from "./pages/search-page/search-page.component";
import { AddOrEditPageComponent } from "./pages/add-or-edit-page/add-or-edit-page.component";
import { ListPageComponent } from "./pages/list-page/list-page.component";
import { ProfilePageComponent } from "./pages/profile-page/profile-page.component";

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: SearchPageComponent
  },
  {
    path: 'add',
    pathMatch: 'full',
    component: AddOrEditPageComponent
  },
  {
    path: 'list',
    pathMatch: 'full',
    component: ListPageComponent
  },
  {
    path: 'profile/:id',
    component: ProfilePageComponent
  },
  {
    path: 'edit/:id',
    component: AddOrEditPageComponent
  },
  {
    path: '*',
    component: SearchPageComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
