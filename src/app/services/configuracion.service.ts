import { AngularFirestore, AngularFirestoreDocument } from "@angular/fire/compat/firestore";
import { Configuracion } from "../model/configuracion.model";
import { map, Observable } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable()
export class ConfiguracionServicio {
    configuracionDoc: AngularFirestoreDocument<Configuracion>;
    configuracion: Observable<Configuracion | null>;
    id = '1';

    constructor(private firestore: AngularFirestore) {

    }

    getConfiguracion(): Observable<Configuracion | null> {
        this.configuracionDoc = this.firestore.doc<Configuracion>(`configuracion/${this.id}`);
        this.configuracion = this.configuracionDoc.valueChanges().pipe(
            map(configuracion => configuracion ? configuracion : null)
        )
        return this.configuracion;
    }

    modificarConfiguracion(configuracion: Configuracion) {
        this.configuracionDoc = this.firestore.doc<Configuracion>(`configuracion/${this.id}`);
        this.configuracionDoc.update(configuracion);
    }
}