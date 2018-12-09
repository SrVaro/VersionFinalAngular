import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { ServicioFirebaseService } from 'src/app/servicios/servicio-firebase.service';

@Component({
  selector: 'app-nuevo-personaje',
  templateUrl: './nuevo-personaje.component.html',
  styleUrls: ['./nuevo-personaje.component.css']
})
export class NuevoPersonajeComponent implements OnInit {

  public documentId = null;

  public currentStatus = 1; 

  public newPJForm = new FormGroup({
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

  creacionForm: FormGroup;


  constructor(
    public bsModalRef: BsModalRef,
    private fb: FormBuilder,
    private servicioFirestore: ServicioFirebaseService
  ) { 
    this.newPJForm.setValue({
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

  ngOnInit() {
  }


  public newPJ(form, documentId = this.documentId) {
    console.log(`Status: ${this.currentStatus}`);
    if (this.currentStatus == 1) {
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
      this.servicioFirestore.createPJ(data).then(() => {
        console.log('Documento creado exitósamente!');
        this.bsModalRef.hide();
        this.newPJForm.setValue({
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
      }, (error) => {
        console.error(error);
      });
    } 
  }


}
