import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const currentUser = this.authenticationService.isLoggedIn();
      console.log("currentUser",currentUser);

      if (currentUser) {
          //alert("Ok");
          // authorised so return true
          //this.router.navigate(['/dashboard'], { queryParams: { returnUrl: state.url }});
          console.log("TRUE");
          return true;
      }else{
        //alert("Ok1");
        this.router.navigate(['']);
        return false;

      }

      // not logged in so redirect to login page with the return url
      return false;
      
  }

  constructor(private router: Router,
    private authenticationService: AuthService) {
    
  }

 
  
}
