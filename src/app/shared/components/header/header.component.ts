import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'spa-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() icon: string;
  @Input() title: string;

  constructor() { }

  ngOnInit(): void {
  }

}
