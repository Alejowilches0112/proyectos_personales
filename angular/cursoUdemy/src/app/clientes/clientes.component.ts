import { Component, OnInit } from '@angular/core';
import { ApiService } from '../servicios/api.service';
import swal from 'sweetalert2';


@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit {
  public clientes:any;
  private cliente:any;
  public cols = [];
  public idCliente = null;
  public loadId = false;
  public addClient = false;
  private urlEnPoint = 'clientes';
  constructor(private api: ApiService) { }

  ngOnInit() {
    this.list();
    this.cols = [
      {header: 'Id', field: 'id'},
      {header: 'Nombre', field: 'nombre'},
      {header: 'Apellido', field: 'apellido'},
      {header: 'Email', field: 'email'}
    ];
  }

  public list(){
    this.api.get(this.urlEnPoint,'application/json').toPromise().then(data=>{
      this.clientes = data;
    }, error => {
      swal({
        title: error['error']['mensaje'], 
        text: error['error']['error'], 
        type:'error'
      });
    });
  }
  public selectItem(item){
    this.idCliente = item.id;
    this.loadId = true;
    this.addClient = false;
  }
  public changeView($event){
    this.loadId = false;
    this.addClient = false;
    if($event == 0) this.list();
  }
  
  public delete(item){
    swal({
      title: '¿Está Seguro?', 
      text: `¿Esta seguro de Eliminar a ${item.nombre} ${item.apellido}?`, 
      type:'question',
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
      if(result.value){
        this.api.delete(this.urlEnPoint, item.id, 'application/json').toPromise().then(d => {
          swal({
            title: 'Éxito', 
            text: `Cliente Eliminado con ëxito`, 
            type:'success',
            showConfirmButton: false});
            this.clientes = this.clientes.filter( cli => cli !== item);
        });
      }
    });
  }
}
