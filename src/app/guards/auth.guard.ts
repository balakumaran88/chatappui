import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import {AuthService} from '../services/auth.service'
import { routerNgProbeToken } from '@angular/router/src/router_module';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
constructor(private _router: Router, private _auth: AuthService){}

canActivate():boolean {
  if(this._auth.loggedIn){
    return true
  } else {
    this._router.navigate(["/login"])
    return false
  }

}
}
