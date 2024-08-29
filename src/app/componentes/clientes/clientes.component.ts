import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Cliente } from '../../model/cliente.model';
import { ClienteServicio } from '../../services/cliente.service';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.css'
})
export class ClientesComponent implements OnInit {


  clientes: Cliente[];
  cliente: Cliente = {
    nombre: '',
    apellido: '',
    email: '',
    saldo: 0
  }

  @ViewChild("clienteForm") clienteForm: NgForm;
  @ViewChild("botonCerrar") botonCerrar:ElementRef;

  constructor(private _service: ClienteServicio, private toastr: ToastrService) {

  }
  ngOnInit(): void {
    this._service.getClientes().subscribe({
      next: (cliente: any) => this.clientes = cliente,
      error: (error: any) => console.log(error)
    })
  }

  getSaldoTotal() {
    let saldoTotal: number = 0;
    if (this.clientes) {
      this.clientes.forEach(cliente => {
        if (cliente.saldo !== undefined) {
          saldoTotal += cliente.saldo;
        }
      })
    }
    return saldoTotal;
  }

  agregar(clienteForm: NgForm) {
    const { value, valid } = clienteForm;
    if (!valid) {
      this.showCustomError();
    } else {
      this._service.agregarCliente(value);
      clienteForm.resetForm();
      this.cerrarModal();
      this.showCustomSuccess();
    }
  }

  private cerrarModal(){
    this.botonCerrar.nativeElement.click();
  }

  showCustomSuccess() {
    this.toastr.success('Cliente agregado correctamente', 'Exito', {
      toastClass: 'ngx-toastr custom-toast-success',
      progressBar: true
    });
  }
  showCustomError() {
    this.toastr.error('Ocurrio un error al agregar un cliente', 'Error', {
      toastClass: 'ngx-toastr custom-toast-error',
      progressBar: true
    });
  }

}
