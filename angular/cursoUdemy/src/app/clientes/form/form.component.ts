import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Clientes } from '../../entities/clientes';
import { ApiService } from '../../servicios/api.service';
import swal from 'sweetalert2'
@Component({
  selector: 'app-form-cliente',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {
  private cliente: Clientes = new Clientes();
  private urlEnPoint = 'clientes';
  public edit = false;
  constructor(private api: ApiService) { }
  @Input() public idCliente: number;
  @Output() public backEvent = new EventEmitter<number>();
  public titulo;
  ngOnInit() {
    this.titulo = (this.idCliente) ? 'EDITAR CLIENTE' : 'NUEVO CLIENTE'
    this.loadId(this.idCliente);
  }
  public loadId(id) {
    if (id) {
      this.api.getId(this.urlEnPoint, id, 'application/json').subscribe((d: Clientes) => {
        this.cliente = d;
        this.edit = true;
      }, error => {
        swal({
          title: error['error']['mensaje'],
          text: error['error']['error'],
          type: 'error'
        }).then(result => {
          this.backEvent.emit(1)
        })
      })
    }
  }
  public create(): void {
    this.api.post(this.urlEnPoint, this.cliente, 'application/json').subscribe(d => {
      swal('Cliente Creado', `El Cliente ${d['cliente']['nombre']} fue creado`, 'success');
      if (d['cliente']['id']) this.backEvent.emit(0)
    }, error => {
      swal({
        title: error['error']['mensaje'],
        text: error['error']['error'],
        type: 'error'
      })
    });
  }
  public update(): void {
    this.api.put(this.urlEnPoint, this.loadId, this.cliente, 'application/json').subscribe(d => {
      if (d['id']) this.backEvent.emit(0)
    }, error => {
      swal({
        title: error['error']['mensaje'],
        text: error['error']['error'],
        type: 'error'
      })
    });
  }
}
