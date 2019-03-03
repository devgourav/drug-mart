import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CanEditGuard implements CanActivate {

  constructor(private _authService: AuthService) {}

  canActivate(next,state): Observable<boolean> {
      return this._authService.user.pipe(
        take(1),
        map(user => user && this._authService.canWrite(user) ? true : false),
        tap(canEdit => {
          if (!canEdit) {
            console.error('Access Denied - Admins Only.')
          }
        })
      )
  }

}
