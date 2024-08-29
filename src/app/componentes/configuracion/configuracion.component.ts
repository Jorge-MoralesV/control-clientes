import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfiguracionServicio } from '../../services/configuracion.service';
import { Configuracion } from '../../model/configuracion.model';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrl: './configuracion.component.css'
})

export class ConfiguracionComponent implements OnInit {

  permitirRegistro = false;

  constructor(private router: Router, private _configuracion: ConfiguracionServicio) { }

  ngOnInit(): void {
    this._configuracion.getConfiguracion().subscribe(
      (configuracion: Configuracion | null) => {
        this.permitirRegistro = configuracion?.permitirRegistro ?? false;
      }
    )
  }

  guardar() {
    let configuracion = { permitirRegistro: this.permitirRegistro };
    this._configuracion.modificarConfiguracion(configuracion);
    this.router.navigate(['/'])
  }

}
