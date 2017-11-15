import { Component } from '@angular/core';
import { AuthService } from '../../core/auth/auth.service'

@Component({
  selector: 'nav-bar',
  templateUrl: 'nav-bar.component.html',
  styleUrls: ['nav-bar.component.scss']
})
export class NavBarComponent {


  
  constructor(public authService: AuthService) {

  }
  logoutClick() {

    this.authService.logout();

  }


}
 