import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';
import { take, map, tap } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class AuthGuard implements CanActivate {
	constructor(private _authService: AuthService, private router: Router) {}

	canActivate(next, state): Observable<boolean> {
		return this._authService.user.pipe(
			take(1),
			map((user) => !!user),
			tap((loggedIn) => {
				if (!loggedIn) {
					console.error('Access Denied - Please Login.');
					this.router.navigate([ '/' ]);
				}
			})
		);
	}
}
