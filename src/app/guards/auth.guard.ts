import { Injectable, inject } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    router = inject(Router);

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        let authenticatedUser = JSON.parse(localStorage.getItem("authenticatedUser")!);
        debugger;
        if (authenticatedUser) {
            return true;
        }
        else {
            this.router.navigate(['/']);
            return false;
        }
    }
}