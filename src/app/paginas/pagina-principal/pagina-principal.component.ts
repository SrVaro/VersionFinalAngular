import { Component, OnInit } from '@angular/core';
import { ServicioFirebaseService } from 'src/app/servicios/servicio-firebase.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { NuevoPersonajeComponent } from '../nuevo-personaje/nuevo-personaje.component';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ServicioAutentificacionService } from 'src/app/servicios/servicio-autentificacion.service';


@Component({
  selector: 'app-pagina-principal',
  templateUrl: './pagina-principal.component.html',
  styleUrls: ['./pagina-principal.component.css']
})
export class PaginaPrincipalComponent implements OnInit {

  bsModalRef: BsModalRef;

  logged : boolean = false;

  public documentId = null;

  public currentStatus = 2; 

  editando: boolean = false;

  public pjs = [];

  public _opened: boolean = false;

  public editPJForm = new FormGroup({
    nombre: new FormControl('' ,Validators.required),
    url: new FormControl('', Validators.required),
    id: new FormControl(''),
    descripcion: new FormControl(''),
    saga: new FormControl(''),
    cita: new FormControl(''),
    arriba: new FormControl('' ,Validators.required),
    abajo: new FormControl('',Validators.required),
    lateral: new FormControl('',Validators.required),
    normal: new FormControl('',Validators.required),
    smash: new FormControl('',Validators.required),
  });

  edicionForm: FormGroup;


  constructor(
    private servicioSpinner : NgxSpinnerService,
    private db: ServicioFirebaseService,
    private fb: FormBuilder,
    private authFirebase : ServicioAutentificacionService,
    private modalService: BsModalService
  ) { 
    this.isLogged();
    this.editPJForm.setValue({
      id: '',
      nombre: '',
      url: '',
      descripcion: '',
      saga: '',
      cita: '',
      arriba: '',
      abajo: '',
      lateral: '',
      normal: '',
      smash: ''
    });
  }

  openModalWithComponent() {
    const initialState = {};
    this.bsModalRef = this.modalService.show(NuevoPersonajeComponent, {initialState});
    this.bsModalRef.content.closeBtnName = 'Close';
  }

  isLogged() {
    this.authFirebase.isAuth().subscribe(auth => {
      if (auth) {
        console.log('user logged');
        this.logged = true;
      } else {
        console.log('NOT user logged');
        this.logged = false;
      }
    });
  }

  logout(){
    this.authFirebase.logout();
  }

  public editPJ(form, documentId = this.documentId) {
      let data = {
        nombre: form.nombre,
          url: form.url,
          descripcion: form.descripcion,
          saga: form.saga,
          cita: form.cita,
          arriba: form.arriba,
          abajo: form.abajo,
          lateral: form.lateral,
          normal: form.normal,
          smash: form.smash

      }
      this.db.updatePJ(documentId, data).then(() => {
        this.currentStatus = 1;
        this.editPJForm.setValue({
          nombre: '',
          url: '',
          id: '',
          descripcion: '',
          saga: '',
          cita: '',
          arriba: '',
          abajo: '',
          lateral: '',
          normal: '',
          smash: ''
        });
        console.log('Documento editado exitósamente');
        this._toggleSidebar();
      }, (error) => {
        console.log(error);
      });
    }

    switchEditar(){
      this.editando = !this.editando;
    }
  

  spinner(): void{
    this.servicioSpinner.show();
    setTimeout(() => {
        this.servicioSpinner.hide();
    }, 2000)
  }

  public rellenarFormulario(documentId) {
    this._toggleSidebar();
    let editSubscribe = this.db.getPJ(documentId).subscribe((pj:any) => {
      this.currentStatus = 2;
      this.documentId = documentId;
      this.editPJForm.setValue({
        id: documentId,
        nombre: pj.payload.data().nombre,
        url: pj.payload.data().url,
        descripcion: pj.payload.data().descripcion,
        saga: pj.payload.data().saga,
        cita: pj.payload.data().cita,
        arriba: pj.payload.data().arriba,
        abajo: pj.payload.data().abajo,
        lateral: pj.payload.data().lateral,
        normal: pj.payload.data().normal,
        smash: pj.payload.data().smash

      });
      editSubscribe.unsubscribe();
    });
  }

  ngOnInit() {
    this.spinner();
    this.db.getPJs().subscribe((pjsSnapshot) => {
      this.pjs = [];
      pjsSnapshot.forEach((pjData: any) => {
        this.pjs.push({
          id: pjData.payload.doc.id,
          data: pjData.payload.doc.data()
        });
      })
    });
  }


  public deletePJ(documentId) {
    this.db.deletePJ(documentId).then(() => {
      console.log('Documento eliminado!');
    }, (error) => {
      console.error(error);
    });
  }

  

  public _toggleSidebar() {
    this._opened = !this._opened;
    this.switchEditar();
  }


}


