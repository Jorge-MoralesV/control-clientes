import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Cliente } from '../../model/cliente.model';
import { ClienteServicio } from '../../services/cliente.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-editar-cliente',
  templateUrl: './editar-cliente.component.html',
  styleUrl: './editar-cliente.component.css'
})
export class EditarClienteComponent implements OnInit {



  clientes: Cliente[];
  cliente: Cliente = {
    nombre: '',
    apellido: '',
    email: '',
    saldo: 0
  }
  id: string;

  @ViewChild("clienteForm") clienteForm: NgForm;
  @ViewChild("botonCerrar") botonCerrar: ElementRef;

  constructor(private _service: ClienteServicio, private toastr: ToastrService, private router: Router, private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this._service.getCliente(this.id).subscribe(cliente => {
      if (cliente !== null) {
        this.cliente = cliente;
      }
    })
  }

  guardar(clienteForm: NgForm) {
    const { value, valid } = clienteForm;
    if (!valid) {
      this.showCustomError();
    } else {
      value.id = this.id;
      this._service.modificarCliente(value);
      this.router.navigate(['/']);
      this.showCustomSuccess();
    }
  }

  eliminar() {
    if (confirm('¿Seguro que desea eliminar este cliente?')) {
      this._service.eliminarCliente(this.cliente);
      this.router.navigate(['/']);
      this.showCustomDelete();
    }
  }

  showCustomDelete() {
    this.toastr.success('Cliente eliminado correctamente', 'Exito', {
      toastClass: 'ngx-toastr custom-toast-success',
      progressBar: true
    });
  }
  showCustomSuccess() {
    this.toastr.success('Cliente actualizado correctamente', 'Exito', {
      toastClass: 'ngx-toastr custom-toast-success',
      progressBar: true
    });
  }
  showCustomError() {
    this.toastr.error('Ocurrio un error al editar un cliente', 'Error', {
      toastClass: 'ngx-toastr custom-toast-error',
      progressBar: true
    });
  }

}
