import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CanReadGuard implements CanActivate  {

  constructor(private _authService: AuthService) {}

  canActivate(next,state): Observable<boolean> {
    return this._authService.user.pipe(
      take(1),
      map(user => user && this._authService.canRead(user) ? true : false),
      tap(canView => {
        if (!canView) {
          console.error('Access Denied - Admins Only.')
        }
      })
    )
  }


}
