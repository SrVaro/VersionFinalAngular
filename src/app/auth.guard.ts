import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ServicioAutentificacionService } from './servicios/servicio-autentificacion.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  private logged: boolean = false;

  constructor(private auth: ServicioAutentificacionService,
    private myRoute: Router
    ){
  }

  isLogged() {
    this.auth.isAuth().subscribe(auth => {
      if (auth) {
        this.logged = true;
      } else {
        this.logged = false;
      }
    });
  }
  
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.auth.isAuth().pipe(map(
      user=>{
        if(user){
          return true;
        }else{
          return false;
        }
      }));   
     
    
    
   
    
  }
}
