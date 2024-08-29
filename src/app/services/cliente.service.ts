import { Cliente } from './../model/cliente.model';
import { Injectable } from "@angular/core";
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore'
import { map, Observable } from "rxjs";

@Injectable()
export class ClienteServicio {


    clientesColeccion: AngularFirestoreCollection<Cliente>;
    clientes: Observable<Cliente[]>;

    constructor(private firestore: AngularFirestore) {
        this.clientesColeccion = firestore.collection('clientes', ref => ref.orderBy('nombre', 'asc'));
        this.clientes = this.clientesColeccion.valueChanges({ idField: 'id' });
    }

    getClientes(): Observable<Cliente[]> {
        return this.clientes;
    }

    agregarCliente(cliente: Cliente) {
        this.clientesColeccion.add(cliente);
    }

    getCliente(id: string): Observable<Cliente | null> {
        return this.firestore.doc<Cliente>(`clientes/${id}`).valueChanges({ idField: 'id' }).pipe(map(cliente => cliente ? cliente : null))
    }

    modificarCliente(cliente: Cliente) {
        const clienteDoc = this.firestore.doc<Cliente>(`clientes/${cliente.id}`);
        return clienteDoc.update(cliente);
    }

    eliminarCliente(cliente: Cliente) {
        const clienteDoc = this.firestore.doc<Cliente>(`clientes/${cliente.id}`);
        return clienteDoc.delete();
    }

}