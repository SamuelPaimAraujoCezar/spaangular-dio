import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'spa-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @ViewChild('sidenav', {static: false}) sidenav: MatSidenav;

  constructor() { }

  ngOnInit(): void {
  }

  openSideNav(): void {
    this.sidenav.open();
  }

  closeSideNav(): void {
    this.sidenav.close();
  }

}
