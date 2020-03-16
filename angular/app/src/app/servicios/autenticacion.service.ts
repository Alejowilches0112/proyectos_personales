import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Observable, of } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {

  constructor(private router: Router,
    private activeRoute: ActivatedRoute,
    private deviceService: DeviceDetectorService) { }

    public validaUsuario(userData) {
      if(userData['username'] == 'Alejo' && userData['password'] == 'Alejo0128'){
        var infoSesion = this.deviceService.getDeviceInfo();
        console.log(infoSesion)
        this.router.navigate(['/home']);
        return true;
      }
      return false;
    }
}
