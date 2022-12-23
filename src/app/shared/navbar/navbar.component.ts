import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
// import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { LoginService } from '../../services/login.service';
import { LogInIser } from '../../models/loginuser';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  providers: []
})
export class NavbarComponent implements OnInit {

  public iconOnlyToggled = false;
  public sidebarToggled = false;
  username: string;
  designation: string;
  currentLoginUser: LogInIser;
  isSuperAdmin: boolean = false;
  isAdmin: boolean = false;
  isNormalUser: boolean = false;
  constructor(
    private router: Router,
    public authenticationService: LoginService) {
  }

  ngOnInit() {
    this.currentLoginUser = this.authenticationService.currentUserValue;
    if (this.currentLoginUser != null) {
      this.username = this.currentLoginUser.employeeName;
      this.designation = this.currentLoginUser.designation;
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
  }

  // toggle sidebar in small devices
  toggleOffcanvas() {
    document.querySelector('.sidebar-offcanvas').classList.toggle('active');
  }

  // toggle sidebar
  toggleSidebar() {
    let body = document.querySelector('body');
    if ((!body.classList.contains('sidebar-toggle-display')) && (!body.classList.contains('sidebar-absolute'))) {
      this.iconOnlyToggled = !this.iconOnlyToggled;
      if (this.iconOnlyToggled) {
        body.classList.add('sidebar-icon-only');
      } else {
        body.classList.remove('sidebar-icon-only');
      }
    } else {
      this.sidebarToggled = !this.sidebarToggled;
      if (this.sidebarToggled) {
        body.classList.add('sidebar-hidden');
      } else {
        body.classList.remove('sidebar-hidden');
      }
    }
  }
}
