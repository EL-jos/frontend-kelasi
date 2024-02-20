import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map } from 'rxjs';
import { AtuhService } from 'src/app/services/auth/atuh.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AtuhService, private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.user
      .pipe(
        map((user: any) => {
          const isAuthenticated = user ? !!user.token : false;
          const requiredRoles = next.data['roles'] as Array<string>;

          if (!isAuthenticated) {
            this.router.navigate(['/login']);
            return false;
          }

          if (requiredRoles && requiredRoles.length > 0) {
            const userRoles = user.roles.map((role: any) => role.name);

            // Vérifier si l'utilisateur a au moins l'un des rôles requis
            const hasRequiredRole = requiredRoles.some(role => userRoles.includes(role));

            if (!hasRequiredRole) {
              this.router.navigate(['/dashboard']);  // ou vers une page d'accès refusé
              return false;
            }
          }

          return true;
        })
      );
  }
  /* canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.user
      .pipe(
        map((user: any) => {
          const isAuthenticated = user ? !!user.token : false;
          if (!isAuthenticated) {
            this.router.navigate(['/login']);
          }
          return isAuthenticated;
        })
      );
  } */
  
}
