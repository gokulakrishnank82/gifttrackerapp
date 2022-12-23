import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, NavigationStart, RouteConfigLoadStart, RouteConfigLoadEnd } from '@angular/router';
import { LoginService } from './services/login.service';
import { LogInIser } from './models/loginuser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  showSidebar: boolean;
  showNavbar: boolean;
  showFooter: boolean;
  isLoading: boolean;
  currentUser: LogInIser;

  constructor(private router: Router,
    private authenticationService: LoginService) {
    const bodyElement = document.body;
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    // Removing Sidebar, Navbar, Footer for Documentation, Error and Auth pages
    router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        if ((event['url'] == '/') || (event['url'] == '/login') || event['url'] == '/change-password' || (event['url'] == '/forget-password') || (event['url'] == '/error-pages/404') || (event['url'] == '/error-pages/500')) {
          bodyElement.classList.remove('py-5');
          bodyElement.classList.add('login');
          if (event['url'] !== '/change-password')
            this.authenticationService.logout();
          this.showSidebar = false;
          this.showNavbar = false;
          this.showFooter = false;
          /*document.querySelector('.main-panel').classList.add('w-100');
          document.querySelector('.page-body-wrapper').classList.add('full-page-wrapper');
          document.querySelector('.content-wrapper').classList.remove('auth', 'auth-img-bg',);
          document.querySelector('.content-wrapper').classList.remove('auth', 'lock-full-bg');*/
          if ((event['url'] == '/error-pages/404') || (event['url'] == '/error-pages/500')) {
            // document.querySelector('.content-wrapper').classList.add('p-0');
          }
        } else {
          bodyElement.classList.remove('login');
          bodyElement.classList.add('py-5');
          this.showSidebar = true;
          this.showNavbar = true;
          this.showFooter = true;
          /*document.querySelector('.main-panel').classList.remove('w-100');
          document.querySelector('.page-body-wrapper').classList.remove('full-page-wrapper');
          document.querySelector('.content-wrapper').classList.remove('auth', 'auth-img-bg');
          document.querySelector('.content-wrapper').classList.remove('p-0');*/
        }
      }
    });

    // Spinner for lazyload modules
    router.events.forEach((event) => {
      if (event instanceof RouteConfigLoadStart) {
        this.isLoading = true;
      } else if (event instanceof RouteConfigLoadEnd) {
        this.isLoading = false;
      }
    });

  }

  ngOnInit() {
    // Scroll to top after route change
    this.router.events.subscribe((evt) => {   
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
  onActivate() {
    console.log('----Active----------');
  }
}
