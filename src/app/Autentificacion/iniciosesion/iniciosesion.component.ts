import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServicioAutentificacionService } from 'src/app/servicios/servicio-autentificacion.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-iniciosesion',
  templateUrl: './iniciosesion.component.html',
  styleUrls: ['./iniciosesion.component.css']
})
export class IniciosesionComponent implements OnInit {

  loginForm: FormGroup;

  registerForm: FormGroup;

  errorMessage: string = '';

  successMessage: string;

  inicioAbierto: boolean = true;

  constructor(
    public authService: ServicioAutentificacionService,
    private router: Router,
    private fb: FormBuilder,
    private servicioSpinner: NgxSpinnerService
  ) { 
    this.createFormInicioSesion();
    this.createFormRegistro();
    this.logout();
  }

  ngOnInit() {
  }

  spinner(): void{
    this.servicioSpinner.show();
    setTimeout(() => {
        this.servicioSpinner.hide();
    }, 2000)
  }

  cambiarFormulario(){
    this.inicioAbierto = !this.inicioAbierto;
  }

  createFormInicioSesion() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required ],
      password: ['',Validators.required]
    });
  }

  tryGoogleLogin(){
    this.spinner();
    this.authService.doGoogleLogin()
    .then(res => {
      this.router.navigate(['/user']);
    })
  }

  tryLogin(value){
    
    this.authService.doLogin(value)
    .then(res => {
      this.spinner();
      this.router.navigate(['/user']);
    }, err => {
      console.log(err);
      this.errorMessage = err.message;
    })
  }

  createFormRegistro() {
    this.registerForm = this.fb.group({
      email: ['', Validators.required ],
      password: ['',Validators.required]
    });
  }

  tryRegister(value){
    this.authService.doRegister(value)
    .then(res => {
      this.spinner();
      console.log(res);
      this.errorMessage = "";
      this.successMessage = "Your account has been created";
      this.inicioAbierto = true;
    }, err => {
      console.log(err);
      this.errorMessage = err.message;
      this.successMessage = "";
    })
    
  }

  logout(){
    this.authService.logout();
  }

}
