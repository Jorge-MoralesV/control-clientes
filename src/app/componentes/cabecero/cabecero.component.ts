import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { ConfiguracionServicio } from '../../services/configuracion.service';

@Component({
  selector: 'app-cabecero',
  templateUrl: './cabecero.component.html',
  styleUrl: './cabecero.component.css'
})
export class CabeceroComponent implements OnInit {


  isLoggedIn: boolean;
  loggedInUser: string;
  permitirRegistro: boolean;

  constructor(private _loginService: LoginService, private router: Router, private _configuracion: ConfiguracionServicio) {

  }

  ngOnInit(): void {
    this._loginService.getAuth().subscribe(auth => {
      if (auth) {
        this.isLoggedIn = true;
        if (auth.email !== null) {
          this.loggedInUser = auth.email;
        }
      } else {
        this.isLoggedIn = false;
      }
    })

    this._configuracion.getConfiguracion().subscribe(configuracion => {
      this.permitirRegistro = configuracion?.permitirRegistro ?? false;
    })
  }

  logout() {
    this._loginService.logout();
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
  }

}
