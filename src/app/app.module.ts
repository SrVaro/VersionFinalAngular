import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { IniciosesionComponent } from './Autentificacion/iniciosesion/iniciosesion.component';
import { PaginaPrincipalComponent } from './paginas/pagina-principal/pagina-principal.component';
import { ServicioAutentificacionService } from './servicios/servicio-autentificacion.service';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AuthGuard } from './auth.guard';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { NuevoPersonajeComponent } from './paginas/nuevo-personaje/nuevo-personaje.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { SidebarModule } from 'ng-sidebar';
import { FlipModule } from 'ngx-flip';

const appRoutes: Routes = [
  { path: '', component: PaginaPrincipalComponent, pathMatch: 'full', canActivate: [AuthGuard] },
  { path: 'login', component: IniciosesionComponent },
  { path: 'user', component: PaginaPrincipalComponent, canActivate: [AuthGuard]}

];

@NgModule({
  declarations: [
    AppComponent,
    IniciosesionComponent,
    PaginaPrincipalComponent,
    NuevoPersonajeComponent
    
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    ModalModule.forRoot(),
    SidebarModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    FlipModule
  ],
  providers: [ServicioAutentificacionService],
  bootstrap: [AppComponent],
  entryComponents:[ NuevoPersonajeComponent ]
})
export class AppModule { }
