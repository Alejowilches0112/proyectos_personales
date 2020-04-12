import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Clientes } from '../../entities/clientes';
import { ApiService } from '../../servicios/api.service';
import { HttpEventType } from '@angular/common/http';
import swal from 'sweetalert2';
import * as moment from 'moment';
import {Subject, Observable} from 'rxjs';
@Component({
  selector: 'app-form-cliente',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {
  public cliente: Clientes = new Clientes();
  private urlEnPoint = 'clientes';
  public edit = false;
  public file: any;
  public errorFile = false;
  public nameFile: string;
  public progreso = 0;
  protected prueba = 'prueba';
  constructor(private api: ApiService) { }
  @Input() public idCliente: number;
  @Output() public backEvent = new EventEmitter<number>();
  public titulo;
  es: any;
  ngOnInit() {
    this.titulo = (this.idCliente) ? 'EDITAR CLIENTE' : 'NUEVO CLIENTE';
    this.loadId(this.idCliente);
    this.es = {
      firstDayOfWeek: 1,
      dayNames: ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'],
      dayNamesShort: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
      dayNamesMin: ['D', 'L', 'M', 'MI', 'J', 'V', 'S'],
      monthNames: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', ' julio',
        'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'],
      monthNamesShort: ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],
      today: 'Hoy',
      clear: 'Borrar'
    };
  }
  public loadId(id) {
    if (id) {
      this.api.getId(this.urlEnPoint, id, 'application/json').toPromise().then(d => {
        if (d.type === HttpEventType.Response) {
          const response: any = d.body;
          console.log(response);
          this.cliente = response.cliente;
          this.edit = true;
        }
      }, error => {
        swal({
          title: error.error.mensaje,
          text: error.error.error,
          type: 'error'
        }).then(result => {
          this.backEvent.emit(1);
        });
      });
    }
  }
  public create(): void {
    if (this.idCliente) {
      this.subirImagen(this.idCliente);
    }
    this.api.post(this.urlEnPoint, this.cliente, 'application/json').toPromise().then(d => {
      if (d.type === HttpEventType.Response) {
        const response: any = d.body;
        swal('Cliente Creado', `El Cliente ${response.cliente.nombre} fue creado`, 'success');
        if (response.cliente.id && this.file) {
          this.idCliente = response.cliente.id;
          this.subirImagen(response.cliente.id);
        } else {
          if (response.cliente.id) { this.backEvent.emit(0); }
        }
      }
    }, error => {
      swal({
        title: error.error.mensaje,
        text: error.error.error,
        type: 'error'
      });
    });
  }
  public update(): void {
    this.api.put(this.urlEnPoint, this.idCliente, this.cliente, 'application/json').toPromise().then(d => {
      if (d.type === HttpEventType.Response) {
        const response: any = d.body;
        swal('Cliente Actualizado', `El Cliente ${response.cliente.nombre} fue Actualizado`, 'success');
        if (response.cliente.id && this.file) {
          this.subirImagen(this.idCliente);
        } else {
          if (response.cliente.id) { this.backEvent.emit(0); }
        }
      }
    }, error => {
      swal({
        title: error.mensaje,
        text: error.error,
        type: 'error'
      });
    });
  }
  onUpload(event) {
    this.file = event.target.files[0];
    this.nameFile = this.file.name;
    if (this.file.type.indexOf('image') > -1) {
      this.errorFile = true;
      this.file = null;
    }
  }
  public subirImagen(id) {
    const data = new FormData();
    data.append('file', this.file);
    data.append('id', id);
    this.api.upload(`${this.urlEnPoint}/upload`, data).toPromise().then(d => {
      if (d.type === HttpEventType.UploadProgress) {
        this.progreso = Math.round(100 * (d.loaded / d.total));
      } else if (d.type === HttpEventType.Response) {
        const response: any = d.body;
        swal('La imagen ha subido completamente!', response.mensaje, 'success');
        this.progreso = 0;
        this.cliente = response.cliente;
        this.backEvent.emit(0);
      }
    }, error => {
      swal({
        title: error.mensaje,
        text: error.error,
        type: 'error'
      });
    });
  }
}
