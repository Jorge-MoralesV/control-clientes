import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { map } from "rxjs";

@Injectable()
export class LoginService {
    constructor(private auth: AngularFireAuth) { }

    login(email: string, password: string) {
        return new Promise((resolve, reject) => {
            this.auth.signInWithEmailAndPassword(email, password).then(datos => resolve(datos)).catch(error => reject(error))
        })
    }

    getAuth() {
        return this.auth.authState.pipe(map(auth => auth))
    }

    logout() {
        this.auth.signOut();
    }

    registro(email: string, password: string) {
        return new Promise((resolve, reject) => {
            this.auth.createUserWithEmailAndPassword(email, password).then(datos => resolve(datos)).catch(error => reject(error))
        })
    }
}