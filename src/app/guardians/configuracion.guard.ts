import { AngularFireAuth } from "@angular/fire/compat/auth";
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from "@angular/router";
import { ConfiguracionServicio } from "../services/configuracion.service";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";

@Injectable()
export class ConfiguracionGuard implements CanActivate {

    constructor(private router: Router, private _configuracion: ConfiguracionServicio) {

    }

    canActivate(): Observable<boolean> {
        return this._configuracion.getConfiguracion().pipe(
            map(configuracion => {
                if (configuracion?.permitirRegistro) {
                    return true;
                } else {
                    this.router.navigate(['/login']);
                    return false;
                }
            })
        )
    }

}