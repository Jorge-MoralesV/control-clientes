import { ToastrModule, ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent implements OnInit {
  email: string;
  password: string;

  constructor(private _servicioLogin: LoginService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    this._servicioLogin.getAuth().subscribe(auth => {
      if (auth) {
        this.router.navigate(['/']);
      }
    })
  }

  register() {
    this._servicioLogin.registro(this.email, this.password).then(res => {
      this.router.navigate(['/'])
    }).catch(error => {
      this.showCustomError(error);
    })
  }

  showCustomError(error: any) {
    this.toastr.error(error, 'Error', {
      toastClass: 'ngx-toastr custom-toast-error',
      progressBar: true
    });
  }
}
