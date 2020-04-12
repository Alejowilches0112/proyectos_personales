import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpEventType } from '@angular/common/http';
import { ApiService } from '../../servicios/api.service';

@Component({
  selector: 'selectList',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit {
  @Input() public select: string;
  @Input() public placeholder: string;
  @Output() public onSelect = new EventEmitter<Object>();
  public list = [];
  public filter: any;
  constructor(private api: ApiService) { }

  ngOnInit() {
    this.listar();
  }
  public selectItem(event) {
    console.log(event);
  }

  public listar() {
    switch (this.select) {
      case 'regiones':
        this.list = [];
        this.api.get('clientes/regiones', 'application/json').toPromise().then(d => {
          if (d.type === HttpEventType.Response) {
            const data: any = d.body;
            for (let i of data.regiones) {
              let respuesta = { id: i.id, name: i.nombre };
              this.list = [...this.list, respuesta];
              //77+77+78+81+90
            }
          }
        });
        break;
    }
  }
}
