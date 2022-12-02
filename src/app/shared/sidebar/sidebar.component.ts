import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { LogInIser } from '../../models/loginuser';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public uiBasicCollapsed = false;
  public samplePagesCollapsed = false;
  currentLoginUser: LogInIser;
  accessType: string;
  isSuperAdmin: boolean = false;
  isAdmin: boolean = false;
  isNormalUser: boolean = false;

  constructor(public authenticationService: LoginService) { }

  ngOnInit() {
    this.currentLoginUser = this.authenticationService.currentUserValue;
    if (this.currentLoginUser != null) {
      switch (this.currentLoginUser.role) {
        case 'Super Admin': {
          this.isSuperAdmin = true;
          break;
        }
        case 'Admin': {
          this.isAdmin = true;
          break;
        }
        default: {
          this.isNormalUser = true;
          break;
        }
      }

    }
    const body = document.querySelector('body');

    // add class 'hover-open' to sidebar navitem while hover in sidebar-icon-only menu
    document.querySelectorAll('.sidebar .nav-item').forEach(function (el) {
      el.addEventListener('mouseover', function () {
        if (body.classList.contains('sidebar-icon-only')) {
          el.classList.add('hover-open');
        }
      });
      el.addEventListener('mouseout', function () {
        if (body.classList.contains('sidebar-icon-only')) {
          el.classList.remove('hover-open');
        }
      });
    });
  }

}
