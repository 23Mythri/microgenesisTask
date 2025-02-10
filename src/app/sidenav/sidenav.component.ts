import { Component } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent {
  dropdowns: { [key: string]: boolean } = {
    ecommerce: false,
    courses: false,
    projects: false,
    userprofile: false,
    account: false,
    corporate: false,
    blog: false,
    social: false,
  };

  toggleDropdown(section: string): void {
    this.dropdowns[section] = !this.dropdowns[section];
  }
}


