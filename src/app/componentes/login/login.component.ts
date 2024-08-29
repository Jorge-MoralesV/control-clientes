import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;

  constructor(private router: Router, private toastr: ToastrService, private _service: LoginService) {

  }
  ngOnInit(): void {
    this._service.getAuth().subscribe(auth => {
      if (auth) {
        this.router.navigate(['/']);
      }
    })
  }

  login() {
    this._service.login(this.email, this.password).then(res => {
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
