import { Component, OnInit } from '@angular/core';
import { ApiService } from '../servicios/api.service';
import { Router } from '@angular/router';
import { HttpEventType } from '@angular/common/http';
import swal from 'sweetalert2';
import * as moment from 'moment';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit {
  public clientes: any;
  public cliente: any;
  public cols = [];
  public idCliente = null;
  public loadId = false;
  public addClient = false;
  public tableData = {
    row: 5,
    totalElements: 0,
    firstPage: true,
    lastPage: false,
    totPage: 1,
    offset: 0,
    pageAct: 1
  };
  public rows = [5, 10, 20];
  private urlEnPoint = 'clientes';
  constructor(private api: ApiService, private router: Router) { }

  ngOnInit() {

    this.cols = [
      {header: 'Id', field: 'id'},
      {header: 'Nombre', field: 'nombre'},
      {header: 'Apellido', field: 'apellido'},
      {header: 'Email', field: 'email'},
      {header: 'Fecha Registro', field: 'createAt'}
    ];
  }

  public List() {
    this.api.get(`${this.urlEnPoint}/page/0/${this.tableData.row}`, 'application/json').toPromise().then(d => {
      if (d.type === HttpEventType.Response) {
        const data: any = d.body;
        this.clientes = data.content;
        for (let i of this.clientes) {
          i.createAt = moment(i.createAt).format('DD/MM/YYYY');
        }
        this.tableData.row = data.size;
        this.tableData.firstPage = data.first;
        this.tableData.lastPage = data.last;
        this.tableData.totPage = data.totalPages;
        this.tableData.totalElements = data.totalElements;
      }

    }, error => {
      swal({
        title: error.error.mensaje,
        text: error.error.error,
        type: 'error'
      });
    });
  }

  public loadList(event) {
    this.tableData.row = (this.rows.indexOf(event.rows) > -1) ? event.rows : this.tableData.row;
    const page = event.first / this.tableData.row;
    this.api.get(`${this.urlEnPoint}/page/${page}/${this.tableData.row}`, 'application/json').toPromise().then(d => {
      if (d.type === HttpEventType.Response) {
        const data: any = d.body;
        this.clientes = data.content;
        for (let i of this.clientes) {
          i.createAt = moment(i.createAt).format('DD/MM/YYYY');
        }
        this.tableData.row = data.size;
        this.tableData.firstPage = data.first;
        this.tableData.lastPage = data.last;
        this.tableData.totPage = data.totalPages;
        this.tableData.totalElements = data.totalElements;
      }
    }, error => {
      swal({
        title: error.error.mensaje,
        text: error.error.error,
        type: 'error'
      });
    });
  }
  public selectItem(item) {
    this.idCliente = item.id;
    this.loadId = true;
    this.addClient = false;
  }
  public changeView($event) {
    this.loadId = false;
    this.addClient = false;
    if ($event === 0) {
      this.List();
    }
  }

  public delete(item) {
    swal({
      title: '¿Está Seguro?',
      text: `¿Esta seguro de Eliminar a ${item.nombre} ${item.apellido}?`,
      type: 'question',
      confirmButtonText: 'Si',
      cancelButtonText: 'No',
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      showCancelButton: true,
      buttonsStyling: false,
      reverseButtons: true
    }).then(result => {
      if (result.value) {
        this.api.delete(this.urlEnPoint, item.id, 'application/json').toPromise().then(d => {
          swal({
            title: 'Éxito',
            text: `Cliente Eliminado con ëxito`,
            type: 'success',
            showConfirmButton: false});
            // tslint:disable-next-line: align
            this.clientes = this.clientes.filter( cli => cli !== item);
        });
      }
    });
  }
}
