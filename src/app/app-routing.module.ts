import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {EventsComponent} from './components/events/events.component';
import {RegisterComponent} from './components/register/register.component'
import { SpecialEventsComponent } from './components/special-events/special-events.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  {path:'',redirectTo:'/events',pathMatch:'full'},
  {path: 'events', component: EventsComponent},
  {path: 'register', component: RegisterComponent},
  {path:'special', component: SpecialEventsComponent},
  {path:'login', component:LoginComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
