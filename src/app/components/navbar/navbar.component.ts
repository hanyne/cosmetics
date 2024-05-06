import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isDropdownOpen: boolean = false;

  constructor() { }

  // Function to toggle the dropdown menu
  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
}
