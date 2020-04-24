import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
const routes: Routes = [
  { path: 'clientes', loadChildren: './clientes/clientes.module#ClientesModule', canActivate: [AuthGuard]},
  { path: 'login', loadChildren: './login/login.module#LoginModule' },
  { path: '',  redirectTo: '/clientes', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
