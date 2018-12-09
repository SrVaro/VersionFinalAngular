import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ServicioFirebaseService {

  constructor(public db: AngularFirestore
    ) { }

  //Crea un nuevo personaje
  public createPJ(data: {nombre: string, url: string}) {
    return this.db.collection('pjs').add(data);
  }

  //Obtiene un personaje
  public getPJ(documentId: string) {
    return this.db.collection('pjs').doc(documentId).snapshotChanges();
  }

  //Obtiene todos los personajes
  public getPJs() {
    return this.db.collection('pjs').snapshotChanges();
  }

  //Actualiza un personaje
  public updatePJ(documentId: string, data: any) {
    return this.db.collection('pjs').doc(documentId).set(data);
  }

  //Borra un gato
  public deletePJ(documentId: string) {
    return this.db.collection('pjs').doc(documentId).delete();
}

}

