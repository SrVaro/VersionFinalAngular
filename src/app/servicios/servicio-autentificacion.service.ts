import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ServicioAutentificacionService {

  constructor(
    public afAuth: AngularFireAuth
    ) { }

  isLogged: boolean = false;

  doGoogleLogin(){
    return new Promise<any>((resolve, reject) => {
      let provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');
      this.afAuth.auth
      .signInWithPopup(provider)
      .then(res => {
        resolve(res);
      })
    })
  }

  doRegister(value){
    return new Promise<any>((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
      .then(res => {
        resolve(res);
      }, err => reject(err))
    })
  }

    doLogin(value){
      return new Promise<any>((resolve, reject) => {
        firebase.auth().signInWithEmailAndPassword(value.email, value.password)
        .then(res => {
          resolve(res);
        }, err => reject(err))
      })
    }

    isAuth() {
      return this.afAuth.authState.pipe(map(auth => auth));
    }

    logout(){
      this.afAuth.auth.signOut();
    }

    
    

    
  }
  

